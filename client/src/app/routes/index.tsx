import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import AppLayout from '../layouts/AppLayout';

const router = createBrowserRouter(
    [
        {
            element: <AppLayout />,
            children: routes
        }
    ],
    {
        basename: import.meta.env.PROD ? '/shortform-client' : '/'
    }
);

export function AppRouter() {
    return <RouterProvider router={router} />;
}