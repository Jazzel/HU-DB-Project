import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";

const TeamForm = () => {
  const { id, viewOnly } = useParams();
  const [countries, setCountries] = useState([]);

  const getData = async () => {
    try {
      const responseCountry = await axios.get(`/countries`);
      if (id) {
        const response = await axios.get(`/teams/${id}`);
        setFormData({ ...response.data, country: response.data.country });
      }
      setCountries(responseCountry.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    coach: "",
    country: "",
    state: "",
    description: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!id) {
      response = await axios.post(`/teams`, formData);
    } else {
      response = await axios.put(`/teams/${id}`, formData);
    }
    if (response.status === 200) {
      alert(id ? "Team updated !" : "Team added !");
      navigate("/teams");
    } else {
      alert("Something went wrong !");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Teams"}>
      <div className="row">
        <div className="col-9">
          <h1>Teams | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/teams" className="btn btn-outline-light mr-0">
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="p-5">
        <div className="mb-3">
          <label className="form-label">Team name</label>
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
          <label className="form-label">Coach</label>
          <input
            type="text"
            className="form-control"
            id="coach"
            name="coach"
            required
            onChange={(e) => onChange(e)}
            value={formData.coach}
            placeholder="Enter coach name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country {formData.country}</label>
          <select
            className="form-control"
            required
            name="country"
            value={formData.country}
            onChange={(e) => onChange(e)}
          >
            <option value={""}>Select Country</option>
            {countries.map((country) => (
              <option
                selected={formData.country === country.id}
                key={country.id}
                value={country.id}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            required
            onChange={(e) => onChange(e)}
            value={formData.state}
            placeholder="Enter state"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            required
            onChange={(e) => onChange(e)}
            value={formData.description}
            placeholder="Enter description"
          ></textarea>
        </div>
        {!viewOnly && (
          <button type="submit" className="btn btn-dark w-100">
            {!id ? "Add" : "Edit"}
          </button>
        )}
      </form>
    </Layout>
  );
};

export default TeamForm;
