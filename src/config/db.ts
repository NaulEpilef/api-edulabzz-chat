import mongoose from "mongoose";

// console.log(process.env.DATABASE_URL);

// const dbUrl = process.env.DATABASE_URL as string;

const dbConnection = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to the database');

  } catch (err) {
    console.error('Something went wrong when trying to connect to db :', err);
  }
}

export default dbConnection;