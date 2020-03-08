'use strict';

require('dotenv').config();

const dbConfig = {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'dialect': process.env.DB_DIALECT,
    'dialectOptions': {
        'dateStrings': true,
        'typeCast': true
    },
    'pool': {
        'max': 5,
        'min': 0,
        'idle': 10000
    },
    'timezone': '+00:00',
    'logging': console.log,
};

const config = {
    'development': dbConfig,
    'test': dbConfig,
    'production': dbConfig
};

module.exports = config;
