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
      { index: true, element: <LoginForm /> },
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
      { path: '/payment/:id/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01', element: <PaymentForm/> } ,
      { path: '/cartorder', element: <CartOrders/>},
      { path: '/payment/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01', element: <PaymentCart/>}
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
      { path: '/Admin', element: <Admin/>}
    ]
  }
]);

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? user.role ==='ADMIN'? adminRouter: userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}