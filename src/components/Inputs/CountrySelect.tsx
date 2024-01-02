import Select from 'react-select';
import useCountries from '@/hooks/useCountrySelect';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface ICountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<ICountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <Select
      className='z-50'
      placeholder='Anywhere'
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option) => (
        <div className='flex flex-row items-center gap-3'>
          <div>{option.flag}</div>
          <p>
            {option.label},
            <span className='text-neutral-800 ml-1'>{option.region}</span>
          </p>
        </div>
      )}
      classNames={{
        control: () => 'p-1 border-2',
        input: () => 'text-sm',
        option: () => 'text-sm',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe5e5',
        },
      })}
    />
  );
};

export default CountrySelect;
