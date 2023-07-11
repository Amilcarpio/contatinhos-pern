const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//ROUTES//

//get all
app.get('/contatos', async (req, res) => {
  try {
    const allData = await pool.query('SELECT * FROM contatos')

    res.json(allData.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//get one
app.get('/contatos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const requestContact = await pool.query(
      'SELECT * FROM contatos WHERE contato_id = $1',
      [id]
    )

    res.json(requestContact.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//create
app.post('/contatos', async (req, res) => {
  try {
    const { nome, numero, email, sexo } = req.body
    const newContact = await pool.query(
      'INSERT INTO contatos (nome, numero, email, sexo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, numero, email, sexo]
    )

    res.json(newContact.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//update
app.put('/contatos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, numero, email, sexo } = req.body
    const updateContact = await pool.query(
      'UPDATE contatos SET nome = $1, numero = $2, email = $3, sexo = $4 WHERE contato_id = $5 ',
      [nome, numero, email, sexo, id]
    )

    res.json(updateContact.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//delete
app.delete('/contatos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteContact = await pool.query(
      'DELETE FROM contatos WHERE contato_id = $1',
      [id]
    )
    res.json(deleteContact.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log('Server has started on port 5000.')
})
