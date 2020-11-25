import Head from "next/head";
import { useRouter } from "next/router";
import Interface from "../../../components/Interface";
import { connectToDatabase } from "../../../util/mongodb";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../components/context";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { Scrollbars } from "react-custom-scrollbars";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const getTimeSuffix = (time) => {
	if (!time.suffix) {
		if (time.hour >= 12) {
			time.suffix = "PM";
			if (time.hour !== 12) {
				time.hour -= 12;
			}
		} else {
			time.suffix = "AM";
			if (time.hour === 0) {
				time.hour = 12;
			}
		}
	}
	return time;
};

export default function Admin({ isConnected }) {
	const router = useRouter();
	const { user } = useContext(CartContext);
	const [value, onChange] = useState(new Date());
	const [activeLogInType, setActiveLogInType] = useState("logIn");
	const [schedule, setSchedule] = useState();
	const [openTimes, setOpenTimes] = useState();
	const [history, addHistory] = useState();
	const [activeScheduleView, setActiveScheduleView] = useState({
		scheduled: true,
		open: false,
	});
	console.log(router);

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(value.getMonth());
		const body = {
			value: value,
			month: value.getMonth(),
			year: value.getFullYear(),
			day: value.getDay(),
			date: value.getDate(),
			time: value.getTime(),
			hour: value.getHours(),
			minute: value.getMinutes(),
		};

		const res = await fetch("/api/addTime", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const response = await res.json();
		console.log(response);
	};

	const getSchedule = async (isOpen) => {
		const body = { isOpen: isOpen };
		const res = await fetch("/api/getTimes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const response = await res.json();
		console.log(response);
		return response;
	};

	useEffect(async () => {
		!user &&
			router.push(
				{
					pathname: "/admin",
				},
				"/admin"
			);

		const scheduledTimes = await getSchedule(false);
		const openTimes = await getSchedule(true);

		setSchedule(scheduledTimes);
		setOpenTimes(openTimes);
	}, []);
	return (
		<>
			<Head>
				<title>Red Mountain Nutrition</title>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/vyg3jkt.css"
				/>
				<link rel="icon" href="/logo.ico" />
			</Head>

			<Interface>
				{user && (
					<>
						<h1 className="admin--title">Welcome back, {user}.</h1>
						<section className="admin--body">
							<div className="admin--schedule">
								<h2>
									{activeScheduleView.scheduled
										? "Active Schedule"
										: "Available Times"}
								</h2>
								{(schedule || openTimes) && (
									<div className="admin--schedule--list">
										<div className="admin--schedule--toggle__wrapper">
											<button
												className={`admin--schedule--toggle ${
													activeScheduleView.scheduled
														? "active"
														: ""
												}`}
												onClick={(e) =>
													setActiveScheduleView({
														scheduled: true,
														open: false,
													})
												}
											>
												Scheduled Appointments
											</button>
											<button
												className={`admin--schedule--toggle ${
													activeScheduleView.open
														? "active"
														: ""
												}`}
												onClick={(e) =>
													setActiveScheduleView({
														scheduled: false,
														open: true,
													})
												}
											>
												Open Appointments
											</button>
										</div>
										<ul className="list">
											<Scrollbars
												universal
												style={{ height: "50vh" }}
											>
												{Object.keys(
													activeScheduleView.scheduled
														? schedule
														: openTimes
												).map((month) => (
													<MonthCard
														schedule={
															activeScheduleView.scheduled
																? schedule
																: openTimes
														}
														month={month}
														type={
															activeScheduleView.scheduled
																? "scheduled"
																: "open"
														}
													/>
												))}
											</Scrollbars>
										</ul>
									</div>
								)}
							</div>
							<div className="admin--add-time">
								<h2>Add A New Time</h2>
								<div className="admin--add-time__input">
									<DateTimePicker
										value={value}
										onChange={onChange}
									/>
									<button
										type="submit"
										onSubmit={handleSubmit}
										onClick={handleSubmit}
									>
										Enter Timeslot
									</button>
								</div>
								<div className="admin--add-time__recent">
									{history && <></>}
								</div>
							</div>
						</section>
					</>
				)}
			</Interface>
		</>
	);
}

function MonthCard({ month, schedule, type }) {
	return (
		<li className="list--month">
			<h4 className="list--month__name">{months[month]}</h4>
			<div className="list--month__days">
				{Object.keys(schedule[month]).map((day) => (
					<DateCard
						months={months}
						month={month}
						day={day}
						schedule={schedule}
						type={type}
					/>
				))}
			</div>
		</li>
	);
}
function DateCard({ months, month, day, schedule, type }) {
	return (
		<div className="list--day">
			<h5 className="list--day__name">
				{months[month]}, {day}
			</h5>
			<div className="list--day__times">
				{schedule[month][day].map((time) => {
					time = getTimeSuffix(time);
					console.log(time);
					return <TimeCard time={time} type={type} />;
				})}
			</div>
		</div>
	);
}
function TimeCard({ time, type }) {
	return (
		<button className="list--time">
			<div className="list--time--data">
				<p>
					<span className="hour">{time.hour}</span>:
					<span className="minute">
						{time.minute >= 0 &&
						time.minute <= 9 &&
						time.minute !== "00"
							? "0" + time.minute
							: time.minute}
					</span>{" "}
					<span className="suffix">{time.suffix}</span>
				</p>
			</div>
			{type === "scheduled" && (
				<>
					<hr />
					<div className="list--time--customer invisible">
						<p>{time.customer.name}</p>
						<p>{time.customer.email}</p>
						<p>{time.customer.phone}</p>
					</div>
				</>
			)}
		</button>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();
	console.log(process.env);

	const isConnected = await client.isConnected(); // Returns true or false

	return {
		props: { isConnected },
	};
}
