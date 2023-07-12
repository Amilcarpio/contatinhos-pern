import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import EditContacts from './EditContacts'

const ListContacts = () => {
  //hooks
  const [contatos, setContatos] = useState([])
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  //paginate list functions
  const paginate = (array, pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return array.slice(startIndex, endIndex)
  }
  const paginatedContatos = paginate(contatos, currentPage)

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1)
  }

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const goToPage = pageNumber => {
    setCurrentPage(pageNumber)
  }

  //delete data & seting modal functions
  const deleteContact = id => {
    const contact = contatos.find(contato => contato.contato_id === id)
    setContactToDelete(contact)
    setShowConfirmationModal(true)
  }
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contatos/${contactToDelete.contato_id}`,
        {
          method: 'DELETE'
        }
      )
      if (response.ok) {
        setContatos(
          contatos.filter(
            contato => contato.contato_id !== contactToDelete.contato_id
          )
        )
      }
    } catch (err) {
      console.error(err.message)
    }
    setShowConfirmationModal(false)
    setContactToDelete(null)
  }
  const cancelDelete = () => {
    setShowConfirmationModal(false)
    setContactToDelete(null)
  }

  //fetch data
  const getContatos = async () => {
    try {
      const response = await fetch('http://localhost:5000/contatos')
      const listJsonData = await response.json()

      setContatos(listJsonData)

      setCurrentPage(1) //setting actual page to the first page
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    getContatos()
  }, [])

  return (
    <Fragment>
      {/* table content */}
      <table className='table table-striped text-center table-hover'>
        <thead className='table-active text-secondary'>
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
        {paginatedContatos.map((contato, index) => (
          <tbody key={index}>
            <tr className='text-secondary' key={contato.contato_id}>
              <td className='text-dark'>{contato.nome}</td>
              <td>{contato.cargo}</td>
              <td>{contato.sexo}</td>
              <td>{contato.email}</td>
              <td className='text-primary'>{contato.numero}</td>
              <td>
                <EditContacts contato={contato} />
              </td>
              <td>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => deleteContact(contato.contato_id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {/* delete modal */}
      <Modal
        show={showConfirmationModal}
        onHide={cancelDelete}
        centered
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletar funcionário do banco de dados.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Deseja deletar o funcionário do banco de dados?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={confirmDelete}>
            Deletar
          </Button>
          <Button variant='secondary' onClick={cancelDelete}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* pagination footer */}
      <div className='pagination'>
        <button
          className='btn btn-secondary m-1'
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from(
          { length: Math.ceil(contatos.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1
                  ? 'btn-secondary active m-1'
                  : 'btn-secondary m-1'
              }`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className='btn btn-secondary m-1'
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(contatos.length / itemsPerPage)}
        >
          Próxima
        </button>
      </div>
    </Fragment>
  )
}

export default ListContacts
