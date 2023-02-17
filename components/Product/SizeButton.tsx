const SELECTED_SIZE_BOX =
  "w-[36px] h-[36px] flex justify-center items-center rounded-full ml-[15px]";

const SizeButton = ({
  size,
  selectedSize,
  selectSizeHandler,
}: {
  size: string;
  selectedSize: string;
  selectSizeHandler: (size: string) => void;
}) => {
  return (
    <button
      className={
        size === selectedSize
          ? `${SELECTED_SIZE_BOX} bg-black text-white`
          : `${SELECTED_SIZE_BOX} bg-light-grey-4 text-light-black`
      }
      onClick={() => {
        selectSizeHandler(size);
      }}
    >
      {size}
    </button>
  );
};

export default SizeButton;
