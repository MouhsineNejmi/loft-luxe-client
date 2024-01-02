interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <img
      className='rounded-full'
      height='30'
      width='30'
      src={
        src ||
        'https://gravatar.com/avatar/ac447fc970080acc58f3fad587cd61c7?s=400&d=mp&r=x'
      }
      alt='Avatar'
    />
  );
};

export default Avatar;
