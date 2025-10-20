import { createBrowserRouter } from 'react-router'

import RootLayout from '@/components/layout/RootLayout'
import MainLayout from '@/components/layout/MainLayout'

import HomePage from '@/pages/public/HomePage'

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
        ],
      },
    ],
  },
])
