import { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const userId = window.location.pathname.split('/').pop(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details-container">
      <h1 className="user-details-title">Detalle del Usuario</h1>
      <div className="user-details-content">
        <img src={user.profileImage} alt="Profile" className="user-details-image" />
        <div className="user-details-info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
