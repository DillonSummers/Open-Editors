import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [users, setUsers] = React.useState([]);
  let navigate = useNavigate();

  async function getUsers() {
    const usersData = (
      await axios.get("https://jsonplaceholder.typicode.com/users")
    ).data;
    setUsers(usersData);
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  // Optional navigation function (not used in this version)
  // function getUserPosts(id) {
  //   navigate(`/user/${id}`);
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="user-list">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <Link to={`/${user.id}`}>
                <div className="user-card_container">
                  <h3>{user.name}</h3>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                  <p>
                    <b>Phone:</b> {user.phone}
                  </p>
                  <p>
                    <b>Website:</b> {user.website}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
