"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClientConfig from "@/config/tanstack";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import theme from "@/config/theme";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClientConfig}>
            <AntdRegistry>
                <RecoilRoot>
                    <ConfigProvider theme={theme}>
                        <App>{children}</App>
                    </ConfigProvider>
                </RecoilRoot>
            </AntdRegistry>
        </QueryClientProvider>
    );
}
