
import './App.css';
import {useState,useEffect} from 'react'
import ContactList from './ContactList';
import ContactForm from './ContactForm';
function App() {
  const [contacts,setContacts]=useState([]);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [search,setSearch]=useState('');
  const [filteredContacts,setFilteredContacts]=useState([]);
  // const [contacts,setContacts]=useState([{"firstName":"john","lastName":"doe","email":"2K7v5@example.com","id":1}]);
  useEffect(()=>{
fetchContacts();
  },[])
  const fetchContacts=async()=>{
    const response=await fetch("http://127.0.0.1:5000/contacts")
    const data=await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
    setFilteredContacts(data.contacts);
  }
  const closeModal=()=>{
    setIsModalOpen(false);
    setCurrentContact({})
    console.log('%cclosed','color:blue; font-size:40px')
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
  const handleSearch = (e) => {
    setSearch(e.target.value);
  
    if (e.target.value !== '') {
      const filteredCopy = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        contact.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredContacts(filteredCopy);
    } else {
      setFilteredContacts(contacts);
    }
    console.log("clicked!!!");
    
  }


  return <>
  <div style={{position:'absolute', width: '100%', left:'0',textAlign:'center', marginBottom:'10px' , paddingBottom:'10px'}}>
      <input type="text" placeholder="search"  style={{width:'60%'}} onChange={handleSearch} />
      <button >search</button>
    </div>
    {contacts ? (
  search !== '' ? (
    <ContactList contacts={search !== '' ? filteredContacts : contacts} updateContact={openEditModal} updateCallback={onUpdate} />
    ) : (
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
  )
) : (
  <p>Loading contacts...</p>
)}

<button onClick={openModal} className="create">create new contact</button>
{isModalOpen && <div className="modal">
        
          {/* <span className="close" onClick={closeModal}>&times;</span> */}
          <ContactForm  existingContact={currentContact} updateCallback={onUpdate} closeModal={onUpdate} fetchNewData={fetchContacts} />
    
      </div>
      }
  </> 
}

export default App;
