import pool from "../../db";
const express = require("express");
const app = express();

const schoolEndpoint = (app) => {
  app.get("/schools", async (req, res) => {
    try {
      const schoolsQuery =
        "SELECT school_id, school_name, town, street, building_number, apartment_number, zip_code FROM gradebook.schools";
      const { rows } = await pool.query(schoolsQuery);
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/schools-count", async (req, res) => {
    try {
      const schoolcountQuery = "SELECT COUNT(*) FROM gradebook.schools";
      const { rows } = await pool.query(schoolcountQuery);
      const schoolCount = parseInt(rows[0].count);
      res.send({ schoolCount });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post("/add-school", async (req, res) => {
    const {
      school_name,
      town,
      street,
      building_number,
      apartment_number,
      zip_code,
    } = req.body;

    try {
      const addSchool = await pool.query(
        `INSERT INTO gradebook.schools(school_name, town, street, building_number, apartment_number, zip_code) VALUES ($1, $2, $3, $4, $5, $6)`,
        [school_name, town, street, building_number, apartment_number, zip_code]
      );

      res.status(201).json({ message: "Szkoła dodana pomyślnie." });
    } catch (error) {
      console.error("Błąd dodania szkoły:", error);
      res.status(500).json({ error: "Błąd dodania szkoły" });
    }
  });

  app.put("/edit-school", async (req, res) => {
    const {
      school_name,
      town,
      street,
      building_number,
      apartment_number,
      zip_code,
      school_id,
    } = req.body;

    try {
      const updateSchool =
        "UPDATE gradebook.schools SET school_name=$1, town=$2, street=$3, building_number=$4, apartment_number=$5, zip_code=$6 WHERE school_id=$7";
      await pool.query(updateSchool, [
        school_name,
        town,
        street,
        building_number,
        apartment_number,
        zip_code,
        school_id,
      ]);

      res.status(201).json({ message: "Szkoła zedytowana pomyślnie." });
    } catch (error) {
      console.error("Błąd edycji szkoły:", error);
      res.status(500).json({ error: "Błąd edycji szkoły" });
    }
  });

  app.delete("/schools/:school_id", async (req, res) => {
    const schoolId = req.params.school_id;

    try {
      const checkClassesQuery =
        "SELECT * FROM gradebook.classes WHERE school_id = $1";
      const classesResult = await pool.query(checkClassesQuery, [schoolId]);

      if (classesResult.rows.length > 0) {
        const deleteClassesQuery =
          "DELETE FROM gradebook.classes WHERE school_id = $1";
        await pool.query(deleteClassesQuery, [schoolId]);
      }

      const deleteSchoolQuery =
        "DELETE FROM gradebook.schools WHERE school_id = $1";
      await pool.query(deleteSchoolQuery, [schoolId]);

      res.status(204).end();
    } catch (error) {
      console.error("Błąd usuwania szkoły:", error);
      res.status(500).json({ error: "Błąd usuwania szkoły" });
    }
  });
};

export default schoolEndpoint;
