import { CartContext } from "../context";
import { useContext, useEffect, useState, useRef, createRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ScheduleModal(props) {
	const [buttonRefs, setButtonRefs] = useState([]);
	const {
		date,
		times,
		activeTime,
		setActiveTime,
		type,
		setMobileModelOpen,
	} = props;
	const [isMobile, setIsMobile] = useState();

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
		function handleResize() {
			if (window.innerWidth < 950) {
				console.log(window.innerWidth);

				!isMobile && setIsMobile(true);
			} else {
				isMobile && setIsMobile(false);
			}
		}
		handleResize();

		window.addEventListener("resize", handleResize);

		return (_) => window.removeEventListener("resize", handleResize);
	});

	return (
		<section className="schedule--modal">
			<h3 className="schedule--modal--title">
				<span>
					Available times on {!isMobile && <br></br>}{" "}
					{date.value.toDateString()}
				</span>
				{isMobile && (
					<button
						className="schedule--modal__back-btn"
						onClick={(e) => setMobileModelOpen(false)}
					>
						<span>
							calendar <FontAwesomeIcon icon="calendar-alt" />
						</span>
					</button>
				)}
			</h3>
			<ul className="schedule--modal--list">
				<Scrollbars
					universal
					style={{ height: 300 }}
					// autoHeight
					// autoHeightMin={100}
					// autoHeightMax={200}
				>
					{times.length > 0 ? (
						times.map((time, i) => {
							console.log(times);
							if (time.minute === 0) {
								time.minute = "00";
							}

							if (time.hour === 0 && time.suffix === "AM") {
								time.hour = 12;
							}
							return (
								<li>
									<button
										key={i}
										className={`time__button ${
											activeTime?.time === time.time &&
											activeTime?.suffix === time.suffix
												? "active"
												: ""
										}`}
										ref={buttonRefs[i]}
										onClick={(e) => {
											console.log(
												buttonRefs[i].current.active
											);
											setActiveTime(time);
										}}
									>
										{time.hour}:
										{time.minute >= 0 &&
										time.minute <= 9 &&
										time.minute !== "00"
											? "0" + time.minute
											: time.minute}{" "}
										{time.suffix}
									</button>
								</li>
							);
						})
					) : (
						<p>There are no available appointments on this day.</p>
					)}
				</Scrollbars>
			</ul>
		</section>
	);
}
