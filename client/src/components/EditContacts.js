import React from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

const EditContacts = ({ contato }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const onSubmit = async data => {
    try {
      const body = { nome: data.nome, numero: data.numero }
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

  const handleCancel = () => {
    setValue('nome', contato.nome)
    setValue('numero', contato.numero)
  }

  return (
    <React.Fragment>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target={`#id${contato.contato_id}`}
      >
        Editar Informações
      </button>

      <div className='modal' id={`id${contato.contato_id}`}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Editar Contato</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                onClick={handleCancel}
              ></button>
            </div>

            <div className='modal-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                  <label htmlFor='nome' className='form-label'>
                    Nome:
                  </label>
                  <input
                    type='text'
                    id='nome'
                    className={`form-control ${
                      errors.nome ? 'is-invalid' : ''
                    }`}
                    placeholder='Nome'
                    defaultValue={contato.nome}
                    {...register('nome', { required: 'Campo obrigatório' })}
                  />
                  {errors.nome && (
                    <div className='invalid-feedback'>
                      {errors.nome.message}
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <label htmlFor='numero' className='form-label'>
                    Número:
                  </label>
                  <InputMask
                    mask='(99) 99999-9999'
                    maskChar=''
                    id='numero'
                    className={`form-control ${
                      errors.numero ? 'is-invalid' : ''
                    }`}
                    placeholder='Número'
                    defaultValue={contato.numero}
                    {...register('numero', { required: 'Campo obrigatório' })}
                  />
                  {errors.numero && (
                    <div className='invalid-feedback'>
                      {errors.numero.message}
                    </div>
                  )}
                </div>

                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-danger'
                    data-bs-dismiss='modal'
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button type='submit' className='btn btn-success'>
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EditContacts
