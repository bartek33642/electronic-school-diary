require('dotenv').config();
console.log('SECRET_KEY:', process.env.SECRET_KEY);  

const config = {
    port: process.env.PORT || 3001,
    JwtSecret: process.env.SECRET_KEY,
};


export default config;
