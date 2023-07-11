const Pool = require('pg').Pool

const pool = new Pool ({
    user:'amilcarpio',
    password:'267800',
    host: 'localhost',
    database: 'contatinhos',
    port: 5432
})

module.exports = pool;