const FOOTER_ITEMS = [
  { text: "關於 STYLiSH" },
  { text: "服務條款" },
  { text: "隱私政策" },
  { text: "聯絡我們" },
  { text: "FAQ" },
];

const Footer = () => {
  return (
    <footer className="w-full h-[146px] bg-dark-grey mb-[60px] xl:h-[115px] xl:mb-[0px] xl:flex xl:justify-center">
      <div className="flex flex-wrap justify-center xl:flex-nowrap xl:justify-start xl:w-[1280px] xl:px-[60px]">
        <div className="flex flex-col flex-wrap justify-start items-center h-[109px] w-[248px] pt-[23px] pl-[40px] xl:flex-row xl:flex-nowrap xl:pt-[0px] xl:pl-[0px] xl:flex-1">
          {FOOTER_ITEMS?.map((item, index, arr) => {
            if (index === arr.length - 1) {
              return (
                <div key={`footer-${index + 1}`} className="flex items-center">
                  <div
                    key={`footer-${index + 1}`}
                    className="text-[14px] leading-[20px] w-[121px] h-[20px] mb-[8px] text-light-grey xl:text-[16px] xl:leading-[22px] xl:w-[134px] xl:mb-[0px] xl:h-[22px] xl:text-center"
                  >
                    {item.text}
                  </div>
                </div>
              );
            }
            return (
              <div key={`footer-${index + 1}`} className="flex items-center">
                <div
                  key={`footer-${index + 1}`}
                  className="text-[14px] leading-[20px] w-[121px] h-[20px] mb-[8px] text-light-grey xl:text-[16px] xl:leading-[22px] xl:w-[134px] xl:mb-[0px] xl:h-[22px] xl:text-center"
                >
                  {item.text}
                </div>
                <div className="hidden xl:border-r xl:border-light-grey xl:h-[16px] xl:inline-block" />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-[20px] h-[20px] mr-[14px] bg-line bg-cover bg-center xl:w-[50px] xl:h-[50px] xl:mr-[30px]" />
          <div className="w-[20px] h-[20px] mr-[14px] bg-twitter bg-cover bg-center xl:w-[50px] xl:h-[50px] xl:mr-[30px]" />
          <div className="w-[20px] h-[20px] mr-[14px] bg-facebook bg-cover bg-center xl:w-[50px] xl:h-[50px] xl:mr-[30px]" />
        </div>
        <div className="w-full text-center text-grey text-[10px] leading-[14px] mb-20px xl:mb-[0px] xl:max-w-fit xl:text:[12px] xl:leading-[17.38px] xl:flex xl:items-center">
          © 2018. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
