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
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const addContact = () => {
    if (!newContact.firstName || !newContact.lastName || !newContact.phone) {
      alert("Please fill out all the required fields.");
      return;
    }

    if (selectedContactIndex === null) {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } else {
      setContacts((prevContacts) => {
        const updatedContacts = [...prevContacts];
        updatedContacts[selectedContactIndex] = newContact;
        return updatedContacts;
      });
      setSelectedContactIndex(null);
    }

    setNewContact({
      firstName: "",
      lastName: "",
      phone: "",
      gender: "male",
    });
  };

  const deleteContact = (index) => {
    setContacts((prevContacts) => {
      const updatedContacts = [...prevContacts];
      updatedContacts.splice(index, 1);
      return updatedContacts;
    });
  };

  const updateContact = (index) => {
    const selectedContact = contacts[index];
    setNewContact(selectedContact);
    setSelectedContactIndex(index);
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
            <button className="btn" onClick={addContact}>
              {selectedContactIndex === null ? "Add" : "Update"}
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

// Inside your JSX
