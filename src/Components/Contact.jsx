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

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  // Save contacts to localStorage whenever the contacts state changes
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
      // If no contact is selected, add a new contact
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } else {
      // If a contact is selected, update the selected contact
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
    // Set the selected contact's data to the input fields
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
                <button className="btn" onClick={() => deleteContact(index)}>
                  Delete
                </button>
                <button className="btn" onClick={() => updateContact(index)}>
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
