"use client";
import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");

  return (
    <div>
      <h1>Results Page</h1>
      <p>Selected: {selected}</p>
    </div>
  );
}
