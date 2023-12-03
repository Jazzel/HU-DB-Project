const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");

// @route    GET api/matchDetail
// @desc     Get all matchDetail
// @access   Public
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM MatchDetails");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/matchDetail
// @desc     Create a matchDetail
// @access   Private
router.post(
  "/",
  [
    check("match", "Match is required").not().isEmpty(),
    check("player", "Player is required").not().isEmpty(),
    check("score", "Score is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const result = await sql.query(`
        INSERT INTO MatchDetails (match, player, score, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.match}', '${req.player}', '${req.score}', '${req.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        match: req.body.match,
        player: req.body.player,
        score: req.body.score,
        description: req.body.description,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/matchDetail/:id
// @desc     Get matchDetail by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM MatchDetails WHERE id = ${req.params.id}`
    );

    const matchDetail = result.recordset[0];

    if (!matchDetail)
      return res.status(404).json({ msg: "MatchDetail not found" });

    return res.json(matchDetail);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/matchDetail/:id
// @desc     Delete matchDetail
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `DELETE FROM MatchDetails WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "MatchDetail not found" });

    return res.json({ msg: "MatchDetail removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/matchDetail/:id
// @desc     Update a matchDetail
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `UPDATE MatchDetails SET 
        match = '${req.body.match}',
        player = '${req.body.player}',
        score = '${req.body.score}',
        description = '${req.body.description}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "MatchDetail not found" });

    const updatedMatchDetail = {
      id: req.params.id,
      match: req.body.match,
      player: req.body.player,
      score: req.body.score,
      description: req.body.description,
    };

    return res.json(updatedMatchDetail);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
