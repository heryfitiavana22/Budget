import { concatURL } from "./utils";

export async function deleteOneDataById<T>(
    uri: string,
    id: string
): Promise<T> {
    const url = concatURL(uri, id);
    const response = await fetch(url, { method: "DELETE" });
    if (!response.ok) throw new Error("Error on deleting data");

    return await response.json();
}
