import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserStats from './components/UserStats';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management</h1>
      </header>
      
      <main className="App-main">
        <Routes>
          <Route path="/" element={
            <>
              {/* <UserStats /> */}
              <UserList />
            </>
          } />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;