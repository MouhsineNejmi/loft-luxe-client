interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h3 className='text-lg font-bold'>{title}</h3>
      <h4 className='font-lighter text-sm text-neutral-500 mt-1'>{subtitle}</h4>
    </div>
  );
};

export default Heading;
