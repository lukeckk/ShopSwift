import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header/>
      <main className="py-3">
        <Container>
          {/* routing for homescreen */}
          <Outlet />
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App