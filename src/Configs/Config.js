require('dotenv').config();


let config = {
    baseUrl: process.env.BASE_URL,
    baseUrlPort: process.env.BASE_URL_PORT,
    secretJwt : process.env.JWT_SECRET,
    otpExp : process.env.OTP_EXP,
    passExp : process.env.PASS_EXP,
    emailId : process.env.APP_EMAIL_ID,
    emailPassword : process.env.APP_EMAIL_PASSWORD,
    dbUrl: {
        showtime: process.env.DB_Url
    },
};

module.exports = config;