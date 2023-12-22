import { Controller } from 'react-hook-form';
import { Icon } from '@iconify/react';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  disabled,
  formatPrice,
  placeholder,
  control,
}) => {
  return (
    <div className='w-full relative'>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <label
              className={`
                text-sm duration-150 z-10 block mb-1
                ${formatPrice ? 'left-9' : 'left-4'}
                ${fieldState.error ? 'text-rose-500' : 'text-zinc-400'}
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
              disabled={disabled}
              placeholder={placeholder}
              type={type}
              className={`
                text-sm w-full p-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${fieldState.error ? 'border-rose-500' : 'border-neutral-300'}
                ${
                  fieldState.error
                    ? 'focus:border-rose-500'
                    : 'focus:border-black'
                }
              `}
              {...field}
            />
            {fieldState.error && (
              <p className='text-rose-500'>{fieldState?.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Input;
