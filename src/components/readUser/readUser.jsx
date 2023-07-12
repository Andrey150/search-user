import React from 'react';
import AddUser from "../addUser/addUser";

const ReadUser = ({handleSubmit, searchValue, isLoading, isFiltered, filteredArr, getRoleName, users, setSearchValue}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(searchValue, users)}>
        <input type="text" name="text" className="search" placeholder="Search here!" onChange={(e) => setSearchValue(e.target.value)}/>
        <input type="submit" name="submit" className="submit" value="Search" />
      </form>


      <br/>
      {
        isLoading ? (
          <div>Loading ...</div>
        ) : isFiltered ? (
          filteredArr.length > 0 ? (
            filteredArr.slice(0).reverse().map((user) => {
              return (
                <React.Fragment key={user.id}>
                  <div>{user.id}</div>
                  <div>{user.login}</div>
                  <div>{user.password}</div>
                  <div>{user.name}</div>
                  <div>{user.last_visit_date}</div>
                  <div>{getRoleName(user.type_id)}</div>
                  <br/>
                </React.Fragment>
              )
            })
          ) : (
            <div>Пользователь не найден</div>
          )
        ) : (
          users.slice(0).reverse().map((user) => {
            return (
              <React.Fragment key={user.id}>
                <div>{user.id}</div>
                <div>{user.login}</div>
                <div>{user.password}</div>
                <div>{user.name}</div>
                <div>{user.last_visit_date}</div>
                <div>{getRoleName(user.type_id)}</div>
                <br/>
              </React.Fragment>
            )
          })
        )
      }
    </div>
  );
};

export default ReadUser;