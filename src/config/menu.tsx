import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { MessageCircle, Database } from "lucide-react";

export const MenuConfig: ItemType<MenuItemType>[] = [
    {
        key: "/",
        icon: <MessageCircle />,
        label: "Chat",
    },
    {
        key: "/collection",
        icon: <Database />,
        label: "Collection",
    },
];
