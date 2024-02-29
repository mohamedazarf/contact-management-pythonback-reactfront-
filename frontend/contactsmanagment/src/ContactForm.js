import { useState } from "react";
const ContactForm=({existingContact={},updateCallback,closeModal,fetchNewData})=>{
const [firstName,setFirstName]=useState(existingContact.firstName || "");
    const [lastName,setlastName]=useState(existingContact.lastName || "");
    const [email,setEmail]=useState(existingContact.email || "");
    const updating=Object.entries(existingContact).length > 0;
    const onSubmit=async (e)=>{
        console.log("%cupdating is ===========>>>>", 'color: red', updating);
        e.preventDefault();
        closeModal();
        const data={
            firstName,
            lastName,
            email
        }
        const url = `http://127.0.0.1:5000/${updating ? `update_contact/${existingContact.id}` : "create_contact"}`;
        console.log(`%c exist contact id is========== ${existingContact.id}`, 'color: green');
        const options={
            method:updating ? "PATCH" : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
        const response=await fetch(url,options);
        fetchNewData();
        if(response.status !== 200 || response.status !== 201){
            const data= await response.json();
            alert(data.message);
        }else{
            // fetchNewData();
updateCallback();
// closeModal();

        }
    }
    return <form onSubmit={onSubmit}>
        <span className="close" onClick={closeModal}>&times;</span>
        <div>
            <label htmlFor="firstName">first name</label>
            <input type="text" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <label htmlFor="lastName">first name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e)=>setlastName(e.target.value)} />
            <label htmlFor="email">email</label>
            <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button type="submit">{updating ? "update" : "create contact"}</button>
        </div>
    </form>
}
export default ContactForm;