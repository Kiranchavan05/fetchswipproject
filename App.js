import React,{useState} from 'react';
import './App.css';
import AddUsers from './Components/Users/AddUsers';
import UsersList from './Components/Users/UsersList';

function App() {
 const [usersList,setUsersList]= useState([]);


 const addUserHandler=(uName,uAge,cName)=>{
  setUsersList((prevUserList)=>{
    return [...prevUserList, {name:uName,age:uAge ,collegename:cName, id:Math.random().toString()}]

  });
 };
  return (
    <React.Fragment>
      <AddUsers onAddUsers={addUserHandler}/>
      <UsersList users={usersList}/>
    </React.Fragment>
  );
}

export default App;
