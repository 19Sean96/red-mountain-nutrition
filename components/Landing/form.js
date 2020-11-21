import { useState, useRef, useEffect, useContext } from "react";
import Link from 'next/link'
import { CartContext } from "../context";

const LandingForm = (props) => {
    const { activeFocus, setActiveFocus } = useContext(CartContext);
    
    const [catArr, setCatArr] = useState([

    ])

    useEffect(() => {
        const { nutrition, diabetes, weightLoss } = activeFocus
        setCatArr(() => {
            let arr = []
            nutrition && arr.push('nutrition')
            diabetes && arr.push('diabetes')
            weightLoss && arr.push('weightLoss')

            return arr
        })
    }, [activeFocus])

	return (
		<section className="landing--form--wrapper">
			<h2 className="landing--form--title">
				speak with a registered dietitian
			</h2>
			<p>i'm looking for help with:</p>

			<div className="landing--form">
				<div className="landing--form--options">
					<button
						className={`option--nutrition ${activeFocus.nutrition && "option__active"}`}
						onClick={(e) =>
							setActiveFocus({
								nutrition: !activeFocus.nutrition,
                                diabetes: activeFocus.diabetes,
                                weightLoss:  activeFocus.weightLoss
							})
                        }
					>
						nutrition
					</button>
					<button
						className={`option--diabetes ${activeFocus.diabetes && "option__active"}`}
                        onClick={(e) =>
							setActiveFocus({
								nutrition: activeFocus.nutrition,
                                diabetes: !activeFocus.diabetes,
                                weightLoss:  activeFocus.weightLoss
							})
						}
					>
						diabetes
					</button>
					<button
						className={`option--weight-loss ${activeFocus.weightLoss && "option__active"}`}
                        onClick={(e) =>
							setActiveFocus({
								nutrition: activeFocus.nutrition,
                                diabetes: activeFocus.diabetes,
                                weightLoss: !activeFocus.weightLoss
							})
						}
					>
						weight loss
					</button>
				</div>
				<div className="landing--form--submit">
                    <Link 
                        href={{
                            pathname: "/schedule/1",
                            query: {
                                type: null,
                                focus: catArr
                            }
                        }}
                        as="/schedule/1"
                    ><a>schedule consultation</a></Link>
				</div>
			</div>
		</section>
	);
};

export default LandingForm;
