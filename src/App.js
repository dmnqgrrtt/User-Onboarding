import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Form from './component/Form';


function App() {

  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Advanced Form</h1>
      </header>
      <div className='form-container'>
        <Form users={users} setUsers={setUsers} />
       </div>
       <div classNmame='user-container'>
         {users.map(user => (
           <div className='user-card' key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Role: {user.role}</p>
           </div>
         ))}
       </div>
    </div>
  );
}

export default App;
