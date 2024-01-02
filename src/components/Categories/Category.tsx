import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface CategoryProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ icon: Icon, label, selected }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    const category = label.toLowerCase();
    navigate(`/?category=${category}`);
  }, [label, navigate]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={22} />
      <h4 className='font-medium text-sm'>{label}</h4>
    </div>
  );
};

export default Category;
