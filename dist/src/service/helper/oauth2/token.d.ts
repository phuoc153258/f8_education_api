export declare function getTokens({ code, clientId, clientSecret, redirectUri, }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}): Promise<{
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}>;
