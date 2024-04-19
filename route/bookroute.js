import express from "express";
import { getbook } from "../contoller/bookcontoller.js";


const router = express.Router();


// middleware



router.get('/' , getbook);


export default router;