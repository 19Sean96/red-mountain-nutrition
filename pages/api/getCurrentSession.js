const stripe = require('stripe')('sk_test_51Hm93zGsw55hWpg0gKzN0LcpuZPovCBS0sq4aqwlQSSWjix7afsovWL1sV2vBZX9ex9SnM5NzlrLweCzupMasjlL00uruSbddI');

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)


export default async (req, res) => {
    console.log(req.body);
    const { session_id } = req.body
    console.log("THIS IS THE SESSION ID", session_id);
    const session = await stripe.checkout.sessions.retrieve(session_id)

    res.statusCode = 200
    res.json(session)

}