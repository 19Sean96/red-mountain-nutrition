import Head from "next/head";
import Interface from "../../components/Interface";
import { useForm } from "react-hook-form";
import { connectToDatabase } from "../../util/mongodb";
import { useState } from 'react'
export default function Admin({ isConnected }) {
    const { register, handleSubmit } = useForm();
    const [loggedIn, logIn] = useState(false)
    const [activeLogInType, setActiveLogInType] = useState('logIn')
    const onSubmit = async data => {
        const uri = activeLogInType
        const body = {
            name: data.username,
            key: data.password
        }
        const res = await fetch(`/api/${uri}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        if (res.status === 200) {
            const userObj = await res.json();
            logIn(userObj)
        }
    }
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
				{isConnected ? (
					<h2 className="subtitle">You are connected to MongoDB</h2>
				) : (
					<h2 className="subtitle">
						You are NOT connected to MongoDB. Check the{" "}
						<code>README.md</code> for instructions.
					</h2>
				)}
                <h1 className="admin--title">{activeLogInType === "logIn" ? 'Log In With Your Credentials' : 'Sign Up To Receive Credentials'}</h1>
				<form
					className="admin--form"
					onSubmit={handleSubmit(onSubmit)}
				>
                    <div>
                        <input type="radio" name="authType" id="logIn" value="logIn" onChange={e => setActiveLogInType(e.target.id)} checked={activeLogInType === 'logIn'}/>
                        <label htmlFor="logIn">Log In</label>
                    </div>
                    <div>
                        <input type="radio" name="authType" id="signUp" value="signUp" onChange={e => setActiveLogInType(e.target.id)} checked={activeLogInType === 'signUp'}/>
                        <label htmlFor="signUp">Sign Up</label>
                    </div>
					<input
						type="text"
						name="username"
                        id="username"
                        ref={register}
						placeholder="Enter Name"
					/>
					<input
						type="password"
						name="password"
						id="password"
                        ref={register}
						placeholder="Enter Password"
					/>
					<input type="submit" />
				</form>
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
