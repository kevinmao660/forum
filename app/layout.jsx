import '@styles/global.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Forum",
    description: 'Discover & Share Events'
}

const RouteLayout = ({children}) => {
  return (
    <html lang = "en">
        <body>
            <Provider>
                <div className="main">
                    <div className = "gradient"></div>
                </div>

                <main className = "app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RouteLayout;