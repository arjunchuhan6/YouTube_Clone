import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home.jsx';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { lazy } from 'react';

const Login = lazy(() => import('./components/Login.jsx'))
const Register = lazy(() => import('./components/Register.jsx'))
const ViewVideo = lazy(() => import('./components/ViewVideo.jsx'));
const MyAccount = lazy(() => import('./components/MyAccount.jsx'));
const Channel = lazy(() => import('./components/Channel.jsx'));
const CreateChannel = lazy(() => import('./components/CreateChannel.jsx'));
const ViewChannel = lazy(() => import('./components/ViewChannel.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));


const appRouter = createBrowserRouter([{
  path: "/",
  element: <App />,
  children:[
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <Login /> </Suspense>
    },
    {
      path: "/register",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <Register /> </Suspense>
    },
    {
      path: "/viewvideo/:id",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <ViewVideo /> </Suspense>
    },
    {
      path: "/myaccount",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <MyAccount /> </Suspense>
    },
    {
      path: "/channel",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <Channel /> </Suspense>
    },
    {
      path: "/createchannel",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <CreateChannel /> </Suspense>
    },
    {
      path: "/viewchannel/:id",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <ViewChannel /> </Suspense>
    },
  ],
  errorElement: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <NotFound /> </Suspense>
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>
);
