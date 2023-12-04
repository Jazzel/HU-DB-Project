import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { fixDate } from "../../App";
import { Link } from "react-router-dom";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`/matches`);
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const answer = window.confirm("Are you sure you want to delete ? ");
    if (answer) {
      const response = await axios.delete(`/matches/${id}`);

      if (response.status === 200) {
        alert("Match Deleted !");
        getData();
      }
    }
  };
  return (
    <Layout activeLink={"Matches"}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Matches</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/matches/add" className="btn btn-dark m-1">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more matches
          </Link>
        </div>
        <hr />
      </div>
      <table className="table  table-responsive table-striped dataTables">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Tournament</th>
            <th>Winner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 &&
            matches.map((match, index) => (
              <tr key={match.id}>
                <td>{index + 1}</td>
                <td>{match.name}</td>
                <td>{fixDate(match.date)}</td>
                <td>{match.venue}</td>
                <td>{match.tournament}</td>
                <td>{match.winner}</td>
                <td>
                  <Link
                    to={`/matches/${match.id}/true`}
                    className="btn btn-dark btn-sm"
                  >
                    View
                  </Link>{" "}
                  |{" "}
                  <Link
                    to={`/matches/edit/${match.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Matches;
