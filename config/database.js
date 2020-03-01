'use strict';

require('dotenv').config();

const dbConfig = {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'dialect': process.env.DB_DIALECT,
    'pool': {
        'max': 5,
        'min': 0,
        'idle': 10000
    },
    'timezone': '+08:00',
    'logging': false,
};

const config = {
    'development': dbConfig,
    'test': dbConfig,
    'production': dbConfig
};

module.exports = config;
