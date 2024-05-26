import LinearProgress from '@mui/material/LinearProgress';

interface ProgressBarProps {
  progress: number;
}


export default function ProgressBar({ progress }: ProgressBarProps ) {
  return (
    <>
      <LinearProgress variant="determinate" value={progress} className='rounded-b-md h-4' />
    </>
  );
}