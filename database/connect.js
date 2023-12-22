const { Client } = require('pg');
require('dotenv').config();

const connectDB=async () => {
    const client = new Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
    });
  
    try {
      await client.connect();
      console.log("connected to db successfully ")
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error.message);
    } finally {
      await client.end();
    }
  };
  connectDB();
  module.exports=connectDB