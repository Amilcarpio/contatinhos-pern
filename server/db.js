const Pool = require('pg').Pool

const pool = new Pool({
  user: 'INSERIR USER AQUI',
  password: 'INSERIR SENHA AQUI',
  host: 'localhost',
  database: 'contatinhos',
  port: 5432
})

module.exports = pool
