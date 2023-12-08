USE [sports_pulse]

-- Create Sport table
CREATE TABLE Sports (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    description TEXT
);

-- Create User table
CREATE TABLE [Users] (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    email VARCHAR(255),
    password TEXT,
    role VARCHAR(50),
    code VARCHAR(50),
    description TEXT
);

-- Create Tournament table
CREATE TABLE Tournaments (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    sport INTEGER,
    start_date DATETIME,
    end_date DATETIME,
    description TEXT,
    managed_by INTEGER
);

-- Create Match table
CREATE TABLE Matches (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    [date] TIMESTAMP,
    venue VARCHAR(255),
    tournament INTEGER NULL,
    team_A INTEGER,
    team_B INTEGER,
    team_A_score INTEGER,
    team_B_score INTEGER,
    winner INTEGER NULL,
    summary TEXT
);

-- Create Match_Details table
CREATE TABLE Match_Details (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    match INTEGER,
    player INTEGER,
    score INTEGER,
    description TEXT
);

-- Create Team table
CREATE TABLE Teams (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    coach VARCHAR(255),
    country INTEGER,
    state VARCHAR(255),
    description TEXT
);

-- Create Player table
CREATE TABLE Players (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    team INTEGER,
    age INTEGER,
    city INTEGER,
    description TEXT
);

-- Create Country table
CREATE TABLE Countries (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255)
);

-- Create City table
CREATE TABLE Cities (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    country INTEGER
);

-- Create Extra_Match_Details table
CREATE TABLE Extra_Match_Details (
    id INTEGER PRIMARY KEY IDENTITY(1,1),
    field VARCHAR(255),
    value INTEGER,
    match_details INTEGER
);

-- Add foreign key constraints using ALTER TABLE
ALTER TABLE Tournaments
ADD FOREIGN KEY (sport) REFERENCES Sports(id);

ALTER TABLE Tournaments
ADD FOREIGN KEY (managed_by) REFERENCES [Users](id);

ALTER TABLE Matches
ADD FOREIGN KEY (tournament) REFERENCES Tournaments(id);

ALTER TABLE Matches
ADD FOREIGN KEY (team_A) REFERENCES Teams(id);

ALTER TABLE Matches
ADD FOREIGN KEY (team_B) REFERENCES Teams(id);

ALTER TABLE Matches
ADD FOREIGN KEY (winner) REFERENCES Teams(id);

ALTER TABLE Match_Details
ADD FOREIGN KEY (match) REFERENCES Matches(id);

ALTER TABLE Match_Details
ADD FOREIGN KEY (player) REFERENCES Players(id);

ALTER TABLE Teams
ADD FOREIGN KEY (country) REFERENCES Countries(id);

ALTER TABLE Players
ADD FOREIGN KEY (team) REFERENCES Teams(id);

ALTER TABLE Players
ADD FOREIGN KEY (city) REFERENCES City(id);

ALTER TABLE Cities
ADD FOREIGN KEY (country) REFERENCES Countries(id);

ALTER TABLE Extra_Match_Details
ADD FOREIGN KEY (match_details) REFERENCES Match_Details(id);


select * from Matches

SELECT M.id as id, M.name, M.date, M.venue, T.name as tournament, Te.name as winner FROM Matches AS M INNER JOIN Tournaments AS T ON M.tournament = T.id LEFT JOIN Teams AS Te ON M.winner = Te.id

SELECT P.id, P.first_name, P.last_name, T.name as team_name, T.id as team_id FROM Players AS P INNER JOIN Teams AS T ON P.team = T.id WHERE T.id = 2

SELECT * FROM Match_Details

SELECT MD.id, P.first_name, MD.score, MD.description, 
M.name AS Match, M.date, M.venue, 
T1.name AS Team_A_name, T1.coach AS Team_A_coach, M.team_A_score,
T2.name AS Team_B_name, T2.coach AS Team_B_coach, M.team_B_score,
T.name AS Tournament, S.name as Sport
FROM Match_Details AS MD 
LEFT JOIN Players AS P ON MD.player = P.id 
LEFT JOIN Matches AS M ON MD.match = M.id 
LEFT JOIN Tournaments AS T ON M.tournament = T.id 
LEFT JOIN Sports AS S ON T.sport = S.id
LEFT JOIN Teams AS T1 ON M.team_A = T1.id
LEFT JOIN Teams AS T2 ON M.team_B = T2.id


