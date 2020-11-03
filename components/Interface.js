import Header from './Header'
const Interface = ({ children }) => {

    return (
        <main className="main">
            <Header />
            {children}
        </main>
    )
}

export default Interface