import React from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

const InputContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async data => {
    try {
      const response = await fetch('http://localhost:5000/contatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      reset()
      window.location = '/'
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleCancel = () => {
    reset()
  }

  return (
    <React.Fragment>
      <h1 className='text-center mt-5'>Quadro de Funcionários</h1>
      <button
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addContactModal'
      >
        Adicionar
      </button>
      <div className='modal' id='addContactModal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Adicionar Contato</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3' id='divName'>
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
                    {...register('nome', { required: 'Insira um nome.' })}
                  />
                  {errors.nome && (
                    <div className='invalid-feedback'>
                      {errors.nome.message}
                    </div>
                  )}
                </div>
                <div className='mb-3' id='divEmail'>
                  <label htmlFor='email' className='form-label'>
                    E-mail:
                  </label>
                  <input
                    type='text'
                    id='email'
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    placeholder='E-mail'
                    {...register('email', {
                      required: 'Insira um e-mail válido.',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido'
                      }
                    })}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className='mb-3' id='divSex'>
                  <label htmlFor='sexo' className='form-label'>
                    Sexo:
                  </label>
                  <select
                    id='sexo'
                    className={`form-select ${errors.sexo ? 'is-invalid' : ''}`}
                    placeholder='Sexo'
                    {...register('sexo', { required: 'Selecione um item.' })}
                  >
                    <option value=''>Selecione um gênero</option>
                    <option value='Masculino'>Masculino</option>
                    <option value='Feminino'>Feminino</option>
                    <option value='N/A'>Não especificar</option>
                  </select>
                  {errors.sexo && (
                    <div className='invalid-feedback'>
                      {errors.sexo.message}
                    </div>
                  )}
                </div>
                <div className='mb-3' id='divCargo'>
                  <label htmlFor='cargo' className='form-label'>
                    Cargo:
                  </label>
                  <input
                    type='text'
                    id='cargo'
                    className={`form-control ${
                      errors.cargo ? 'is-invalid' : ''
                    }`}
                    placeholder='Cargo'
                    {...register('cargo', {
                      required: 'Insira um cargo válido.'
                    })}
                  />
                  {errors.cargo && (
                    <div className='invalid-feedback'>
                      {errors.cargo.message}
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
                    type='text'
                    id='numero'
                    className={`form-control ${
                      errors.numero ? 'is-invalid' : ''
                    }`}
                    placeholder='Número'
                    {...register('numero', {
                      required: 'Digite um número válido.'
                    })}
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
                    className='btn btn-secondary'
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

export default InputContact
