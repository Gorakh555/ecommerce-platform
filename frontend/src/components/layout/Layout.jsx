import Navbar     from './Navbar.jsx'
import Footer     from './Footer.jsx'
import Toast      from '../ui/Toast.jsx'
import CartDrawer from '../cart/CartDrawer.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  )
}
