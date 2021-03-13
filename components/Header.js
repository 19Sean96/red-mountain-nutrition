import Logo from './svg/logo-icon'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="header">
            <div className="header--inner">
                <Link href="/">
                <div className="logo--wrapper">
                    <img src="/logo-icon.svg" alt="Red Mountain Nutrition Logo" className="logo"/>
                </div>
                </Link>
                <div className="nav--wrapper">
                    <nav className="nav">
                       <Link href="/schedule/1">
                           <a>Schedule</a>
                       </Link>
                       <Link href="/">
                           <a>About</a>
                       </Link>
                       <Link href="/">
                           <a>Pricing</a>
                       </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header