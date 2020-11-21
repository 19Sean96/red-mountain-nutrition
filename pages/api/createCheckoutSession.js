// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_51Hm93zGsw55hWpg0gKzN0LcpuZPovCBS0sq4aqwlQSSWjix7afsovWL1sV2vBZX9ex9SnM5NzlrLweCzupMasjlL00uruSbddI');

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
export default async (req,res) => {
    const { activePackage, activeFocus, customer} = req.body
    console.log("CREATE CHECKOUT SESSION: ", customer);
    let desc = ''

    for (const focus in activeFocus) {
        console.log("OBJECT LOOP", focus);
        if (activeFocus[focus]) {
            desc += `${capitalize(focus)} `
        }
    }

    desc = desc.substring(0, desc.length - 1).replace(/ /g, ', ');
    console.log(desc);

    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${activePackage.name} ` || 'T-Shirt',
                        description: `Focusing on: ${desc}` || 'This is the description'
                    },
                    unit_amount: activePackage.price || 1999
                },
                quantity: 1
            },
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Tax',
                    },
                    unit_amount: Math.ceil(1999 * .056)
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel'
    });
    res.statusCode = 200;
    res.json({ id: session.id })
}