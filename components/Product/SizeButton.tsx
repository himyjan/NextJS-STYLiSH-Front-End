const SELECTED_SIZE_BOX =
  'w-[36px] h-[36px] flex justify-center items-center rounded-full ml-[15px] xl:ml-[32px]';

const SizeButton = ({
  size,
  selectedSize,
  selectSizeHandler,
  isValid,
}: {
  size: string;
  selectedSize: string;
  selectSizeHandler: (size: string) => void;
  isValid: boolean;
}) => {
  if (isValid) {
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
  }

  return (
    <button
      className={`${SELECTED_SIZE_BOX} cursor-not-allowed bg-light-grey-4 text-light-black text-opacity-10`}
      disabled
    >
      {size}
    </button>
  );
};

export default SizeButton;
