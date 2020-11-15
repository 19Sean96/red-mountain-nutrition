import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();
    console.log(req.body);
    let valid;
    const existingTimesForDay = await db.collection('schedule_open').find({
        year: req.body.year,
        month: req.body.month,
        date: req.body.date
    }).toArray();

    console.log("EXISTING TIMES", existingTimesForDay);



    valid = existingTimesForDay.every(time => Math.abs(time.time - req.body.time) >= 7200000)
    console.log(valid ? "THE TIME IS VALID" : "THE TIME IS NOT VALID");
    valid && db.collection('schedule_open').insertOne(req.body)

    res.statusCode = 200
    res.json({ done: true})

}