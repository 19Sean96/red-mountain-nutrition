import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
	const { db } = await connectToDatabase();
	console.log(req.body);
	const result = await db
		.collection("schedule_open")
		.remove({
			year: req.body.year,
			month: req.body.month,
            date: req.body.date,
            time: req.body.time
		}, true)
    
    console.log(result);
    
    res.statusCode = 200;

	res.json({ result: result });
};
