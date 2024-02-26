const ContactList =({contacts,updateContact,updateCallback})=>{
  const onDelete = async (id) => {
    try {
        const options = {
            method: "DELETE"
        }
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
        if (response.status === 200) {
            updateCallback()
        } else {
            console.error("Failed to delete")
        }
    } catch (error) {
        alert(error)
    }
}
    return <div>
<h2>contacts</h2>
<table>
<thead>
<tr>
  <th style={{ textAlign: 'center' }}>id</th>
  <th style={{ textAlign: 'center' }}>first name</th>
  <th style={{ textAlign: 'center' }}>ln</th>
  <th style={{ textAlign: 'center' }}>email</th>
  <th style={{ textAlign: 'center' }}>actions</th>
</tr>
</thead>
<tbody>
{contacts.map((contact) => (
            // Explicitly return the JSX for each row:
          
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>
                  <button onClick={() => updateContact(contact)}>Update</button>
                  <button onClick={() => onDelete(contact.id)}>Delete</button>
                </td>
              </tr>
  
          ))}
        </tbody>
</table>
    </div>
}
export default ContactList;