declare const _default: {
    env: string;
    db: string;
    db_back_up: string;
    port: string;
    app_host: string;
    app_uri: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    mail: {
        service: string;
        root: string;
        key: string;
        secret: string;
        expiresIn: string;
    };
    otp: {
        secret: string;
        expiresIn: string;
    };
    oauth2Jwt: {
        secret: string;
        expiresIn: string;
    };
    sms: {
        sid: string;
        auth_token: string;
    };
    google: {
        url: string;
        client_id: string;
        client_secret: string;
        scope: string[];
        callback_uri: string;
    };
    facebook: {
        app_id: string;
        app_secret: string;
        callback_uri: string;
    };
    github: {
        client_id: string;
        client_secret: string;
        callback_uri: string;
    };
};
export default _default;
