import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand styled-font" href="/">
            Sports Pulse
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarID"
            aria-controls="navbarID"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarID">
            <div className="navbar-nav w-100">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/home/tournaments"
              >
                Tournaments
              </Link>
              <Link
                className="nav-link active"
                aria-current="page"
                to="/home/teams"
              >
                Teams
              </Link>
            </div>
            <div style={{ float: "right" }}>
              <Link
                className="nav-link text-white float-right"
                aria-current="page"
                to="/login"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
