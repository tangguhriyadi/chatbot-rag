import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCollection } from "@/features/collection/schema/create-collection.schema";

const createCollection = async (body: CreateCollection) => {
    console.log(body);
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("name", body.name);

    const res = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
    });
    return await res.json();
};

export const useCreateCollection = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCollection,
        mutationKey: ["create-collection"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
            if (onSuccess) {
                onSuccess();
            }
        },
    });
};
