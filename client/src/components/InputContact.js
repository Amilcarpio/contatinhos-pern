import React, { Fragment, useState } from 'react'

const InputContact = () => {
  //hookers
  const [nome, setNome] = useState('')
  const [numero, setNumero] = useState('')
  //request async
  const onSubmitForm = async e => {
    try {
      e.preventDefault()
      const body = { nome, numero }
      const response = await fetch('http://localhost:5000/contatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      window.location = '/';
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Contatinhos</h1>
      <form className='d-flex flex-column' onSubmit={onSubmitForm}>
        <input
          type='text'
          className='form-control mb-2'
          placeholder='Nome'
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type='text'
          className='form-control mb-2'
          placeholder='Número'
          value={numero}
          onChange={e => setNumero(e.target.value)}
        />
        <div className='d-flex justify-content-end'>
          <button className='btn btn-success'>Adicionar</button>
        </div>
      </form>
    </Fragment>
  )
}

export default InputContact
