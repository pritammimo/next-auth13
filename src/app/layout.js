
import AppBar from './appBar'
import './globals.css'
import Provider from "./Provider";


export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions)
  // console.log("sess",session);
  return (
    <html lang="en">
      <body>
        <Provider>
          <AppBar/>
          <div className={"  h-screen "}>{children}</div>
          </Provider>
      </body>
    </html>
  )
}
