import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getAllCheatsheets } = await import("@/utils/markdown");
    const cheatsheets = await getAllCheatsheets(); // <- also await here
    return NextResponse.json(cheatsheets);
  } catch (error) {
    console.error("Error fetching cheatsheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch cheatsheets" },
      { status: 500 },
    );
  }
}
