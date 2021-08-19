export interface IResponse<T> {
    isSuccess: boolean;
    message: string;
    results: Array<T>;
}