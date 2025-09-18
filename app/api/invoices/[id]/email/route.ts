export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { invoiceitem } from "@/lib/generated/prisma";
import { mailer } from "@/lib/mail";
import PDFDocument from "pdfkit";

type Params = Promise<{ id: string }>;
export async function POST(_: Request, { params }: { params: Params }) {
  const id = Number((await params).id);
  const inv = await prisma.invoice.findUnique({
    where: { id }, include: { client: true, invoiceitem: true }
  });
  if (!inv) return new Response("Not found", { status: 404 });

  // Build PDF buffer
  const pdfBuf = await new Promise<Buffer>((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 36 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.fontSize(18).text(`Invoice #${inv.number}`, { align: "right" });
    doc.moveDown();
    doc.fontSize(12).text(`Bill To: ${inv.client.name} <${inv.client.email}>`);
    doc.text(`Issue: ${inv.issueDate.toDateString()}  Due: ${inv.dueDate.toDateString()}`);
    doc.moveDown();
    inv.invoiceitem.forEach((it : invoiceitem) => {
      const amt = (it.unitCents * it.quantity) / 100;
      doc.text(`${it.description} × ${it.quantity}  -  ${inv.currency} ${amt.toFixed(2)}`);
    });
    doc.moveDown();
    doc.fontSize(14).text(`Total: ${inv.currency} ${(inv.totalCents/100).toFixed(2)}`, { align: "right" });
    doc.end();
  });

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const viewUrl = `${baseUrl}/en/invoices/${inv.token}`; // or use locale

  await mailer.sendMail({
    from: "no-reply@yourapp.com",
    to: inv.client.email,
    subject: `Invoice #${inv.number}`,
    html: `Please view your invoice <a href="${viewUrl}">here</a>.`,
    attachments: [{ filename: `invoice-${inv.number}.pdf`, content: pdfBuf }]
  });

  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
}