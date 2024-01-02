interface MenuItemProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, disabled }) => {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      className={`px-4 py-3 text-sm hover:bg-neutral-100 transition font-semibold cursor-pointer ${
        disabled ? 'bg-neutral-100 cursor-not-allowed' : ''
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
