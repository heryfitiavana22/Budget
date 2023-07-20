import { getContentType } from "./utils";

export async function createData<T>(uri: string, data: T): Promise<T> {
    const response = await fetch(uri, {
        method: "POST",
        headers: { "Content-type": getContentType(data) },
        body: JSON.stringify(data),
    });

    const responseJSON = await response.json();
    if (!response.ok)
        throw new Error(responseJSON?.message || "Erreur lors de la création");
    return responseJSON as T;
}
