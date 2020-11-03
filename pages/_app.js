import '../styles/globals.scss'
import CartContext from '../components/context'

function MyApp({ Component, pageProps }) {
  return (
    <CartContext>
      <Component {...pageProps} />
    </CartContext>
  )
}

export default MyApp
