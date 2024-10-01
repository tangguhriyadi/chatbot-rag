import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const query = sql`SELECT * FROM dataset_collections`;
        const collections = await db.execute(query);

        return NextResponse.json({ message: "success", data: collections });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}
