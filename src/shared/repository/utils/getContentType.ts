export function getContentType<T>(data: T) {
    return data instanceof FormData ? "multipart/form-data" : "application/json"
}
