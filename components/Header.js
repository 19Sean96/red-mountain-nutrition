import Logo from './svg/logo-icon'
import Link from 'next/link'

export default () => {
    return (
        <header className="header">
            <div className="header--inner">
                <div className="logo--wrapper">
                    <Logo />
                </div>
                <div className="nav--wrapper">
                    <nav className="nav">
                       <Link href="/">
                           <a>Schedule</a>
                       </Link>
                       <Link href="/">
                           <a>Locations</a>
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