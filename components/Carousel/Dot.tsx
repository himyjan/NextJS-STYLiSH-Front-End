interface Dot {
  $isActive: boolean;
  index: number;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

const DOT_CLASS_NAME =
  'w-[4px] h-[4px] mx-[4.4px] rounded-full xl:w-[10px] xl:h-[10px] xl:mx-[11px]';

const Dot = ({ $isActive, index, onClick, onMouseOver, onMouseLeave }: Dot) => {
  return (
    <div
      className={
        $isActive
          ? `${DOT_CLASS_NAME} bg-brown`
          : `${DOT_CLASS_NAME} bg-white/40`
      }
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default Dot;
