import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DEV_API + '/v1/adaca/',
    responseHandler: async (response) => {
        const data = await response.json();
        const headers = {};
        for (let [key, value] of response.headers.entries()) {
            headers[key] = value;
        }
        let status = response?.status;
        return {
            ...data,
            status,
            headers,
        };
    },
});

export const AdacaAPI = createApi({
    reducerPath: 'AdacaAPI',
    baseQuery,
    endpoints: (builder) => ({
        publicPostRequests: builder.mutation({
            query: ({ route, body }) => ({
                url: route,
                method: 'POST',
                body: body,
            }),
        }),
        privatePostRequests: builder.mutation({
            query: ({ route, body }) => ({
                url: route,
                method: 'POST',
                body: body,
            }),
            extraOptions: { private: true },
        }),
        privateGetRequests: builder.mutation({
            query: ({ route, query }) => ({
                url: route,
                method: 'GET',
                params: query,
            }),
            extraOptions: { private: true },
        }),
        privateUpdateRequests: builder.mutation({
            query: ({ route, body }) => ({
                url: route,
                method: 'PUT',
                body: body,
            }),
            extraOptions: { private: true },
        }),
        privateDeleteRequests: builder.mutation({
            query: ({ route, query }) => {
                const url = new URL(
                    import.meta.env.VITE_DEV_API + '/v1/adaca' + route
                );
                Object.keys(query).forEach((key) =>
                    url.searchParams.append(key, query[key])
                );
                return {
                    url: url.toString(),
                    method: 'DELETE',
                };
            },
            extraOptions: { private: true },
        }),
        privateDeleteWithBodyRequests: builder.mutation({
            query: ({ route, body }) => {
                const url = new URL(
                    import.meta.env.VITE_DEV_API + '/v1/adaca' + route
                );
                return {
                    url: url.toString(),
                    method: 'DELETE',
                    body: body,
                };
            },
            extraOptions: { private: true },
        }),
    }),
});

// Export the auto-generated hooks
export const {
    usePublicPostRequestsMutation,
    usePrivatePostRequestsMutation,
    usePrivateGetRequestsMutation,
    usePrivateUpdateRequestsMutation,
    usePrivateDeleteRequestsMutation,
    usePrivateDeleteWithBodyRequestsMutation,
} = AdacaAPI;
