import { useState } from "react";
import Print from "../print/Print";
import { StyledForm } from "./styles";

const createUser = async (userData , setUsers) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

const handleFormSubmit = async (event , setUsers) => {
  event.preventDefault();

  const name = event.target.name.value;
  const age = event.target.age.value;
  const email = event.target.email.value;

  const userData = {
    name,
    age,
    email,
  };

  await createUser(userData , setUsers);
};

const Form = () => {

  const [users, setUsers] = useState([]);

  return (
    <div>
    <StyledForm onSubmit={(event)=> handleFormSubmit(event , setUsers)}>

          <label>Nombre:</label>
          <input type="text"  name="name" />
          

          <label>Edad:</label>
          <input type="number"  name="age" />
       
          <label>Email:</label>
          <input type="email"  name="email" />
       

          <button type="submit">
            Crear Usuario
          </button>

    </StyledForm>
    
    <Print users= {users}  setUsers = {setUsers}/>
    
    </div>
   
  );
};

export default Form;