import { Icon } from '@iconify/react';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative border-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm py-2 font-semibold rounded-lg hover:opacity-80 transition w-full
        ${outline ? 'bg-white hover:bg-black' : 'bg-crayola'}
        ${outline ? 'border-black' : 'border-crayola'}
        ${outline ? 'text-black hover:text-white' : 'text-white'}
      `}
    >
      {icon && <Icon icon={icon} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};

export default Button;
