import { RouteObject } from 'react-router-dom';
import Login from '@components/Login';
import { protectedRoute } from './ProtectedRoute';
import Unauthorized from '@/components/Unauthorized';
import Workouts from '@/components/Workouts';
import Signup from '@/components/Signup';
import { Home, PreferenceQuestionnaire } from '@/components';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const UNAUTHORIZED_URL = '/unauthorized';
export const WORKOUTS_URL = '/workouts';
export const SIGNUP_URL = '/signup';
export const PREFERENCE_QUESTIONNAIRE_URL = '/preference-questionnaire';

const routes = [
  { path: LOGIN_URL, element: <Login />, id: 'Login' },
  { path: SIGNUP_URL, element: <Signup />, id: 'Signup' },
  { path: UNAUTHORIZED_URL, element: <Unauthorized />, id: 'Unauthorized' },
  {
    path: HOME_URL,
    element: <Home />,
    id: 'Home',
  },
  {
    path: WORKOUTS_URL,
    element: protectedRoute(<Workouts />),
    id: 'Workouts',
  },
  {
    path: PREFERENCE_QUESTIONNAIRE_URL,
    element: protectedRoute(<PreferenceQuestionnaire />),
    id: 'PreferenceQuestionnaire',
  },
];

export const getPagesRoutes = (): RouteObject[] => {
  return [...routes];
};
