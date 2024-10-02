import { useQuery } from "@tanstack/react-query";
import { BaseResponse } from "@/types/response";
import { Collection } from "@/features/collection/schema/collection.schema";

const getCollections = async () => {
    const res = await fetch("/api/collection");
    return await res.json();
};

export const useCollection = () => {
    return useQuery<BaseResponse<Collection[]>>({
        queryKey: ["collections"],
        queryFn: () => getCollections(),
    });
};
