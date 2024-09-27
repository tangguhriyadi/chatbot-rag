import { NextResponse } from "next/server";
import { createUniqueId, vectorStore } from "@/db";
import type { Document } from "@langchain/core/documents";
import pdf2json from "pdf2json";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { message: "No file uploaded" },
            { status: 400 }
        );
    }

    try {
        // Read the file buffer
        const buffer = await file.arrayBuffer();

        // Convert the buffer to a Buffer instance for pdf2json
        const pdfBuffer = Buffer.from(buffer);

        return new Promise((resolve) => {
            const pdfParser = new pdf2json();

            pdfParser.on("pdfParser_dataError", (errData) => {
                return resolve(
                    NextResponse.json(
                        { error: "Error reading PDF file", details: errData },
                        { status: 500 }
                    )
                );
            });

            pdfParser.on("pdfParser_dataReady", async (pdfData) => {
                // Extract text content from pdfData
                const docs: Document[] = pdfData.Pages.map(
                    (page, pageIndex) => {
                        const pageText = page.Texts.map((textItem) =>
                            decodeURIComponent(textItem.R[0].T)
                        ).join(" ");
                        return {
                            pageContent: pageText,
                            metadata: {
                                page: pageIndex + 1,
                                source: file.name,
                            },
                            id: createUniqueId(),
                        };
                    }
                );

                // Save content and embedding to the database
                (await vectorStore).addDocuments(docs);
                return resolve(NextResponse.json({ message: "success" }));
            });

            // Parse the PDF buffer
            pdfParser.parseBuffer(pdfBuffer);
        });
    } catch (error) {
        console.error("Error processing PDF:", error);
        return NextResponse.json(
            { message: "Error processing PDF" },
            { status: 500 }
        );
    }
}
