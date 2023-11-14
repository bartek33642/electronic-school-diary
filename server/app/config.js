require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    JwtSecret: process.env.SECRET_KEY,
    // JwtSecret: 'bW8twK^gI3BL7G2M~pj/sC6*+m'
};


export default config;
