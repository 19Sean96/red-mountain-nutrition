import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	console.log(req.body);
	const dup = await db.collection('admin_auth').find({name: req.body.name}).toArray()
	console.log(dup.length);

	if (dup.length == 0) {
		bcrypt.hash(req.body.key, 12, (err, hash) => {

			db.collection("admin_auth").insert({
				name: req.body.name,
				key: hash,
				access: "full",
			});
		});

		res.statusCode = 200;
		res.json({
			name: req.body.name,
			created: true,
			loggedIn: true,
			alreadyExists: false,
			message: `${req.body.name}'s account has been created & is now logged in`
		});
	} else if (dup.length > 0) {
		res.statusCode = 201
		res.json({
			created: false,
			loggedIn: false,
			alreadyExists: true,
			message: `That name already exists!`
		})
	}

};
