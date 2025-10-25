import { createBrowserRouter } from 'react-router'

import RootLayout from '@/components/layout/RootLayout'
import MainLayout from '@/components/layout/MainLayout'
import ProtectedLayout from '@/components/layout/ProtectedLayout'

import HomePage from '@/pages/public/HomePage'
import LoginPage from '@/pages/public/LoginPage'
import SignInPage from '@/pages/public/SignInPage'
import DashboardPage from '@/pages/protected/DashboardPage'
import TransactionsPage from '@/pages/protected/TransactionsPage'
import SupportPage from '@/pages/protected/SupportPage'

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
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: 'banco',
            element: <DashboardPage />,
          },
          {
            path: 'transacciones',
            element: <TransactionsPage />,
          },
          {
            path: 'soporte',
            element: <SupportPage />,
          },
        ],
      },
    ],
  },
])
