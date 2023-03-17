import mongoose from "mongoose";

mongoose.connect("mongodb+srv://teste:123@leandro.dyiqbxv.mongodb.net/node-express");

let db = mongoose.connection;

export default db;