import React, { useState, useEffect } from "react";
import "./Contact.css";
const ContactApp = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "male",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  const addContact = () => {
    setContacts([...contacts, newContact]);
    setNewContact({
      firstName: "",
      lastName: "",
      phone: "",
      gender: "male",
    });
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const updateContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = newContact;
    setContacts(updatedContacts);
    setNewContact({
      firstName: "",
      lastName: "",
      phone: "",
      gender: "male",
    });
  };

  const searchContacts = () => {
    return contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="container">
      <h1>Contact App</h1>
      <div className="contact_wrapper">
        <div className="user">
          <div>
            <input
              type="text"
              name="firstName"
              value={newContact.firstName}
              onChange={handleInputChange}
              placeholder="First Name:"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={newContact.lastName}
              onChange={handleInputChange}
              placeholder="Last Name:"
            />
          </div>
          <div>
            <label></label>
            <input
              type="text"
              name="phone"
              value={newContact.phone}
              onChange={handleInputChange}
              placeholder="Phone:"
            />
          </div>
          <div>
            <label></label>
            <select
              name="gender"
              value={newContact.gender}
              onChange={handleInputChange}
              placeholder="Gender:"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <button className="btn1" onClick={addContact}>
              Add
            </button>
          </div>
          <div>
            <label></label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search:"
            />
          </div>
        </div>
        <div className="list">
          <ul className="list">
            {searchContacts().map((contact, index) => (
              <li key={index}>
                {contact.firstName} {contact.lastName} - {contact.phone} -{" "}
                {contact.gender}
                <button className="btn1" onClick={() => deleteContact(index)}>
                  Delete
                </button>
                <button className="btn1" onClick={() => updateContact(index)}>
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
