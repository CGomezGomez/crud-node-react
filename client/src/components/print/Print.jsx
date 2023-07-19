import { useEffect } from "react";

const Print = ({ users, setUsers }) => {
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

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.userId}>
            <p>Nombre: {user.name}</p>
            <p>Edad: {user.age}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user.userId)}>
              Eliminar
            </button>
          </div>
        ))}
    </div>
  );
};

export default Print;