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
const History = lazy(() => import('./components/History.jsx'))
const WatchLater = lazy(() => import('./components/WatchLater.jsx'))
const LikedVideos = lazy(() => import('./components/LikedVideo.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))


const appRouter = createBrowserRouter([{
  path: "/",
  element: <App/>,
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
      path: "/history",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <History /> </Suspense>
    },
    {
      path: "/watchlater",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <WatchLater /> </Suspense>
    },
    {
      path: "/likedvideos",
      element: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <LikedVideos /> </Suspense>
    },
  ],
  errorElement: <Suspense fallback={<h1 className='text-center text-3xl'>Please Wait while Loading...</h1>}> <NotFound /> </Suspense>
  // errorElement:<NotFound />
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>
);
