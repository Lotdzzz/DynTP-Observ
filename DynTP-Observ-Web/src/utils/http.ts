import type {AxiosRequestConfig, AxiosResponse} from "axios";
import type {Result} from "../types/model/Result.ts";
import request from "./request.ts";

// new request methods that return the data directly instead of the Result wrapper
export const httpRequest = {
    async get<TResponse>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<TResponse> {
        return request
            .get<Result<TResponse>>(url, config)
            .then((response) => response as unknown as TResponse);
    },

    async post<TResponse, TRequest = unknown>(
        url: string,
        data?: TRequest,
        config?: AxiosRequestConfig<TRequest>,
    ): Promise<TResponse> {
        return request
            .post<Result<TResponse>, AxiosResponse<Result<TResponse>>, TRequest>(
                url,
                data,
                config,
            )
            .then((response) => response as unknown as TResponse);
    },

    async put<TResponse, TRequest = unknown>(
        url: string,
        data?: TRequest,
        config?: AxiosRequestConfig<TRequest>,
    ): Promise<TResponse> {
        return request
            .put<Result<TResponse>, AxiosResponse<Result<TResponse>>, TRequest>(
                url,
                data,
                config,
            )
            .then((response) => response as unknown as TResponse);
    },

    async delete<TResponse>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<TResponse> {
        return request
            .delete<Result<TResponse>>(url, config)
            .then((response) => response as unknown as TResponse);
    },
};