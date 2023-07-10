import React, { Fragment, useState } from 'react'

const EditContacts = ({ contato }) => {
  const [nome, setNome] = useState(contato.nome)
  const [numero, setNumero] = useState(contato.numero)

  //edit contact function
  const updateContato = async e => {
    e.preventDefault()
    try {
      const body = { nome, numero }
      const response = await fetch(
        `http://localhost:5000/contatos/${contato.contato_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      )
      window.location = '/'
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target={`#id${contato.contato_id}`}
      >
        Editar
      </button>

      <div
        className='modal'
        id={`id${contato.contato_id}`}
        onClick={() => {
          setNome(contato.nome)
          setNumero(contato.numero)
        }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Editar Contato</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                onClick={() => {
                  setNome(contato.nome)
                  setNumero(contato.numero)
                }}
              ></button>
            </div>

            <div className='modal-body'>
              <input
                className='form-control mb-2'
                type='text'
                placeholder='Nome'
                value={nome}
                onChange={e => {
                  setNome(e.target.value)
                }}
              />
              <input
                className='form-control mb-2'
                type='text'
                placeholder='Número'
                value={numero}
                onChange={e => {
                  setNumero(e.target.value)
                }}
              />
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={() => {
                  setNome(contato.nome)
                  setNumero(contato.numero)
                }}
              >
                Cancelar
              </button>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
                onClick={e => updateContato(e)}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditContacts
