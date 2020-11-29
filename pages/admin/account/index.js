import Head from "next/head";
import { useRouter } from "next/router";
import Interface from "../../../components/Interface";
import { connectToDatabase } from "../../../util/mongodb";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../components/context";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	const [recentlyAdded, updateRecentlyAdded] = useState([]);
	const [activeScheduleView, setActiveScheduleView] = useState({
		scheduled: true,
		open: false,
	});
	const [activeMobileAdminView, setActiveMobileAdminView] = useState({
		schedule: false,
		addTime: true,
	});
	const [isMobile, setIsMobile] = useState();
	const handleSubmit = async (event) => {
		event.preventDefault();
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
		let response = await res.json();
		response.code = res.status;
		updateRecentlyAdded([response, ...recentlyAdded]);

		console.log(response);
	};

	const handleRemoveTime = async (event, time, type, index) => {
		event.preventDefault();
		console.log(time);

		if (type === "open") {
			const body = time;

			const res = await fetch("/api/removeTime", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const response = await res.json();

			const openTimes = await getSchedule(true);
			setOpenTimes(openTimes);
		} else if (type === "recentlyAdded") {
			let arr = [...recentlyAdded];
			arr.splice(index, 1);
			console.log(arr);
			updateRecentlyAdded(arr);
		}
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
		return response;
	};

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth < 1000) {
				console.log(window.innerWidth);

				!isMobile && setIsMobile(true);
			} else {
				isMobile && setIsMobile(false);
			}
		}

		window.addEventListener("resize", handleResize);

		return (_) => window.removeEventListener("resize", handleResize);
	});

	useEffect(async () => {
		!user &&
			router.push(
				{
					pathname: "/admin",
				},
				"/admin"
			);

		setIsMobile(window.innerWidth < 1000);

		const scheduledTimes = await getSchedule(false);
		const openTimes = await getSchedule(true);
		setSchedule(scheduledTimes);
		setOpenTimes(openTimes);
	}, []);
	useEffect(async () => {
		const openTimes = await getSchedule(true);

		setOpenTimes(openTimes);
	}, [recentlyAdded]);
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

			{user && (
				<>
					<h1 className="admin--title">Welcome back, {user}.</h1>
					{isMobile && (
						<aside className="admin--switch">
							<button className={`admin--switch__schedule ${activeMobileAdminView.schedule ? 'active' : 'inactive'}`} onClick={e => setActiveMobileAdminView({
								schedule: true,
								addTime: false
							})}>
								Schedule
							</button>
							<button className={`admin--switch__add-time ${activeMobileAdminView.addTime ? 'active' : 'inactive'}`} onClick={e => setActiveMobileAdminView({
								schedule: false,
								addTime: true
							})}>
								Add Time
							</button>
						</aside>
					)}
					<section className="admin--body">
						{((isMobile && activeMobileAdminView.schedule) ||
							!isMobile) && (
							<div className="admin--schedule">
								<h2>
									{activeScheduleView.scheduled
										? "Active Schedule"
										: "Available Times"}
								</h2>
								{schedule && openTimes && (
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
												).map((year) => {
													console.log(year);
													console.log(
														activeScheduleView.scheduled
															? schedule
															: openTimes
													);
													return (
														<YearCard
															schedule={
																activeScheduleView.scheduled
																	? schedule
																	: openTimes
															}
															year={year}
															type={
																activeScheduleView.scheduled
																	? "scheduled"
																	: "open"
															}
															handleRemoveTime={
																handleRemoveTime
															}
														/>
													);
												})}
											</Scrollbars>
										</ul>
									</div>
								)}
							</div>
						)}

						{((isMobile && activeMobileAdminView.addTime) ||
							!isMobile) && (
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
									{recentlyAdded.length ? (
										<div className="recent">
											<Scrollbars
												universal
												style={{ height: "45vh" }}
											>
												{recentlyAdded.map(
													({ time, code }, index) => {
														const valid =
															code === 200;
														time = getTimeSuffix(
															time
														);

														console.log(
															"WE ARE ADDING A NEW TIME"
														);
														return (
															<div
																className={`recent--card recent--card__${
																	valid
																		? "valid"
																		: "invalid "
																}`}
																key={index}
															>
																<p className="recent--card--description">
																	<span>
																		Time for{" "}
																	</span>{" "}
																	<TimeCard
																		time={
																			time
																		}
																		type="recentlyAdded"
																		handleRemoveTime={
																			handleRemoveTime
																		}
																		index={
																			index
																		}
																	/>
																	<span>
																		{" "}
																		on{" "}
																		{time.month +
																			1}
																		/
																		{
																			time.date
																		}
																		/
																		{
																			time.year
																		}{" "}
																	</span>
																	{valid ? (
																		<span>
																			{" "}
																			has
																			been
																			submitted.
																		</span>
																	) : (
																		<span>
																			{" "}
																			cannot
																			be
																			added
																			as
																			it
																			is
																			invalid.
																		</span>
																	)}
																</p>
															</div>
														);
													}
												)}
											</Scrollbars>
										</div>
									) : (
										<p className="admin--add-time__recent__empty">
											Enter a Time Above
										</p>
									)}
								</div>
							</div>
						)}
					</section>
				</>
			)}
		</>
	);
}
function YearCard({ schedule, year, type, handleRemoveTime }) {
	return (
		<li className="list--year">
			<h3 className="list--year__name">{year}</h3>
			<div className="list--year__months">
				{Object.keys(schedule[year]).map((month) => (
					<MonthCard
						schedule={schedule[year]}
						month={month}
						type={type}
						handleRemoveTime={handleRemoveTime}
					/>
				))}
			</div>
		</li>
	);
}

function MonthCard({ month, schedule, type, handleRemoveTime }) {
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
						handleRemoveTime={handleRemoveTime}
						type={type}
					/>
				))}
			</div>
		</li>
	);
}
function DateCard({ months, month, day, schedule, type, handleRemoveTime }) {
	return (
		<div className="list--day">
			<h5 className="list--day__name">
				{months[month]}, {day}
			</h5>
			<div className="list--day__times">
				{schedule[month][day].map((time) => {
					time = getTimeSuffix(time);
					return (
						<TimeCard
							time={time}
							type={type}
							handleRemoveTime={handleRemoveTime}
						/>
					);
				})}
			</div>
		</div>
	);
}
function TimeCard({ time, type, handleRemoveTime, index = null }) {
	console.log(time);
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
				{(type === "open" || type === "recentlyAdded") && (
					<button
						className="close-card"
						onClick={(e) => handleRemoveTime(e, time, type, index)}
					>
						<FontAwesomeIcon icon="times" />
					</button>
				)}
			</div>
			{type === "scheduled" && time.customer && (
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
