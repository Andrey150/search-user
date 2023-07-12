import React, { useState } from 'react';

const AddUser = ({ lastId, date }) => {
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    name: '',
    type_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Создание объекта с данными нового пользователя
    const newUser = {
      id: lastId + 1,
      login: userData.login,
      password: userData.password,
      name: userData.name,
      last_visit_date: date,
      type_id: userData.type_id,
    };

    // Отправка данных на сервер
    sendUser(newUser);
  };

  const sendUser = (newUser) => {
    fetch('http://localhost:5000/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          console.log('response', response)
          console.log('Users file updated successfully');
          // Дополнительные действия после успешного обновления файла
        } else {
          console.error('Error updating users file');
        }
      })
      .catch((error) => {
        console.error('Error updating users file:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input disabled type="text" placeholder={lastId + 1} value={lastId + 1} />
        <input type="text" name="login" placeholder="login" value={userData.login} onChange={handleChange} />
        <input type="text" name="password" placeholder="password" value={userData.password} onChange={handleChange} />
        <input type="text" name="name" placeholder="name" value={userData.name} onChange={handleChange} />
        <input disabled type="text" placeholder={date} />
        <input
          type="text"
          name="type_id"
          placeholder="type_id"
          value={userData.type_id}
          onChange={handleChange}
        />
        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
};

export default AddUser;
