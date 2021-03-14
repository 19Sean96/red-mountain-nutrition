// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('pk_test_51IKuG4HwGqTa8uLog1SzYiCHhkA05il1o3v5QSvdxxVpxme2DEcVcGS101u0CIEnOV00nrVUE6nUKBTmzRR9ecSv00gfIbtezM');

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
export default async (req,res) => {
    const { activePackage, activeFocus, customer, activeTime, URL} = req.body
    console.log("URL: ", URL);
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
        metadata: {
            date: activeTime.value
        },
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
        success_url: `${URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${URL}/cancel`
    });
    console.log(session);
    res.statusCode = 200;
    res.json({ id: session.id })
}