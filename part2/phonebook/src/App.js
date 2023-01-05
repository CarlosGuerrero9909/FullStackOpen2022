import React, { useState, useEffect } from 'react'
import Contact from './components/Contacts'
import { ContactForm } from './components/ContactForm'
import { Filter } from './components/Filter'
import { Notification, ErrorNotification } from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [ contacts, setContacts ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const contactsToShow = contacts.filter(contact => contact.name.includes(filterName))

  const addContact = event => {
    event.preventDefault()
    const validateContact = contacts.find(contact => contact.name === newName) 
    
    if ( validateContact === undefined) {
      const newContact = {
        name: newName,
        number: newNumber,
      }
      contactService
        .create(newContact)
        .then(createdContact => {
          setContacts(contacts.concat(createdContact))
          setMessage(
            `Added ${createdContact.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      resetFields()
    } 
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const id = validateContact.id
      contactService
        .update(id, {...validateContact, number: newNumber})
        .then(modifiedContact => {
          setContacts(contacts.map(contact => contact.id !== id ? contact : modifiedContact))
          setMessage(
            `Update ${validateContact.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${validateContact.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setContacts(contacts.filter(contact => contact.id !== id))
        })
      resetFields()
    } 
    else {
      resetFields()
    }
  }

  const deleteContact = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      contactService
        .erase(id)
        .then( () => {
          setContacts(contacts.filter(contact => contact.id !== id))
          setMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilterName = (event) => setFilterName(event.target.value)

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorNotification message={errorMessage}/>
      <Filter _filterName={filterName} _handleFilterName={handleFilterName}/>
      <h2>Add a new</h2>
      <ContactForm 
        _newName={newName} 
        _newNumber={newNumber} 
        _handleNewName={handleNewName}
        _handleNewNumber={handleNewNumber}
        _addContact={addContact}
      />
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map(contact => 
          <Contact 
            key={contact.id} 
            name={contact.name} 
            number={contact.number} 
            deleteContact={() => deleteContact(contact.id, contact.name)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
