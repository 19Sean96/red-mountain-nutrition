import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const currentSchedule = await db.collection('schedule_open').find().sort({
        month: 1,
        // day: 1
    }).toArray();
    console.log(currentSchedule);

    res.statusCode = 200
    res.json({ done: true})

}