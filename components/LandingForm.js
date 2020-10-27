import { useState, useRef } from "react";
import styled from 'styled-components';

const StyledBtn = styled.button`
    box-shadow: inset 0 -4px 12px rgba(black, .21);

`

const LandingForm = (props) => {
	const [activeCat, setActiveCat] = useState({
		nutrition: false,
		diabetes: false,
		weightLoss: true,
	});

	return (
		<section className="landing--form--wrapper">
			<h2 className="landing--form--title">
				speak with a registered dietitian
			</h2>
			<p>i'm looking for help with:</p>

			<div className="landing--form">
				<div className="landing--form--options">
					<button
						className={`option--nutrition ${activeCat.nutrition && "option__active"}`}
						onClick={(e) =>
							setActiveCat({
								nutrition: !activeCat.nutrition,
                                diabetes: activeCat.diabetes,
                                weightLoss:  activeCat.weightLoss
							})
                        }
					>
						nutrition
					</button>
					<button
						className={`option--diabetes ${activeCat.diabetes && "option__active"}`}
                        onClick={(e) =>
							setActiveCat({
								nutrition: activeCat.nutrition,
                                diabetes: !activeCat.diabetes,
                                weightLoss:  activeCat.weightLoss
							})
						}
					>
						diabetes
					</button>
					<button
						className={`option--weight-loss ${activeCat.weightLoss && "option__active"}`}
                        onClick={(e) =>
							setActiveCat({
								nutrition: activeCat.nutrition,
                                diabetes: activeCat.diabetes,
                                weightLoss: !activeCat.weightLoss
							})
						}
					>
						weight loss
					</button>
				</div>
				<div className="landing--form--submit">
					<button>schedule consultation</button>
				</div>
			</div>
		</section>
	);
};

export default LandingForm;
