import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header';
import LoginForm from '../layout/LoginForm';
import RegisterForm from '../layout/RegisterForm';
import UserHome from '../layout/UserHome';
import ProductDetail from '../layout/OrderDate/getProductById';
import PaymentForm from '../layout/PaymentForm/PaymentForm';
import Admin from '../Admin/Admin';
import HeaderAdmin from '../Admin/HeaderAdmin';
import UserProduck from '../layout/UserProduck';
import HomAdmin from '../Admin/homAdmin';
import CartOrders from '../layout/CartOrder/CartOrders';
import PaymentCart from '../layout/PaymentForm/PaymenfCart';
import MyChart from '../Admin/Grach';
import Address from '../layout/Address/address'
import PaymentQRCode from '../layout/PaymentForm/PaymentQRCode';
import UpdateMenuItemForm from '../Admin/UpdateMenuItemForm';
import Profile from '../layout/Profile'
import HeaderOrricer from '../Officer/HeaderOrricer';
import HomeOfficer from '../Officer/HomeOfficer';
import FoodDelivery from '../Officer/FoodDelivery';
import ConfirmDelivery from '../Officer/ConfirmDelivery';
import Finished_work from '../Officer/Finished_work';
import Already_Shipped from '../Officer/Already_Shipped';
import UserUpdaterole from '../Admin/UserUpdaterole';
import ConfirmOrder from '../Admin/ConfirmOrder';
import Already from '../Admin/Already';
import Home from '../layout/Home';
import Cancel from '../Admin/Cancel';
import Pay from '../layout/PaymentForm/Pay';

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/loing', element: <LoginForm/>},
      { path: '/register', element: <RegisterForm /> }
    ]
  }
]);

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: '/Usreproduck', element: <UserProduck/>},
      { path: '/product/:id', element: <ProductDetail /> }, 
      { path: '/PaymentForm', element: <PaymentForm/> } ,
      { path: '/payment/:id', element: <PaymentForm/> } ,
      { path: '/cartorder', element: <CartOrders/>},
      { path: '/payment', element: <PaymentCart/>},
      { path: '/location', element: <Address/>},
      { path: '/vvbbb', element: <PaymentQRCode/>},
      { path: '/profile', element: <Profile/> },
      { path: '/pay', element: <Pay/>}
    ]
  }
]);

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HeaderAdmin /> 
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomAdmin /> }, 
      { path: '/Admin', element: <Admin/>},
      { path: '/Grach', element: <MyChart/>},
      { path: '/updatemunu/:id', element: <UpdateMenuItemForm/>},
      { path: '/updaterole', element: <UserUpdaterole/>},
      { path: '/confirmorder', element: <ConfirmOrder/>},
      { path: '/already', element: <Already/>},
      { path: '/cancel', element: <Cancel/>}
    ]
  }
]);

const OfficerRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HeaderOrricer /> 
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <HomeOfficer /> }, 
      { path: '/delivery', element: <FoodDelivery/>},
      { path: '/confirm', element: <ConfirmDelivery/>},
      { path: '/finishedWork', element: <Finished_work/>},
      { path: '/alreadyshipped', element: <Already_Shipped/>}
    ]
  }
]);

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = () => {
    if (!user?.id) {
      return guestRouter;
    }
  
    if (user.role === 'OFFICER') {
      return OfficerRouter;
    }
  
    if (user.role === 'ADMIN') {
      return adminRouter;
    }
  
    return userRouter;
  };
  
  const selectedRouter = finalRouter();


  return (
    <RouterProvider router={selectedRouter} />
  )
}