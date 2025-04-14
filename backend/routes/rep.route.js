import express from 'express'
import { repDelete, repGet, repPost, repPut } from "../controller/rep.controller.js";

const router = express.Router()

router.get("/", repGet)

router.post("/", repPost)

router.put("/:id", repPut)

router.delete("/:id", repDelete)


export default router;