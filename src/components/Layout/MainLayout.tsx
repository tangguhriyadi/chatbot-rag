"use client";

import { Layout } from "antd";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Layout.Content>
                    <main>{children}</main>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
