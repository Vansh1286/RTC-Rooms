// const express = require('express');
import express from 'express';
import "dotenv/config";
import fs from 'fs';
import path from'path';

import {clerkMiddleware} from "@clerk/express";

import cors from "cors";
import User from "./src/models/user.model.js"

import {connectDB} from "./src/lib/db.js"

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), 'public');

app.use(express.json());
app.use(cors({origin: FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true});
});

//if the public directory exists, serve the static files from it
//this is where the frontend will be built and served from
//this is only for production, in development the frontend will be served from the Vite dev server
if(fs.existsSync(publicDir)){
  app.use(express.static(publicDir));

  app.get('/{*any}', (req, res, next) => {
    res.sendFile(path.join(publicDir, 'index.html'), (err) => next(err));
  });
}

 


app.listen(PORT, () => {
  connectDB();
  console.log("Server is up and running on PORT:", PORT);

});
 