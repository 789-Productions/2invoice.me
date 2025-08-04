"use client";
import { seedDatabase } from "../api/seed/seed";

export default function HomeLocale() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>Go to Dashboard to try the demo.</p>\
      <p>
        Seed the demo user with this{" "}
        <form action={seedDatabase}>
          <button type="submit">Seed Database</button>
        </form>
      </p>
    </main>
  );
}
