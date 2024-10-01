"use client";

import { Button, Form, Input, Modal, Space, Typography, Upload } from "antd";
import { CreateCollection } from "@/features/collection/schema/create-collection.schema";
import { useRecoilState } from "recoil";
import CollectionModalActionRecoil from "@/features/collection/store/collection-action";
import { UploadCloudIcon } from "lucide-react";
import { useCreateCollection } from "@/features/collection/hook/use-create-collection";
import { useCallback } from "react";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

export const CreateCollectionModal = () => {
    const [modalAction, setModalAction] = useRecoilState(
        CollectionModalActionRecoil
    );
    const [form] = Form.useForm<CreateCollection>();

    const handleSuccess = () => {
        setModalAction({ isOpen: false });
        form.resetFields();
    };

    const createHook = useCreateCollection(handleSuccess);

    const handleSubmit = useCallback(() => {
        form.validateFields().then((values) => {
            createHook.mutateAsync(values);
        });
    }, [createHook, form]);

    const handleFileChange = (info: UploadChangeParam<UploadFile<File>>) => {
        const { fileList } = info;
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            form.setFieldsValue({ file });
        } else {
            form.setFieldsValue({ file: undefined });
        }
    };

    return (
        <Modal
            open={modalAction.isOpen}
            onCancel={() => setModalAction({ isOpen: false })}
            closable={false}
            title="Create Collection"
            confirmLoading={createHook.isPending}
            onOk={handleSubmit}
        >
            <Form form={form} disabled={createHook.isPending}>
                <Form.Item<CreateCollection>
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input collection name",
                        },
                    ]}
                >
                    <Input placeholder="Collection Name" />
                </Form.Item>
                <Form.Item<CreateCollection>
                    name="file"
                    rules={[
                        {
                            required: true,
                            message: "Please input collection description",
                        },
                    ]}
                >
                    <Upload
                        maxCount={1}
                        accept="application/pdf"
                        onChange={handleFileChange}
                    >
                        <Space direction="horizontal">
                            <Button icon={<UploadCloudIcon />}>Upload</Button>
                            <Typography.Text>Upload PDF File</Typography.Text>
                        </Space>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};
