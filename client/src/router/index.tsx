import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';

const OrgsList = lazy(() => import('@/pages/organizations/List'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'organizations', element: <OrgsList /> },
        ],
    },
]);
