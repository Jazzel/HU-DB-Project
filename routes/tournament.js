const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");

// @route    GET api/tournament
// @desc     Get all tournament
// @access   Public
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Tournaments");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/tournament
// @desc     Create a tournament
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("sport", "Sport is required").not().isEmpty(),
    check("start_date", "Start date is required").not().isEmpty(),
    check("end_date", "End date is required").not().isEmpty(),
    check("managed_by", "Managed by is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const result = await sql.query(`
        INSERT INTO Tournaments (name, sport, start_date, end_date, managed_by, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${req.sport}', '${req.start_date}', '${req.end_date}', '${req.managed_by}', '${req.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
        sport: req.body.sport,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        managed_by: req.body.managed_by,
        description: req.body.description,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/tournament/:id
// @desc     Get tournament by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM Tournaments WHERE id = ${req.params.id}`
    );

    const tournament = result.recordset[0];

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    return res.json(tournament);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/tournament/:id
// @desc     Delete tournament
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `DELETE FROM Tournaments WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Tournament not found" });

    return res.json({ msg: "Tournament removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/tournament/:id
// @desc     Update a tournament
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const result = await sql.query(
      `UPDATE tournaments SET 
        name = '${req.body.name}',
        sport = '${req.body.sport}',
        start_date = '${req.body.start_date}',
        end_date = '${req.body.end_date}',
        description = '${req.body.description}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Tournament not found" });

    const updatedtournament = {
      id: req.params.id,
      name: req.body.name,
      sport: req.body.sport,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      managed_by: req.body.managed_by,
      description: req.body.description,
    };

    return res.json(updatedtournament);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
