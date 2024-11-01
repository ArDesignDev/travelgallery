import React, { useState } from 'react';
import styles from './ContactForm.module.scss';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formEndpoint = 'https://api.web3forms.com/submit'; // Web3Forms submission URL
    const accessKey = '1dc2c3f5-5519-4257-9899-1fba6c9eb052'; // Replace with your actual Web3Forms access key

    const data = {
      ...formData,
      access_key: accessKey
    };

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setError('');
        // Clear form data
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError('Submission failed, please try again.');
      }
    } catch (error) {
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <div>
      {submitted ? (
        <p>Thank you for your message! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Write your message" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.btn}>Send Message</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default ContactForm;
