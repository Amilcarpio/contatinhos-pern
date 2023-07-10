const Pool = require('pg').Pool

const pool = new Pool ({
    user:'username',
    password:'password',
    host: 'localhost',
    database: 'contatinhos',
    port: 5432
})

module.exports = pool;