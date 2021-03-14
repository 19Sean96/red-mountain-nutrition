import '../styles/globals.scss'
import CartContext from '../components/context'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faTimes, faArrowRight, faCalendarAlt, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faArrowRight, faArrowLeft, faCheck, faTimes, faCalendarAlt)
function MyApp({ Component, pageProps }) {

  return (
    <CartContext>
      <Component {...pageProps} />
    </CartContext>
  )
}

export default MyApp
