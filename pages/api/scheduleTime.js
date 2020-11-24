import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();
    console.log("REQ.BODY RIGHT HERE BOIIIII", req.body.date);
    let valid;
    const {	id, email, name, phone } = req.body
    const time = await db.collection('schedule_open').find({
        value: req.body.date
    }).toArray()
    time[0].scheduled = true
    time[0].customer = {
        id,
        email,
        name,
        phone
    }
    console.log("THIS IS THE TIME", time);
    // console.log("EXISTING TIMES", existingTimesForDay);
    const updated = await db.collection('schedule_open').update({
        value: req.body.date
    }, {...time[0]})
    console.log(updated.result.n);
    
    await db.collection('schedule_closed').insertOne(time[0])

    // valid = existingTimesForDay.every(time => Math.abs(time.time - req.body.time) >= 3600000)
    // console.log(valid ? "THE TIME IS VALID" : "THE TIME IS NOT VALID");
    // valid && db.collection('schedule_open').insertOne(req.body)

    res.statusCode = 200
    res.json({ done: true})

}