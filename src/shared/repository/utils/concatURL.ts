export function concatURL(...uri: URIParams[]) {
    return `${uri.join("/")}`;
}

type URIParams = string | number | symbol;
