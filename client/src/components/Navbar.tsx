import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppLogo } from '@/assets';
import {
  HOME_URL,
  LOGIN_URL,
  SIGNUP_URL,
  USER_PROGRESS_URL,
  WORKOUTS_URL,
} from '@/router/router.const';
import { useAuth } from '@/contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { isNull, isUndefined } from 'lodash';
import {
  useGlobalModalContext,
  usePersonalizedTrainingPlanContext,
  usePreferencesContext,
} from '@/contexts';
import { Form } from './PreferenceQuestionnaire';
import { PreferencesApi } from '@/api';
import { toast } from 'sonner';
import { getAllUserPreferences } from '@/utils';
import { UserGoals } from '@/models';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { showModal } = useGlobalModalContext();
  const { preferences, updatePreferences, fetchPreferences } = usePreferencesContext();
  const { generateTraningPlan, updateWorkouts } = usePersonalizedTrainingPlanContext();

  const handleLogout = async () => {
    try {
      await logout();
      updatePreferences(null);
      updateWorkouts([]);
      navigate(HOME_URL);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const openPreferencesModal = (goals: UserGoals) =>
    currentUser &&
    showModal(Form, {
      filledPreferences: true,
      preferences: getAllUserPreferences(currentUser, goals),
      onSaveSuccess: () => {
        navigate(USER_PROGRESS_URL);
        fetchPreferences();
        generateTraningPlan();
      },
    });

  const onEditPreferencesClick = async () => {
    if (!currentUser) return;
    if (preferences === null) {
      PreferencesApi.getUserPreferences()
        .then((res) => {
          updatePreferences(res);
          openPreferencesModal(res);
        })
        .catch((err) => {
          toast.error('Failed to fetch preferences');
          console.error(err);
        });
    } else {
      openPreferencesModal(preferences);
    }
  };

  return (
    <AppBar position='sticky'>
      <Toolbar>
        {/* Left Side: Logo and Two Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(HOME_URL)}>
            <Box component='img' src={AppLogo} sx={{ width: '6vw' }} />
          </IconButton>
          <Button color='inherit' onClick={() => navigate(WORKOUTS_URL)}>
            WORKOUTS
          </Button>
          {currentUser?.filledPreferences && (
            <Button color='inherit' onClick={onEditPreferencesClick}>
              PREFERENCES
            </Button>
          )}
        </Box>

        {/* Spacer to push content to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Conditional Rendering */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!isUndefined(currentUser) ? (
            !isNull(currentUser) ? (
              <>
                <Avatar alt={currentUser.name || ''} src='' sx={{ marginRight: 1 }} />
                <Typography variant='body1' color='inherit' sx={{ marginRight: 2 }}>
                  Hello, {currentUser.name}
                </Typography>
                <IconButton color='inherit' onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  sx={{ backgroundColor: 'info.main', borderRadius: '15px', p: '6px 12px' }}
                  onClick={() => navigate(LOGIN_URL)}
                >
                  SIGN IN
                </Button>
                <Button
                  sx={{ backgroundColor: 'primary.light', borderRadius: '15px', p: '6px 12px' }}
                  onClick={() => navigate(SIGNUP_URL)}
                >
                  SIGN UP
                </Button>
              </>
            )
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
