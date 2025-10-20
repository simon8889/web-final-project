import { createBrowserRouter } from 'react-router'

import RootLayout from '@/components/layout/RootLayout'
import MainLayout from '@/components/layout/MainLayout'

import HomePage from '@/pages/public/HomePage'
import LoginPage from '@/pages/public/LoginPage'
import SignInPage from '@/pages/public/SignInPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'auth/login',
            element: <LoginPage />,
          },
          {
            path: 'auth/signin',
            element: <SignInPage />,
          },
        ],
      },
    ],
  },
])
