import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserStats from './components/UserStats';
import UserForm from './components/UserForm';
import useUserStore from './store/userStore';
import './App.css';

function App() {
	const fetchUsers = useUserStore((state) => state.fetchUsers);
  return (
    <div>
      <header>
        <h1>User Management</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <>
			
              <UserList />
			  <UserForm onSuccess={() => {fetchUsers}} />
            </>
          } />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
