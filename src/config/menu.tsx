import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { MessageCircle, Database } from "lucide-react";
import { ROUTES } from "../static/routes";

export const MenuConfig: ItemType<MenuItemType>[] = [
    {
        key: ROUTES.CHAT,
        icon: <MessageCircle />,
        label: "Chat",
    },
    {
        key: ROUTES.COLLECTION.BASE,
        icon: <Database />,
        label: "Collection",
    },
];
