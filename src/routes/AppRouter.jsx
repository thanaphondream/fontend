import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header';
import LoginForm from '../layout/LoginForm';
import RegisterForm from '../layout/RegisterForm';
import UserHome from '../layout/UserHome';
import Produc from '../layout/produc/produc';
import ProductDetail from '../layout/OrderDate/getProductById';
import PaymentForm from '../layout/PaymentForm/PaymentForm';
import Admin from '../Admin/Admin';
import HeaderAdmin from '../layout/HeaderAdmin';

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
      { path: '/new', element: <Produc /> },
      { path: '/product/:id', element: <ProductDetail /> }, 
      { path: '/payment/:id/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01', element: <PaymentForm/> } 
    ]
  }
]);

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HeaderAdmin /> {/* ใช้ HeaderAdmin ที่นี่ */}
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> }, // เรียกใช้ Admin component ที่นี่
      { path: '/Admin', element: <Admin/>},
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