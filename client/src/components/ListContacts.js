import React, { Fragment, useEffect, useState } from 'react'

import EditContacts from './EditContacts';

const ListContacts = () => {
  //hookers
  const [contatos, setContatos] = useState([])

  //delete button
  const deleteContact = async id => {
    try {
        const fetchDeleteContact = await fetch(`http://localhost:5000/contatos/${id}`, {
            method: "DELETE"
        });
        setContatos(contatos.filter(contato => contato.contato_id !== id));
    } catch (err) {
        console.error(err.message)
    } 
  }  

  const getContatos = async () => {
    try {
      const response = await fetch('http://localhost:5000/contatos')
      const listJsonData = await response.json()

      setContatos(listJsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getContatos()
  }, [])
  return (
    <Fragment>
      <table className='table text-center'>
        <thead>
          <tr>
            <th scope='col'>Nome</th>
            <th scope='col'>Cargo</th>
            <th scope='col'>Sexo</th>
            <th scope='col'>Email</th>
            <th scope='col'>Número</th>
            <th scope='col'>&nbsp;</th>
            <th scope='col'>&nbsp;</th>
          </tr>
        </thead>
        {contatos.map((contato, index) => (
          <tbody key={index}>
            <tr key={contato.contato_id}>
              <td>{contato.nome}</td>
              <td>{contato.cargo}</td>
              <td>{contato.sexo}</td>
              <td>{contato.email}</td>
              <td>{contato.numero}</td>
              <td><EditContacts contato={contato} /></td>
              <td><button className='btn btn-danger' onClick={() => deleteContact(contato.contato_id)} >Deletar</button></td>
            </tr>
          </tbody>
        ))}
      </table>
    </Fragment>
  )
}

export default ListContacts
