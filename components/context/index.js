import { createContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'next/router'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	"pk_test_51Hm93zGsw55hWpg0wsLgzwO4aF5x1UIKe6rSySsbPUrNbHisDri9UgLY9plzLzyetx17u3BOMTIrDVMezWz5VkbT0002HrISlS"
);


export const CartContext = createContext(null);

export default function Provider ({ children }) {
	const router = useRouter();

	const [activeFocus, setActiveFocus] = useState({
		nutrition: false,
		diabetes: false,
		weightLoss: true,
	});

	const [activeTime, setActiveTime] = useState()
	const [checkoutSessionID, setCheckoutSessionId] = useState()
	const [activePackage, setActivePackage] = useState({
		name: 'standard',
		price: 43900
	})

	const [ activeStep, setActiveStep ] = useState()

	const [ user, setUser] = useState()

	const [ URL, setURL ] = useState()

	useEffect(() => {

		if (router.pathname.includes('/schedule/')) {
			setActiveStep(router.pathname.replace('/schedule/', ''))
		}
		setURL(window.location.origin)
	}, [router ])

	const getCustomerID = async data => {
		const response = await fetch('/api/createCustomer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		})
		const customer = await response.json()
		return customer
	}

	const createCheckoutSession = async (customer) => {
		const body = {
            activeFocus,
			activePackage,
			customer,
			activeTime,
			URL
        }
        const response = await fetch("/api/createCheckoutSession", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
    
        const session = await response.json();
		return session
	}

    const handleCheckoutEnter = async (event, customer, time) => {
        const stripe = await stripePromise;
	
		const customerID = await getCustomerID(customer)
		const session = await createCheckoutSession(customerID, time)

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

		setCheckoutSessionId(result)
    
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
				handleCheckoutEnter,
				user,
				setUser,
				checkoutSessionID,
				URL
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
