import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	console.log("REQ.BODY RIGHT HERE BOIIIII", req.body.date);
	let updated = {},
		alreadyExisted = false;
	const { id, email, name, phone } = req.body;
	const time = await db
		.collection("schedule_open")
		.find({
			value: req.body.date,
		})
		.toArray();

	if (time[0].scheduled) alreadyExisted = true;
	else time[0].scheduled = true;

	if (!alreadyExisted) {
		time[0].customer = {
			id,
			email,
			name,
			phone,
		};
		updated = await db.collection("schedule_open").update(
			{
				value: req.body.date,
			},
			{ ...time[0] }
		);

        await db.collection("schedule_closed").insertOne(time[0]);
        
    }

    res.statusCode = 201;
    res.json({done: true, time})
};
