import { useState } from "react";

const Story = ({ story }: { story: string }) => {
  return (
    <div className="py-[30px] px-[23px] font-normal">
      <div className="whitespace-pre text-[15px] leading-[28px]">
        {story
          .split("\r\n")
          .slice(0, story.split("\r\n").length - 1)
          .join("\r\n")}
      </div>
      <div className="text-[10px] leading-[32px]">
        {story.split("\r\n")[story.split("\r\n").length - 1]}
      </div>
    </div>
  );
};

export default Story;
