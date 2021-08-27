import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";
console.log(uri);

export default async function connectToDatabase() {
  const client = await mongoose.connect(uri, {
    useFindAndModify: false,
  });
  return client;
}
