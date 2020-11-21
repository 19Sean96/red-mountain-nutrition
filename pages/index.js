import Head from 'next/head'
import Interface from '../components/Interface'
import Landing from '../components/Landing/index'
import LifestylePackages from '../components/LifestylePackages' 

import { connectToDatabase } from '../util/mongodb'

export default function Home({ isConnected }) {
  return (
    <>
      <Head>
        <title>Red Mountain Nutrition</title>
        <link rel="stylesheet" href="https://use.typekit.net/vyg3jkt.css" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <Interface>
        <Landing />
        <LifestylePackages />
      </Interface>
    </>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected() // Returns true or false

  return {
    props: { isConnected },
  }
}