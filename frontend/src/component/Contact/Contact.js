import React, { useState } from 'react';
import './Contact.css'; // Make sure to have a corresponding CSS file

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    contactNo: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log(formData);
    // Clear the form after submission if needed
    setFormData({
      name: '',
      address: '',
      email: '',
      contactNo: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">
            <i className="fas fa-user"></i>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="address">
            <i className="fas fa-map-marker-alt"></i>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="contactNo">
            <i className="fas fa-phone"></i>
          </label>
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            placeholder="Contact No"
            value={formData.contactNo}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="message">
            <i className="fas fa-comment"></i>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
