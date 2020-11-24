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
  console.log(filteredSchedule);
  const orderedByMonth = groupBy(filteredSchedule, "month");

  let i = 0;

  for (const monthArr in orderedByMonth) {
    orderedByMonth[monthArr] = groupBy(orderedByMonth[monthArr], "date");

    i++;
  }

  console.log(i);

  res.statusCode = 200;
  res.json(orderedByMonth);
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
