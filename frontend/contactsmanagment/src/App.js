
import './App.css';
import {useState,useEffect} from 'react'
import ContactList from './ContactList';
import ContactForm from './ContactForm';
function App() {
  const [contacts,setContacts]=useState([]);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [currentContact, setCurrentContact] = useState({})
  // const [contacts,setContacts]=useState([{"firstName":"john","lastName":"doe","email":"2K7v5@example.com","id":1}]);
  useEffect(()=>{
fetchContacts();
  },[])
  const fetchContacts=async()=>{
    const response=await fetch("http://127.0.0.1:5000/contacts")
    const data=await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  }
  const closeModal=()=>{
    setIsModalOpen(false);
    setCurrentContact({})
  }
  const openModal=()=>{
    if(!isModalOpen) setIsModalOpen(true);
  }
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return <>
{contacts ? (
  <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
) : (
  <p>Loading contacts...</p>
)}
<button onClick={openModal}>create new contact</button>
{isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm  existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
      }
  </> 
}

export default App;
