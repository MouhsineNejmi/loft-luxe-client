import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Exact Matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}) => {
  const navigate = useNavigate();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='w-40 mt-4'>
        {showReset && (
          <Button
            outline
            label='Remove All Filters'
            onClick={() => navigate('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
