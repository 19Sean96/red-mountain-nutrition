const stripe = require('stripe')('sk_test_51Hm93zGsw55hWpg0gKzN0LcpuZPovCBS0sq4aqwlQSSWjix7afsovWL1sV2vBZX9ex9SnM5NzlrLweCzupMasjlL00uruSbddI');


export default async (req, res) => {
    console.log(req.body);
    const { customer_id } = req.body
    console.log("THIS IS THE CUSTOMER ID", customer_id);
    const customer = await stripe.customers.retrieve(customer_id)
    console.log(customer);
    res.statusCode = 200
    res.json(customer)

}