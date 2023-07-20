import { useState , useEffect } from "react";

const Print = ({ users, setUsers }) => {
  const [editedUser, setEditedUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        
        const updatedUsers = users.filter((user) => user.userId !== userId);
        setUsers(updatedUsers);
      } else {
        console.error("Error al eliminar usuario.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.userId === userId);
    setEditedUser(userToEdit);
  };

const handleUpdateUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${editedUser.userId}`,
        {
          method: "PUT",
          body: JSON.stringify(editedUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        
        const updatedUsers = users.map((user) =>
          user.userId === editedUser.userId ? editedUser : user
        );
        setUsers(updatedUsers);
        setEditedUser(null); 
      } else {
        console.error("Error al actualizar usuario.");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.userId}>
            <p>Nombre: {user.name}</p>
            <p>Edad: {user.age}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleEditUser(user.userId)}>
              Editar
            </button>
            <button onClick={() => handleDeleteUser(user.userId)}>
              Eliminar
            </button>
          </div>
        ))} 
      {editedUser && (
        <div>
          <h3>Editar Usuario:</h3>
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
          />
          <input
            type="number"
            value={editedUser.age}
            onChange={(e) =>
              setEditedUser({ ...editedUser, age: parseInt(e.target.value) })
            }
          />
          <input
            type="email"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
          />
          <button onClick={handleUpdateUser}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default Print;