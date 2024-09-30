import dynamic from "next/dynamic";

const UploadPage = dynamic(() => import("@/features/upload/upload.page"), {
    ssr: false,
});

export default function Page() {
    return <UploadPage />;
}
