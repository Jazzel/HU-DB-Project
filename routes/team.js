const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");

// @route    GET api/team
// @desc     Get all team
// @access   Public
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Teams");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/team
// @desc     Create a team
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("coach", "Coach is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const result = await sql.query(`
        INSERT INTO Teams (name, coach, country, state, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${req.coach}', '${req.country}', '${req.state}', '${req.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
        coach: req.body.coach,
        country: req.body.country,
        state: req.body.state,
        description: req.body.description,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/team/:id
// @desc     Get team by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM Teams WHERE id = ${req.params.id}`
    );

    const team = result.recordset[0];

    if (!team) return res.status(404).json({ msg: "Team not found" });

    return res.json(team);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/team/:id
// @desc     Delete team
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `DELETE FROM Teams WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Team not found" });

    return res.json({ msg: "Team removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/team/:id
// @desc     Update a team
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `UPDATE Teams SET 
        name = '${req.body.name}',
        coach = '${req.body.coach}',
        country = '${req.body.country}',
        state = '${req.body.state}',
        description = '${req.body.description}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Team not found" });

    const updatedteam = {
      id: req.params.id,
      name: req.body.name,
      coach: req.body.coach,
      country: req.body.country,
      state: req.body.state,
      description: req.body.description,
    };

    return res.json(updatedteam);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
