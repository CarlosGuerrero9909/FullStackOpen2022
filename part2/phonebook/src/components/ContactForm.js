export const ContactForm = ({_newName, _newNumber, _handleNewName, _handleNewNumber, _addContact}) => (
  <form onSubmit={_addContact}>
    <div>
      name: <input value={_newName} onChange={_handleNewName}/>
    </div>
    <div>
      number: <input value={_newNumber} onChange={_handleNewNumber}/>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

