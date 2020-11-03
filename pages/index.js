import Head from 'next/head'
import Interface from '../components/Interface'
import Landing from '../components/Landing'
import LifestylePackages from '../components/LifestylePackages'
export default function Home() {
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
