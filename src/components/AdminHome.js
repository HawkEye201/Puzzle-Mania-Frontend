import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "./api/api";
import axios from "axios";

function AdminHome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    if (username) {
      setUserName(username);
    }
    if (id) {
      setId(id);
    } else {
      navigate("/");
    }
    try {
      axios
        .get(baseURL + "/user/details/all/" + id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
    try {
      console.log(id);
      axios
        .get(baseURL + "/user/all/" + id)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome {userName}</p>

      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>25</td>
              <td>New York</td>
            </tr>
            <tr>
              <td>Jane</td>
              <td>30</td>
              <td>Los Angeles</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
