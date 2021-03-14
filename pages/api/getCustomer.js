const stripe = require('stripe')('pk_test_51IKuG4HwGqTa8uLog1SzYiCHhkA05il1o3v5QSvdxxVpxme2DEcVcGS101u0CIEnOV00nrVUE6nUKBTmzRR9ecSv00gfIbtezM');


export default async (req, res) => {
    console.log(req.body);
    const { customer_id } = req.body
    console.log("THIS IS THE CUSTOMER ID", customer_id);
    const customer = await stripe.customers.retrieve(customer_id)
    console.log(customer);
    res.statusCode = 200
    res.json(customer)

}