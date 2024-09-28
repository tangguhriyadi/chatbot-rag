import { ConfigProvider } from "antd";
import { Chat } from "@/features/chat/chat.page";
import theme from "@/config/theme";

export const runtime = "edge";

export default function Page() {
    return (
        <ConfigProvider theme={theme}>
            <Chat />
        </ConfigProvider>
    );
}
