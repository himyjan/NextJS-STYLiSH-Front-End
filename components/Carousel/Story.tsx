import { useState } from "react";

const Story = ({ story }: { story: string }) => {
  return (
    <div className="py-[30px] px-[23px] font-normal xl:pt-[166px] xl:px-[calc(100vw*2/30)]">
      <div className="whitespace-pre text-[15px] leading-[28px] xl:text-[30px] xl:leading-[57px]">
        {story
          .split("\r\n")
          .slice(0, story.split("\r\n").length - 1)
          .join("\r\n")}
      </div>
      <div className="text-[10px] leading-[32px] xl:text-[20px] xl:leading-[64px]">
        {story.split("\r\n")[story.split("\r\n").length - 1]}
      </div>
    </div>
  );
};

export default Story;
