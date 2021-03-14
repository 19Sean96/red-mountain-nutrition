const stripe = require('stripe')('pk_test_51IKuG4HwGqTa8uLog1SzYiCHhkA05il1o3v5QSvdxxVpxme2DEcVcGS101u0CIEnOV00nrVUE6nUKBTmzRR9ecSv00gfIbtezM');

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)


export default async (req, res) => {
    console.log(req.body);
    const { session_id } = req.body
    console.log("THIS IS THE SESSION ID", session_id);
    const session = await stripe.checkout.sessions.retrieve(session_id)

    res.statusCode = 200
    res.json(session)

}