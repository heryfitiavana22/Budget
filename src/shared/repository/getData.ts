import { concatURL } from "./utils";

export async function getAllData<T>({
    uri,
    cache = "default",
}: GetData): Promise<T[]> {
    const url = concatURL(uri);
    const response = await fetch(url, { cache });
    if (!response.ok) throw new Error("Erreur lors de la récupération");
    if (response.status == 200) return await response.json();
    return [];
}
type GetData = {
    uri: string;
    cache: RequestCache;
};

export async function getOneDataById<T>({
    uri,
    id,
    cache = "default",
}: GetOneDataById): Promise<T | undefined> {
    const url = concatURL(uri, id);
    const response = await fetch(url, { cache });
    if (!response.ok) throw new Error("Erreur lors de la récupération");
    if (response.status == 200) return await response.json();
    return {} as T;
}
type GetOneDataById = GetData & {
    id: string;
};

export async function getAllDataBy<T>({
    uri,
    by,
    value,
    cache = "default",
}: GetAllDataBy<T>): Promise<T[]> {
    const url = concatURL(uri, by, value);
    const response = await fetch(url, { cache });
    if (!response.ok) throw new Error("Erreur lors de la récupération");
    if (response.status == 200) return await response.json();
    return [];
}

export async function getOneDataBy<T>({
    uri,
    by,
    value,
    cache = "default",
}: GetAllDataBy<T>): Promise<T | undefined> {
    // la réponse est un tableau,
    return (await getAllDataBy<T>({ uri, by, value, cache }))[0];
}

type GetAllDataBy<T> = GetData & {
    by: keyof T;
    value: string;
};
