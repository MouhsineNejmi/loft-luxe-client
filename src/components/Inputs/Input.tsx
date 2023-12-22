import { FieldErrors } from 'react-hook-form';
import { Icon } from '@iconify/react';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  disabled,
  formatPrice,
  errors,
}) => {
  return (
    <div className='w-full relative'>
      <label
        className={`
          text-sm duration-150 z-10 block mb-1
          ${formatPrice ? 'left-9' : 'left-4'}
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>

      {formatPrice && (
        <Icon
          icon='bx:dollar'
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className={`
          text-sm w-full p-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
    </div>
  );
};

export default Input;
