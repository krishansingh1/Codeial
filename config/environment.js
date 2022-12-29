const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
})

const development = {
    name: 'development',
    assest_path: "./assets",
    session_cookie_key: "something",
    db: "codeial",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "kkrishan7074",
            pass: "yomxdgwdwahutvtd",
        },
    },
    google_client_ID:
        "819625955536-29pfguf07vn491jr3p6uc9o85c0l0l2g.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_call_back_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codeial",
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}

const production = {
    name: 'production',
    assest_path: process.env.codeial_assets_path,
    session_cookie_key: process.env.codeial_session_cookie_key,
    db: process.env.codeial_db,
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.codeial_gmail_username,
            pass: process.env.codeial_gmail_password,
        },
    },
    google_client_ID: process.env.google_client_id,
    google_client_Secret: process.env.google_client_secret,
    google_call_back_URL: process.env.google_callback_url,
    jwt_secret: process.env.codeial_jwt_secret,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}

module.exports = eval(process.env.codeial_environment) == undefined ? development : eval(process.env.codeial_environment);