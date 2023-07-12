import React, { Fragment } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

//components
import InputContact from './components/InputContact'
import ListContacts from './components/ListContacts'

function App () {
  return (
    <Fragment>
      <div className='container'>
        <InputContact />
        <ListContacts />
      </div>
    </Fragment>
  )
}

export default App
