const stripe = require('stripe')('pk_test_51IKuG4HwGqTa8uLog1SzYiCHhkA05il1o3v5QSvdxxVpxme2DEcVcGS101u0CIEnOV00nrVUE6nUKBTmzRR9ecSv00gfIbtezM');

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