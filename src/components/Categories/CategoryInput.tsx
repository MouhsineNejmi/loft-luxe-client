import { IconType } from 'react-icons';

interface CategoryInputProps {
  onClick: (value: string) => void;
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3 cursor-pointer hover:border-black hover:text-black transition cusror pointer
        ${
          selected
            ? 'border-black text-black'
            : 'border-neutral-200 text-neutral-500'
        }
      `}
    >
      <Icon size={24} />
      <h3 className='font-semibold'>{label}</h3>
    </div>
  );
};

export default CategoryInput;
