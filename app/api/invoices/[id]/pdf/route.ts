export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { invoiceitem } from "@/lib/generated/prisma/wasm";
import PDFDocument from "pdfkit";

type Params = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const invoiceId = Number(id);
  const inv = await prisma.invoice.findUnique({
    where: { id: invoiceId }, include: { client: true, invoiceitem: true }
  });
  if (!inv) return new Response("Not found", { status: 404 });

  const stream = new ReadableStream({
    start(controller) {
      const doc = new PDFDocument({ size: "A4", margin: 36 });
      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => {
        controller.enqueue(new Uint8Array(Buffer.concat(chunks)));
        controller.close();
      });

      doc.fontSize(18).text(`Invoice #${inv.number}`, { align: "right" });
      doc.moveDown();
      doc.fontSize(12).text(`Bill To: ${inv.client.name} <${inv.client.email}>`);
      doc.text(`Issue: ${inv.issueDate.toDateString()}  Due: ${inv.dueDate.toDateString()}`);
      doc.moveDown();

      inv.invoiceitem.forEach((it: invoiceitem) => {
        const amt = (it.unitCents * it.quantity) / 100;
        doc.text(`${it.description} × ${it.quantity}  -  ${inv.currency} ${amt.toFixed(2)}`);
      });

      doc.moveDown();
      doc.fontSize(14).text(`Total: ${inv.currency} ${(inv.totalCents/100).toFixed(2)}`, { align: "right" });
      doc.end();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=invoice-${inv.number}.pdf`
    }
  });
}