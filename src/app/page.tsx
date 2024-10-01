import { ConfigProvider } from "antd";
import theme from "@/config/theme";
import { Chat } from "@/features/chat/chat.page";

export default function Page() {
    return (
        <ConfigProvider theme={theme}>
            <Chat />
        </ConfigProvider>
    );
}
