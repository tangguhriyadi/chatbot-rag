import { ConfigProvider } from "antd";
import theme from "@/config/theme";
import dynamic from "next/dynamic";

const Chat = dynamic(
    () => import("@/features/chat/chat.page").then((mod) => mod.Chat),
    {
        ssr: false,
    }
);

export default function Page() {
    return (
        <ConfigProvider theme={theme}>
            <Chat />
        </ConfigProvider>
    );
}
