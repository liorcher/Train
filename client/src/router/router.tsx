import { Suspense } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { getPagesRoutes } from '@/router/router.const';
import { CircularProgress } from '@mui/material';
import { AppLogo } from '@/assets';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalModalProvider, PersonalizedTrainingPlanProvider } from '@/contexts';
import { Toaster } from 'sonner';

function Router() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary FallbackComponent={() => <img src={AppLogo} />}>
          <AuthProvider>
            <GlobalModalProvider>
              <PersonalizedTrainingPlanProvider>
                <Navbar />
                <Outlet />
                <Toaster richColors />
              </PersonalizedTrainingPlanProvider>
            </GlobalModalProvider>
          </AuthProvider>
        </ErrorBoundary>
      ),
      children: getPagesRoutes(),
    },
  ]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default Router;
