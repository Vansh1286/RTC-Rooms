// const express = require('express');
import express from 'express';
import "dotenv/config"
const app = express();
console.log(process.env.DB_URL);

app.listen(3000, () => console.log('Server running on port 3000'));
