const Story = ({ story }: { story: string }) => {
  return (
    <div className="w-full max-w-[1200px] pl-[23px] pt-[30px] font-[100] xl:pl-[47px] xl:pt-[166px]">
      <div className="whitespace-pre text-[15px] leading-[28px] xl:text-[30px] xl:leading-[57px]">
        {story
          .split('\r\n')
          .slice(0, story.split('\r\n').length - 1)
          .join('\r\n')}
      </div>
      <div className="text-[10px] leading-[32px] xl:text-[20px] xl:leading-[64px]">
        {story.split('\r\n')[story.split('\r\n').length - 1]}
      </div>
    </div>
  );
};

export default Story;
