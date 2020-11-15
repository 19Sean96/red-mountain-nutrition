import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    let isMatch, data;
    console.log("REQUEST BODY", req.body);
    
    const user = await db.collection('admin_auth').find({name: req.body.name}).toArray()
    console.log(user);
    await bcrypt.compare(req.body.key, user[0].key, (err, result) => {
		console.log("IS IT A MATCH?", result);

		if (result) {
			data = {
				name: user[0].name,
				loggedIn: true
			}
			res.statusCode = 200;
		} else {
			data = {
				loggedIn: false
			}
			res.statusCode = 207;
		}

		res.json(data);

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


};
