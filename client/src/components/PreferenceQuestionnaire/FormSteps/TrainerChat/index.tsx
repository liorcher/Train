import { Avatar, Box, Typography } from '@mui/material';
import { ChatTrainer } from '@/assets';

interface Props {
  title: string;
  showMessage: boolean;
}

export const TrainerChat: React.FC<Props> = ({ title, showMessage }) => {
  return (
    <Box display='flex' alignItems='flex-start' mb={2}>
      <Avatar alt='AI Trainer' src={ChatTrainer} sx={{ width: 50, height: 50, mr: 2 }} />
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '15px',
          padding: '10px 15px',
          maxWidth: '80%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {showMessage ? (
          <Typography
            variant='h5'
            fontWeight={500}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              animation: 'typing 1s steps(30, end), blink-caret 0.75s step-end infinite',
            }}
          >
            {title}
          </Typography>
        ) : (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box
              sx={{
                animation: 'dot-flashing 1s infinite both',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'black',
                mx: 0.5,
              }}
            />
            <Box
              sx={{
                animation: 'dot-flashing 1s infinite both 0.2s',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'black',
                mx: 0.5,
              }}
            />
            <Box
              sx={{
                animation: 'dot-flashing 1s infinite both 0.4s',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'black',
                mx: 0.5,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
