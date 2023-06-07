import type { Colors } from '@/types/types';

const SELECTED_COLOR_BOX =
  'w-[36px] h-[36px] flex justify-center items-center ml-[15px] xl:ml-[32px]';

const ColorButton = ({
  color,
  selectedColor,
  selectColorHandler,
}: {
  color: Colors;
  selectedColor: string;
  selectColorHandler: (color: Colors) => void;
}) => {
  return (
    <div
      className={
        color.code === selectedColor
          ? `${SELECTED_COLOR_BOX} border border-light-grey-3`
          : SELECTED_COLOR_BOX
      }
    >
      <button
        className="h-[24px] w-[24px] border border-light-grey xl:h-[26px] xl:w-[26px]"
        style={{ backgroundColor: `#${color.code}` }}
        onClick={() => {
          selectColorHandler(color);
        }}
      />
    </div>
  );
};

export default ColorButton;
