import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'
import AddUser from "./components/addUser/addUser";

import './App.css'
import StartPage from "./components/startPage/startPage";
import DeleteUser from "./components/deleteUser/deleteUser";
import ReadUser from "./components/readUser/readUser";
import UpdateUser from "./components/updateUser/updateUser";

function App() {

  const [ users, setUsers ] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');
  const [ filteredArr, setFilteredArr ] = useState([])
  const [ isLoading, setIsLoading] = useState(false)
  const [ isFiltered, setIsFiltered ] = useState(false);
  const [lastId, setLastId] = useState(0);

  const now = new Date();
  const date = now.toISOString()

  // let lastUserId = filteredArr.slice(-1)[0]?.id;

  const getRoleName = (typeId) => {
    switch (typeId) {
      case 1:
        return 'Пользователь';
      case 2:
        return 'Администратор';
      case 3:
        return 'Модератор';
      case 4:
        return 'Тестировщик';
      case 5:
        return 'Гость';
      default:
        return 'Гость';
    }
  };

  const handleSubmit = (searchValue, users) => {
    return (e) => {
      e.preventDefault();
      if (!users) {
        return;
      }
      if (!searchValue) {
        return users;
      }
      const filteredUsers = users.filter((el) => {
        const nameMatch = el.name.toLowerCase().includes(searchValue.toLowerCase());
        const loginMatch = el.login.toLowerCase().includes(searchValue.toLowerCase());
        return nameMatch || loginMatch;
      });

      setIsFiltered(true);
      setIsLoading(true)

      console.log('filteredUsers', filteredUsers)

      setTimeout(() => {
        setIsLoading(false)
        setFilteredArr(filteredUsers)
      }, 1000)
    };
  };

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        data.map(user => {
          setLastId(user.id)
        })
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log('lastId', lastId)

  return (
    <>
      <header>
        <Link to="/">start</Link>
        <Link to="/search-user">search user</Link>
        <Link to="/add-user">add user</Link>
        <Link to="/delete-user">delete user</Link>
        <Link to="/update-user">update user</Link>
      </header>
      <Routes>
        <Route path='/' element={<StartPage/>}/>
        <Route path='/search-user' element={
          <ReadUser
            handleSubmit={handleSubmit}
            searchValue={searchValue}
            lastId={lastId}
            date={date}
            isLoading={isLoading}
            isFiltered={isFiltered}
            filteredArr={filteredArr}
            getRoleName={getRoleName}
            users={users}
            setSearchValue={setSearchValue}
          />
        }/>
        <Route path='/add-user' element={
          <AddUser
            lastId={lastId}
            date={date}
          />
        }/>
        <Route path='/update-user' element={
          <UpdateUser
            date={date}
            getRoleName={getRoleName}
          />
        }/>
        <Route path='/delete-user' element={
          <DeleteUser
            users={users}
            getRoleName={getRoleName}
            setUsers={setUsers}
          />
        }/>

      </Routes>

    </>
  );
}

export default App;
