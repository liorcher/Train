import { RouteObject } from 'react-router-dom';
import Login from '@components/Login';
import { protectedRoute } from './ProtectedRoute';
import Unauthorized from '@/components/Unauthorized';
import Signup from '@/components/Signup';
import { Home, UserProgressPage } from '@/components';
import WorkoutsPage from '@/components/Workouts/WorkoutsPage';
import { RedirectAuthenticated } from './RedirectAuthenticated';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const UNAUTHORIZED_URL = '/unauthorized';
export const USER_PROGRESS_URL = '/home';
export const WORKOUTS_URL = '/workouts';
export const SIGNUP_URL = '/signup';

const routes = [
  { path: LOGIN_URL, element: <Login />, id: 'Login' },
  { path: SIGNUP_URL, element: <Signup />, id: 'Signup' },
  { path: UNAUTHORIZED_URL, element: <Unauthorized />, id: 'Unauthorized' },
  {
    path: HOME_URL,
    element: (
      <RedirectAuthenticated>
        <Home />
      </RedirectAuthenticated>
    ),
    id: 'Home',
  },
  {
    path: USER_PROGRESS_URL,
    element: protectedRoute(<UserProgressPage />),
    id: 'UserProgress',
  },
  {
    path: WORKOUTS_URL,
    element: protectedRoute(<WorkoutsPage />),
    id: 'Workouts',
  },
];

export const getPagesRoutes = (): RouteObject[] => {
  return [...routes];
};
