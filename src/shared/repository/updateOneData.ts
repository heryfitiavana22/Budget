import { getContentType, concatURL } from "./utils";

export async function updateOneDataById<T>(uri: string, data: T): Promise<T> {
    const url = concatURL(uri);
    const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-type": getContentType(data) },
        body: JSON.stringify(data),
    });

    const responseJSON = await response.json();
    if (!response.ok)
        throw new Error(
            responseJSON?.message || "Erreur lors de la modification"
        );
    return responseJSON;
}
