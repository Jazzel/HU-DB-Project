import React from "react";
import Layout from "../../components/Home/Layout";

import image from "../../assets/img/annie-spratt-jY9mXvA15W0-unsplash2.jpg";

const Home = () => {
  const matches = [
    {
      title: "Match 1",
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      teams: "Team 1 vs Team 2",
      tournament: "Tournament 1",
    },
    {
      title: "Match 2",
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      teams: "Team 1 vs Team 2",
      tournament: "Tournament 1",
    },
    {
      title: "Match 3",
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      teams: "Team 1 vs Team 2",
      tournament: "Tournament 1",
    },
    {
      title: "Match 3",
      image:
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      teams: "Team 1 vs Team 2",
      tournament: "Tournament 1",
    },
  ];

  return (
    <Layout>
      <div
        className="row mb-4"
        style={{
          height: 600,
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="row">
        <div className="col-12 col-md-8">
          <h3>Current Matches</h3>
          <div class="row">
            {matches.map(({ title, teams, tournament, image }) => (
              <div className=" col-12 p-0  col-md-4">
                <div class="card m-3">
                  <img
                    src={image}
                    class="card-img-top"
                    height={200}
                    alt="..."
                  />

                  <div class="card-body">
                    <h4 class="card-title">{title}</h4>
                    <p class="card-text">
                      {teams}
                      <br />
                      {tournament}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <h3>Feed</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
