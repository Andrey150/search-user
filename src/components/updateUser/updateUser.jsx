import React, {useEffect, useState} from 'react';
import './updateUser.css'

const UpdateUser = ({date, getRoleName}) => {

  const [users, setUsers] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    id: null,
    login: '',
    password: '',
    name: '',
    type_id: '',
    last_visit_date: date
  });

  const updateUser = (userId) => {
    setIsActive(true);
    const pickedUser = users.find(user => user.id === userId);
    setCurrentUser({
      id: pickedUser.id,
      login: pickedUser.login,
      password: pickedUser.password,
      name: pickedUser.name,
      type_id: pickedUser.type_id,
      last_visit_date: date
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Создание объекта с измененными данными пользователя
    const updatedFields = {
      id: currentUser.id
    };

    if (currentUser.login !== '') {
      updatedFields.login = currentUser.login;
    }

    if (currentUser.password !== '') {
      updatedFields.password = currentUser.password;
    }

    if (currentUser.name !== '') {
      updatedFields.name = currentUser.name;
    }

    if (currentUser.type_id !== '') {
      updatedFields.type_id = currentUser.type_id;
    }

    // Отправка данных на сервер
    sendUser(updatedFields);
    setIsActive(false);
  };

  const sendUser = (updatedFields) => {
    fetch('http://localhost:5000/update-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => {
        if (response.ok) {
          console.log('response', response)
          console.log('User updated successfully');
          // Дополнительные действия после успешного обновления пользователя
        } else {
          console.error('Error updating user');
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [users]);


  return (
    <div>
      {
        users.slice(0).reverse().map((user) => {
          return (
            <React.Fragment key={user.id}>
              <br/>
              <div>{user.id}</div>
              <div>{user.login}</div>
              <div>{user.password}</div>
              <div>{user.name}</div>
              <div>{user.last_visit_date}</div>
              <div>{getRoleName(user.type_id)}</div>
              <button onClick={() => updateUser(user.id)}>Обновить пользователя</button>
              <br/>
            </React.Fragment>
          )
        })
      }
      {
        isActive && <div className='modal'>
          <form onSubmit={handleSubmit}>
            <input disabled type="text" placeholder={currentUser.id} value={currentUser.id} />
            <input type="text" name="login" placeholder="login" value={currentUser.login} onChange={handleChange} />
            <input type="text" name="password" placeholder="password" value={currentUser.password} onChange={handleChange} />
            <input type="text" name="name" placeholder="name" value={currentUser.name} onChange={handleChange} />
            <input disabled type="text" placeholder={date} />
            <input
              type="text"
              name="type_id"
              placeholder="type_id"
              value={currentUser.type_id}
              onChange={handleChange}
            />
            <input type="submit" value="Отправить" />
          </form>
        </div>
      }
    </div>
  );
};

export default UpdateUser;