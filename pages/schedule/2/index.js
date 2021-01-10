import { useRouter } from "next/router";
import { useContext, useEffect, useState, useRef, createRef } from "react";
import Head from "next/head";
import { CartContext } from "../../../components/context";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Interface from "../../../components/Interface";
import ScheduleModal from "../../../components/Schedule/Modal";
import ScheduleInterface from "../../../components/Schedule/Interface";

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

export default function Schedule() {
	const router = useRouter();
	const [buttonRefs, setButtonRefs] = useState([]);
	const { handleCheckoutEnter, activeTime, setActiveTime } = useContext(
		CartContext
	);
	const [date, setDate] = useState({
		value: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
		actual: new Date().getDate(),
	});
	const [times, setTimes] = useState([]);
	const onChange = (date) => {
		console.log(date);
		setDate({
			value: date,
			month: date.getMonth(),
			year: date.getFullYear(),
			actual: date.getDate(),
		});
	};

	const [schedule, setSchedule] = useState();

	useEffect(async () => {
		const body = {
			isOpen: true,
		};
		const res = await fetch("/api/getTimes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const response = await res.json();
		console.log("RESPONSE FROM DB", response);
		setSchedule(response);
	}, []);

	useEffect(() => {
		console.log(
			"the date has been changed or the calendar has been manipulated"
		);
		if (date && schedule) {
			console.log(date);
			const { year, month, actual } = date;
			const availableTimes = schedule?.[year]?.[month]?.[actual];
			console.log(availableTimes);

			setTimes(() => {
				let arr = [];
				availableTimes &&
					availableTimes.map((time) => {
						time.active = false;

						time = getTimeSuffix(time);

						arr.push(time);
					});
				console.log("EDITED SCHEDULE FOR THE DAY: ", arr);
				return arr;
			});
		}
	}, [date, schedule]);

	useEffect(() => {
		const timesLength = times && times.length;
		console.log(timesLength);

		if (timesLength) {
			setButtonRefs((buttonRefs) =>
				Array(timesLength)
					.fill()
					.map((_, i) => buttonRefs[i] || createRef())
			);
		}
	}, [times]);

	useEffect(() => {
		if (activeTime) {
			activeTime.active = true;
		}
	}, [activeTime]);

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
				<section className="schedule">
					<h1 className="schedule--title">
						let's get you scheduled.
					</h1>
					<ScheduleInterface>
						<div className="schedule--calendar">
							<h2 className="schedule--calendar--title">
								Pick a date/time for your initial appointment:
							</h2>
						</div>
						<div className="schedule--calendar--content">
							<div className="calendar--dates">
								<Calendar
									onChange={onChange}
									value={date.value}
								/>
							</div>
							<ScheduleModal
								date={date}
								times={times}
								activeTime={activeTime}
								setActiveTime={setActiveTime}
								type="open"
							/>
						</div>
					</ScheduleInterface>
				</section>
			</Interface>
		</>
	);
}
