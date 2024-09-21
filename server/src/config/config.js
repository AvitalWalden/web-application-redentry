require('dotenv').config();;
const { DB_URI,
    CORS_ORIGIN,
} = process.env;

module.exports = {
    DB_URI,
    CORS_ORIGIN
};