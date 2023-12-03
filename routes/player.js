const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");

// @route    GET api/player
// @desc     Get all player
// @access   Public
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Players");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/player
// @desc     Create a player
// @access   Private
router.post(
  "/",
  [
    check("first_name", "First name is required").not().isEmpty(),
    check("last_name", "Last name is required").not().isEmpty(),
    check("team", "Team is required").not().isEmpty(),
    check("age", "Age is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const result = await sql.query(`
        INSERT INTO Players (first_name, last_name, team, age, city, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.first_name}', '${req.last_name}', '${req.team}', '${req.age}', '${req.city}', '${req.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        team: req.body.team,
        age: req.body.age,
        city: req.body.city,
        description: req.body.description,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/player/:id
// @desc     Get player by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM Players WHERE id = ${req.params.id}`
    );

    const player = result.recordset[0];

    if (!player) return res.status(404).json({ msg: "Player not found" });

    return res.json(player);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/player/:id
// @desc     Delete player
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `DELETE FROM Players WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Player not found" });

    return res.json({ msg: "Player removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/player/:id
// @desc     Update a player
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `UPDATE Players SET 
        first_name = '${req.body.first_name}',
        last_name = '${req.body.last_name}',
        team = '${req.body.team}',
        age = '${req.body.age}',
        city = '${req.body.city}',
        description = '${req.body.description}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Player not found" });

    const updatedplayer = {
      id: req.params.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      team: req.body.team,
      age: req.body.age,
      city: req.body.city,
      description: req.body.description,
    };

    return res.json(updatedplayer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
