import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider }    from './context/AuthContext.jsx'
import { CartProvider }    from './context/CartContext.jsx'
import { ToastProvider }   from './context/ToastContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { SellerProvider }  from './context/SellerContext.jsx'

import Layout         from './components/layout/Layout.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

import LandingPage  from './pages/LandingPage.jsx'
import LoginPage    from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import SellerPage   from './pages/SellerPage.jsx'


export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <ProductProvider>
            <Layout>
              <Routes>
                {/* Public */}
                <Route path="/"         element={<LandingPage />} />
                <Route path="/products" element={<ProductsPage />} />

                {/* Guest only — redirect away if already logged in */}
                <Route path="/login" element={
                  <ProtectedRoute guestOnly><LoginPage /></ProtectedRoute>
                } />
                <Route path="/register" element={
                  <ProtectedRoute guestOnly><RegisterPage /></ProtectedRoute>
                } />

                {/* SELLER only — SellerProvider scoped here */}
                <Route path="/seller" element={
                  <ProtectedRoute sellerOnly>
                    <SellerProvider>
                      <SellerPage />
                    </SellerProvider>
                  </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProductProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
