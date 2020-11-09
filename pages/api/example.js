// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectToDatabase } from '../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase();
  
  const sales = await db
    .collection("sales")
    .find({storeLocation: "Denver"})
    .sort({"customer.age": -1})
    .limit(20)
    .toArray()

  res.statusCode = 200
  res.json(sales)
}
