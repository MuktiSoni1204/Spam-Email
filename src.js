import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [fetching, setFetching] = useState(false);

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = () => {
    setFetching(true);
    axios.get('http://localhost:5000/emails')
      .then(response => {
        setEmails(response.data);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/emails', { subject, body })
      .then(() => {
        setSubject('');
        setBody('');
        fetchEmails();
      });
  };

  const handleCheckSpam = (id) => {
    axios.post('http://localhost:5000/predict', { body })
      .then(response => {
        const updatedEmails = emails.map(email => {
          if (email.id === id) {
            return { ...email, is_spam: response.data.is_spam };
          }
          return email;
        });
        setEmails(updatedEmails);
      });
  };

  return (
    <div className="App">
      <h1>Email Spam Classifier</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Body" required></textarea>
        <button type="submit">Add Email</button>
      </form>
      {fetching ? <p>Loading...</p> : (
        <ul>
          {emails.map(email => (
            <li key={email.id}>
              <strong>{email.subject}</strong> - {email.body}
              <button onClick={() => handleCheckSpam(email.id)}>Check Spam</button>
              <span>{email.is_spam !== undefined ? (email.is_spam ? 'Spam' : 'Not Spam') : 'Unchecked'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
