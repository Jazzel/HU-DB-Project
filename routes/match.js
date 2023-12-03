const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");

// @route    GET api/match
// @desc     Get all match
// @access   Public
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Matches");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/match
// @desc     Create a match
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("time", "Time is required").not().isEmpty(),
    check("venue", "Venue is required").not().isEmpty(),
    check("tournament", "Tournament is required").not().isEmpty(),
    check("team_A", "Team_A is required").not().isEmpty(),
    check("team_B", "Team_B is required").not().isEmpty(),
    check("team_A_score", "Team_A_score is required").not().isEmpty(),
    check("team_B_score", "Team_B_score is required").not().isEmpty(),
    check("winner", "Winner is required").not().isEmpty(),
    check("summary", "Summary is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const result = await sql.query(`
        INSERT INTO Matches (name, date, time, venue, tournament, team_A, team_B, team_A_score, team_B_score, winner, summary) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${req.date}', '${req.time}', '${req.venue}', '${req.tournament}', '${req.team_A}', '${req.team_B}', '${req.team_A_score}', '${req.team_B_score}', '${req.winner}', '${req.summary}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
        tournament: req.body.tournament,
        team_A: req.body.team_A,
        team_B: req.body.team_B,
        team_A_score: req.body.team_A_score,
        team_B_score: req.body.team_B_score,
        winner: req.body.winner,
        summary: req.body.summary,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/match/:id
// @desc     Get match by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM Matches WHERE id = ${req.params.id}`
    );

    const match = result.recordset[0];

    if (!match) return res.status(404).json({ msg: "Match not found" });

    return res.json(match);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/match/:id
// @desc     Delete match
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `DELETE FROM Matches WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Match not found" });

    return res.json({ msg: "Match removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/match/:id
// @desc     Update a match
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `UPDATE Matches SET 
        name = '${req.body.name}',
        date = '${req.body.date}',
        time = '${req.body.time}',
        venue = '${req.body.venue}',
        tournament = '${req.body.tournament}',
        team_A = '${req.body.team_A}',
        team_B = '${req.body.team_B}',
        team_A_score = '${req.body.team_A_score}',
        team_B_score = '${req.body.team_B_score}',
        winner = '${req.body.winner}',
        summary = '${req.body.summary}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Match not found" });

    const updatedmatch = {
      id: req.params.id,
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      venue: req.body.venue,
      tournament: req.body.tournament,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      team_A_score: req.body.team_A_score,
      team_B_score: req.body.team_B_score,
      winner: req.body.winner,
      summary: req.body.summary,
    };

    return res.json(updatedmatch);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
