import { NextResponse } from "next/server";
import { createUniqueId, datasetTable, db } from "@/db"; // Your DB setup
import { OpenAIEmbeddings } from "@langchain/openai";
import pdf2json from "pdf2json";

export const dynamic = "force-dynamic";

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
});

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

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
                const text = pdfData.Pages.map((page) =>
                    page.Texts.map((textItem) =>
                        decodeURIComponent(textItem.R[0].T)
                    ).join(" ")
                ).join("\n"); // Joining page text with new line

                // Generate embeddings for the extracted text
                const pdfEmbedding = await embeddings.embedQuery(text);

                // Save content and embedding to the database
                await db.insert(datasetTable).values({
                    id: createUniqueId(),
                    content: text,
                    embedding: pdfEmbedding,
                });
                return resolve(NextResponse.json({ text }));
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
