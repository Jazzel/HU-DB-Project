import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";

import image from "../../assets/img/tom-briskey-HM3WZ4B1gvM-unsplash.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/register", formData);

      if (response.status === 200) {
        alert("User registered !");

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            token: response.data.token,
            isAuthenticated: true,
          })
        );

        navigate("/dashboard");
      } else {
        alert("Something went wrong !");
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.errors[0]?.msg);
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="row" style={{ height: "100vh", overflow: "hidden" }}>
      <div
        className="col-12 col-md-6"
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="styled-font">Sports Pulse</h1>
        <br />
        <h4>Register</h4>

        <form className="p-5 w-75" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              onChange={(e) => onChange(e)}
              value={formData.name}
              placeholder="Enter name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              onChange={(e) => onChange(e)}
              value={formData.email}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              onChange={(e) => onChange(e)}
              value={formData.password}
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              id="role"
              name="role"
              required
              onChange={(e) => onChange(e)}
              value={formData.role}
            >
              <option value="">Select role</option>
              <option value="Moderator">Moderator</option>
              <option value="Audience">Audience</option>
            </select>
          </div>
          <div className="mt-2">
            <Link className="text-dark" to="/login">
              Already a user? Login here.
            </Link>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
