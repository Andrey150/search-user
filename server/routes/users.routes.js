const Router = require("express");
const fs = require("fs");

const router = new Router();

router.post('/add-user', (req, res) => {
  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    try {
      const newUserData = JSON.parse(requestBody);
      const users = JSON.parse(fs.readFileSync('./api/Users.json', 'utf8'));

      // Генерация уникального идентификатора для нового пользователя
      const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

      // Создание объекта нового пользователя
      const newUser = {
        id: newUserId,
        login: newUserData.login,
        password: newUserData.password,
        name: newUserData.name,
        type_id: newUserData.type_id,
        last_visit_date: newUserData.last_visit_date
      };

      users.push(newUser);

      fs.writeFileSync('./api/Users.json', JSON.stringify(users, null, 2), 'utf8');

      res.statusCode = 200;
      res.write('User added successfully');
    } catch (error) {
      res.statusCode = 500;
      res.write('Error adding user');
    } finally {
      res.end();
    }
  });
});

router.post('/delete-user', (req, res) => {
  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    try {
      const userId = JSON.parse(requestBody);
      const users = JSON.parse(fs.readFileSync('./api/Users.json', 'utf8'));
      console.log('userId', userId)
      users.splice(userId -1, 1);

      fs.writeFileSync('./api/Users.json', JSON.stringify(users, null, 2), 'utf8');

      res.statusCode = 200;
      res.write('User added successfully');
    } catch (error) {
      res.statusCode = 500;
      res.write('Error adding user');
    } finally {
      res.end();
    }
  });
});

router.post('/update-user', (req, res) => {
  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    try {
      const updatedFields = JSON.parse(requestBody);
      const users = JSON.parse(fs.readFileSync('./api/Users.json', 'utf8'));

      // Находим пользователя по идентификатору и обновляем его поля
      const index = users.findIndex(user => user.id === updatedFields.id);
      if (index !== -1) {
        const updatedUser = { ...users[index], ...updatedFields };
        users[index] = updatedUser;
        fs.writeFileSync('./api/Users.json', JSON.stringify(users, null, 2), 'utf8');
        res.statusCode = 200;
        res.write('User updated successfully');
      } else {
        res.statusCode = 404;
        res.write('User not found');
      }
    } catch (error) {
      res.statusCode = 500;
      res.write('Error updating user');
    } finally {
      res.end();
    }
  });
});


module.exports = router;