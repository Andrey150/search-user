import React, {useEffect, useState} from 'react';

const DeleteUser = ({ getRoleName }) => {

  const [users, setUsers] = useState([])

  const deleteUser = (userId) => {
    console.log('userId', userId)
    fetch('http://localhost:5000/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    })
      .then((response) => {
        if (response.ok) {
          console.log('response', response)
          console.log('Users file deleted');
          // Дополнительные действия после успешного обновления файла
        } else {
          console.error('Error updating users file');
        }
      })
      .catch((error) => {
        console.error('Error updating users file:', error);
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
              <button onClick={() => deleteUser(user.id)}>Удалить пользователя</button>
              <br/>
            </React.Fragment>
          )
        })
      }
    </div>
  );
};

export default DeleteUser;