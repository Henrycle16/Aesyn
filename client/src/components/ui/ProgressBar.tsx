import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

interface ProgressBarProps {
  progress: number;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#308fe8',
  },
}));

export default function ProgressBar({ progress }: ProgressBarProps ) {
  return (
    <>
      <BorderLinearProgress variant="determinate" value={progress} className='rounded-b-md h-4 border border-t-0 border-gray-300' />
    </>
  );
}