import express from 'express'
import { generateTeamsArray as teams } from "../data.js";
import {
  validatePosition,
  validateUpdateDriverInfo,
  validateDriverInfo,
} from "../inputValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(teams());
});

router.get("/standings/:position", (req, res, next) => {
  const team = teams();
  const { position } = req.params;
  const positionNumber = parseInt(position);
  if (isNaN(positionNumber)) {
   const err = new Error()
    err.statusCode = 404
    err.description = "Teams not found"
    return next(err);
  }

  const { error } = validatePosition(position, team.length);
  if (error) {
    const err = new Error()
    err.statusCode = 400
    err.description = error.details
    return next(err);
  }
  res.status(200).send(team[position - 1]);
});

export default router