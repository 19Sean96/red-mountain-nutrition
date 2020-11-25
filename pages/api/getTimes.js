import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { isOpen } = req.body;
  const currentSchedule = await db
    .collection("schedule_open")
    .find()
    .sort({
      month: 1,
      date: 1,
      hour: 1,
      minute: 1,
    })
    .toArray();
  // console.log(currentSchedule);
  const filteredSchedule = currentSchedule.filter((time) =>
    isOpen ? !time.scheduled : time.scheduled
  );
  const orderedByYear = groupBy(filteredSchedule, 'year')


  for (const yearArr in orderedByYear) {
    orderedByYear[yearArr] = groupBy(orderedByYear[yearArr], "month")

    for (const monthArr in orderedByYear[yearArr]) {
      orderedByYear[yearArr][monthArr] = groupBy(orderedByYear[yearArr][monthArr], 'date')
    }

  }

  res.statusCode = 200;
  res.json(orderedByYear);
};

function groupBy(arr, prop) {
  return arr.reduce((memo, x) => {
    if (!memo[x[prop]]) {
      memo[x[prop]] = [];
    }
    memo[x[prop]].push(x);
    return memo;
  }, {});
}
