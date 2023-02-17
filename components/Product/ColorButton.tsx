import { Colors } from "@/types/types";

const SELECTED_COLOR_BOX =
  "w-[36px] h-[36px] flex justify-center items-center ml-[15px]";

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
        className="w-[24px] h-[24px] border border-light-grey "
        style={{ backgroundColor: `#${color.code}` }}
        onClick={() => {
          selectColorHandler(color);
        }}
      />
    </div>
  );
};

export default ColorButton;
