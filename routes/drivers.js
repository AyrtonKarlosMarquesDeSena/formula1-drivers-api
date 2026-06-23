import express from "express";
import { drivers } from "../data.js";
import { randomUUID } from "node:crypto";
import {
  validatePosition,
  validateUpdateDriverInfo,
  validateDriverInfo,
} from "../inputValidation.js";
import Joi from "joi";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(drivers);
});

router.get("/standings/:position", (req, res, next) => {
  const { position } = req.params;
  const positionNumber = parseInt(position);
  if (isNaN(positionNumber)) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }

  const { error } = validatePosition(position, drivers.length);
  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }
  res.status(200).send(drivers[position - 1]);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  if (!selectedDriver) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }
  res.status(200).send(selectedDriver);
});

router.post("/", (req, res, next) => {
  const { error } = validateDriverInfo(req.body);
  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }
  const newDriver = { ...req.body, id: randomUUID() };
  drivers.push(newDriver);
  drivers.sort((a, b) => b.points - a.points);
  res.status(200).send(newDriver);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  if (!selectedDriver) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }

  const { error } = validateUpdateDriverInfo(req.body);

  if (error) {
    const err = new Error();
    err.statusCode = 400;
    err.description = error.details;
    return next(err);
  }

  if (selectedDriver) {
    selectedDriver.name = req.body.name || selectedDriver.name;
    selectedDriver.team = req.body.team || selectedDriver.team;
    selectedDriver.points = req.body.points || selectedDriver.points;

    drivers.sort((a, b) => b.points - a.points);
    res.status(200).send(drivers);
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  if (!selectedDriver) {
    const err = new Error();
    err.statusCode = 404;
    err.description = "Driver not found";
    return next(err);
  }

  const driverIndex = drivers.indexOf(selectedDriver);

  drivers.splice(driverIndex, 1);
  res.status(200).send(selectedDriver);
});

export default router;
