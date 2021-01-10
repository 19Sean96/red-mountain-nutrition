const Footer = props => {

    return (
        <section className="footer">
            <div className="footer__wrapper">
                <div className="footer--contact">
                    <h5 className="footer--contact--title">
                        contact us
                    </h5>
                    <p className="footer--contact__email">tina@redmountainnutrition.com</p>
                    <p className="footer--contact__phone"><a href="tel:480-353-8816">1.480.353.8816</a></p>

                    <div className="footer--contact--links"></div>
                </div>
                <div className="footer--address">
                    <h5 className="footer--address--title">address</h5>
                    <p>2929 n power road</p>
                    <p>mesa, arizona 85207</p>
                </div>
                <div className="footer--disclosure">
                    <p>
                        <a href="#">terms & conditions</a>
                        <span>|</span>
                        <a href="#">faqs</a>
                    </p>
                    <p>copyright seananthony</p>
                </div>
            </div>
        </section>
    )
}

export default Footer;