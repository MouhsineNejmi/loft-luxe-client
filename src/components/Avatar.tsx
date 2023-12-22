interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <img
      className='rounded-full'
      height='30'
      width='30'
      src={src || 'https://github.com/shadcn.png'}
      alt='Avatar'
    />
  );
};

export default Avatar;
