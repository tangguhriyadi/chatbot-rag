import { NextResponse } from "next/server";
import { config } from "@/db";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { OpenAIEmbeddings } from "@langchain/openai";

export const dynamic = "force-dynamic";

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
});

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

        const blob = new Blob([pdfBuffer], { type: "application/pdf" });

        const loader = new WebPDFLoader(blob, {
            parsedItemSeparator: "",
        });

        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
        });
        
        const splitDocs = await textSplitter.splitDocuments(docs);


        await PGVectorStore.fromDocuments(splitDocs, embeddings, {
            ...config,
            collectionName: "test",
            collectionTableName: "dataset_collections"
        });

        return NextResponse.json({ message: "success" });
    } catch (error) {
        console.error("Error processing PDF:", error);
        return NextResponse.json(
            { message: "Error processing PDF" },
            { status: 500 }
        );
    }
}
