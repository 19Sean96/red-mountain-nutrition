import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    
    console.log("REQUEST BODY", req.body);
    
    const user = await db.collection('admin_auth').find({name: req.body.name}).toArray()
    console.log(user);
    bcrypt.compare(req.body.key, user[0].key, (err, result) => {
        console.log("IS IT A MATCH?", result);
    })
	// bcrypt.hash(req.body.key, 12, (err, hash) => {
	// 	console.log(hash);
	// 	bcrypt.compare(req.body.key, hash, (err, result) => {
	// 		console.log("IS IT A MATCH?", result);
	// 	});

	// 	db.collection("admin_auth").insert({
	// 		name: req.body.name,
	// 		key: hash,
	// 		access: "full",
	// 	});
	// });

	const auth = await db.collection("admin_auth").find().toArray();

	res.statusCode = 200;
	res.json(auth);
};
