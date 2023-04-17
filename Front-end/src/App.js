import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GlobalStyle from './assets/styles/globalStyle'
import UserInfoProvider from './contexts/UserContext'
import NotFoundPage from './pages/404Page'
import SignInPage from './pages/AuthPages/SignIn'
import SignUpPage from './pages/AuthPages/SignUp'
import CartPage from './pages/CartPage/CartPage'
import CatalogPage from './pages/CatalogPage/Catalog'
import CategoryPage from './pages/CategoryPage/Category'
import HomePage from './pages/HomePage/Home'
import CancelPage from './pages/PaymentPages/Cancel'
import SuccessPage from './pages/PaymentPages/Success'
import ProductPage from './pages/ProductPage/Product'
import SavesPage from './pages/SavesPage/Save'
import SearchPage from './pages/SearchPage/Search'
import UserPage from './pages/UserPage/User'

export default function App () {
    return (
        <BrowserRouter>
            <GlobalStyle/>
                <UserInfoProvider>
                    <Routes>
                        <Route path='/' element={<SignInPage />}/>
                        <Route path='/sign-up' element={<SignUpPage />}/>
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/product/:productId' element={<ProductPage />} />
                        <Route path='/product/search/:productName' element={<SearchPage />} />
                        <Route path='/category/:categoryId' element={<CategoryPage />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='/catalog' element={<CatalogPage />} />
                        <Route path='/user' element={<UserPage />} />
                        <Route path='/saves' element={<SavesPage />} />
                        <Route path='/success/:purchaseId' element={<SuccessPage />} />
                        <Route path='/cancel/:purchaseId' element={<CancelPage />} />
                        <Route path='/404' element={<NotFoundPage/>} />
                        <Route path='*' element={<Navigate to={'/404'} />} />
                    </Routes>
                </UserInfoProvider>
        </BrowserRouter>
    )
}