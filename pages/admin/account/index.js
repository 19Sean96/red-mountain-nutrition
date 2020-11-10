import Head from "next/head";
import { useRouter } from "next/router";
import Interface from "../../../components/Interface";
import { connectToDatabase } from "../../../util/mongodb";
import { useState, useEffect } from 'react'
export default function Admin({ isConnected }) {
	const router = useRouter()
    const [activeLogInType, setActiveLogInType] = useState('logIn')
    console.log(router);
	return (
		<>
			<Head>
				<title>Red Mountain Nutrition</title>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/vyg3jkt.css"
				/>
				<link rel="icon" href="/logo.ico" />
			</Head>

			<Interface>

                <h1 className="admin--title">Welcome to your account!</h1>

			</Interface>
		</>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();
	console.log(process.env);

	const isConnected = await client.isConnected(); // Returns true or false

	return {
		props: { isConnected },
	};
}
