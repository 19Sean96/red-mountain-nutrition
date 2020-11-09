import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	console.log(req.body);

	bcrypt.hash(req.body.key, 12, (err, hash) => {

		db.collection("admin_auth").insert({
			name: req.body.name,
			key: hash,
			access: "full",
		});
	});

	const auth = await db.collection("admin_auth").find().toArray();

	res.statusCode = 200;
	res.json(auth);
};
