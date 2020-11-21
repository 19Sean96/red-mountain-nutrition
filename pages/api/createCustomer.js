const stripe = require('stripe')('sk_test_51Hm93zGsw55hWpg0gKzN0LcpuZPovCBS0sq4aqwlQSSWjix7afsovWL1sV2vBZX9ex9SnM5NzlrLweCzupMasjlL00uruSbddI');

export default async (req,res) => {
    const { custName, custEmail, custPhone } = req.body
    console.log("CUST NAME ", custName);
    console.log("CUST Email ", custEmail);
    console.log("CUST Phone ", custPhone);
    const customer = await stripe.customers.create({
        name: custName, email: custEmail, phone: custPhone
    })

    res.statusCode = 200;
    res.json({ id: customer.id})
}