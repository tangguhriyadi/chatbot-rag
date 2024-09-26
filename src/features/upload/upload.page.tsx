// app/upload/page.tsx
"use client";

import { useCallback, useState } from "react";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");

    // Handle file upload
    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const uploadedFile = e.target.files?.[0] || null;
            setFile(uploadedFile);
        },
        []
    );

    // Handle form submission to upload the PDF
    const handleUpload = useCallback(async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("api/upload-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setMessage(data.message || "File uploaded successfully");
        } catch (error) {
            setMessage("Error uploading file");
            console.error(error);
        }
    }, [file]);

    return (
        <div className="p-5">
            <h1>Upload a PDF File</h1>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload} disabled={!file}>
                Upload PDF
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}
