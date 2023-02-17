interface Dot {
  activeIndex: number;
  index: number;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}

const DOT_CLASS_NAME = "w-[4px] h-[4px] rounded-full";

const Dot = ({
  activeIndex,
  index,
  onClick,
  onMouseOver,
  onMouseLeave,
}: Dot) => {
  return (
    <div
      className={
        activeIndex === index
          ? `${DOT_CLASS_NAME} bg-brown`
          : `${DOT_CLASS_NAME} bg-white opacity-40`
      }
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default Dot;
