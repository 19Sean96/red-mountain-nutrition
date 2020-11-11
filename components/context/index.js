import { createContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'next/router'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	"pk_test_51Hm93zGsw55hWpg0wsLgzwO4aF5x1UIKe6rSySsbPUrNbHisDri9UgLY9plzLzyetx17u3BOMTIrDVMezWz5VkbT0002HrISlS"
);


export const CartContext = createContext(null);

export default ({ children }) => {
	const router = useRouter();

	const [activeFocus, setActiveFocus] = useState({
		nutrition: false,
		diabetes: false,
		weightLoss: true,
	});

	const [activeTime, setActiveTime] = useState()

	const [activePackage, setActivePackage] = useState({
		name: 'standard',
		price: 43900
	})

	const [ activeStep, setActiveStep ] = useState()

	useEffect(() => {
		console.log(router);

		if (router.pathname.includes('/schedule/')) {
			setActiveStep(router.pathname.replace('/schedule/', ''))
		}
	}, [router ])


    const handleCheckoutEnter = async (event) => {

        const body = {
            activeFocus,
            activePackage
        }
        console.log(event);
        const stripe = await stripePromise;
    
        const response = await fetch("/api/createCheckoutSession", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
    
        const session = await response.json();
    
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    
        if (result.error) {
            alert(result.error.message);
        }
    };
    
	return (
		<CartContext.Provider
			value={{
				activeFocus,
				setActiveFocus,
				activePackage,
				setActivePackage,
				activeStep,
				activeTime,
				setActiveTime,
                handleCheckoutEnter
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
