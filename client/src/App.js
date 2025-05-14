import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './components/context/search';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './components/context/auth';
import Main from './components/Navigation/Main';
import { Toaster } from 'react-hot-toast';
import AccountActive from './components/auth/AccountActive';
import ForgotPass from './components/auth/ForgotPass';
import Dashboard from './components/Dashboard';
import AccessAccount from './components/auth/AccessAccount';
import CreateAd from './components/ad/CreateAd';
import ProtectedRoutes from './components/routes/ProtectedRoutes';
import './App.css'
import SellLand from './components/ad/sell/SellLand';
import SellHouse from './components/ad/sell/SellHouse';
import RentHouse from './components/ad/rent/RentHouse';
import RentLand from './components/ad/rent/Rentland';
import AdView from './components/AdView';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Wishlist from './components/Wishlist';
import Enquiries from './components/Enquiries';
import Search from './components/Search';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
          <Main />
          <Toaster />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/auth/account-activate/:token' element={<AccountActive />} />
            <Route path='/auth/forgot-password' element={<ForgotPass />} />
            <Route path='/auth/access-account/:token' element={<AccessAccount />} />

            <Route path='/' element={<ProtectedRoutes />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='ad/create' element={<CreateAd />} />
              <Route path='search' element={<Search />} />
              <Route path='/ad/create/sell/Land' element={<SellLand />} />
              <Route path='/ad/create/sell/House' element={<SellHouse />} />
              <Route path='/ad/create/rent/House' element={<RentHouse />} />
              <Route path='/ad/create/rent/Land' element={<RentLand />} />
              <Route path='/user/profile' element={<Profile />} />
              <Route path='/user/settings' element={<Settings />} />
              <Route path='/user/wishlist' element={<Wishlist />} />
              <Route path='/user/enquiries' element={<Enquiries />} />
              <Route path='/ad/:slug' element={<AdView />}></Route>
              <Route path='/dashboard/user/ad/:slug' element={<AdView />}></Route>
            </Route>

          </Routes>
          </SearchProvider>

        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App;