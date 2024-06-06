import { ErrorRequestHandler } from "express";
import {ERRORS} from "../../shared"

export const errorHandler: ErrorRequestHandler = (err, _req, res) => {
    console.error(ERRORS.UNCAUGHT_ERROR, err);
    return res.status(500)
              .send({error: ERRORS.UNEXPECTED_ERROR});
}
