import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, no need to check