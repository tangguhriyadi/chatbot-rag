export type Pagination = {
    total: number;
    page: number;
    pageSize: number;
};

export type BaseResponse<T> = {
    message: string;
    data: T;
    pagination?: Pagination;
};
