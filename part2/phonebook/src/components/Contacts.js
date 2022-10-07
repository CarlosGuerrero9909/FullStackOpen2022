const Contact = ({ name, number, deleteContact }) => {
  return ( 
    <>
      <li>{name} {number}</li>
      <button onClick={deleteContact}>Delete</button>
    </>
  )
}

export default Contact
