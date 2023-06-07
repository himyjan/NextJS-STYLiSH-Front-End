const FOOTER_ITEMS = [
  { text: '關於 STYLiSH' },
  { text: '服務條款' },
  { text: '隱私政策' },
  { text: '聯絡我們' },
  { text: 'FAQ' },
];

const Footer = () => {
  return (
    <footer className="mb-[60px] h-[146px] w-full bg-dark-grey xl:mb-[0px] xl:flex xl:h-[115px] xl:justify-center">
      <div className="flex flex-wrap justify-center xl:w-[1280px] xl:flex-nowrap xl:justify-start xl:px-[60px]">
        <div className="flex h-[109px] w-[248px] flex-col flex-wrap items-center justify-start pl-[40px] pt-[23px] xl:flex-1 xl:flex-row xl:flex-nowrap xl:pl-[0px] xl:pt-[0px]">
          {FOOTER_ITEMS?.map((item, index, arr) => {
            if (index === arr.length - 1) {
              return (
                <div key={`footer-${index + 1}`} className="flex items-center">
                  <div
                    key={`footer-${index + 1}`}
                    className="mb-[8px] h-[20px] w-[121px] text-[14px] leading-[20px] text-light-grey xl:mb-[0px] xl:h-[22px] xl:w-[134px] xl:text-center xl:text-[16px] xl:leading-[22px]"
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
                  className="mb-[8px] h-[20px] w-[121px] text-[14px] leading-[20px] text-light-grey xl:mb-[0px] xl:h-[22px] xl:w-[134px] xl:text-center xl:text-[16px] xl:leading-[22px]"
                >
                  {item.text}
                </div>
                <div className="hidden xl:inline-block xl:h-[16px] xl:border-r xl:border-light-grey" />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center">
          <div className="mr-[14px] h-[20px] w-[20px] bg-line bg-cover bg-center xl:mr-[30px] xl:h-[50px] xl:w-[50px]" />
          <div className="mr-[14px] h-[20px] w-[20px] bg-twitter bg-cover bg-center xl:mr-[30px] xl:h-[50px] xl:w-[50px]" />
          <div className="mr-[14px] h-[20px] w-[20px] bg-facebook bg-cover bg-center xl:mr-[30px] xl:h-[50px] xl:w-[50px]" />
        </div>
        <div className="mb-20px xl:text:[12px] w-full text-center text-[10px] leading-[14px] text-grey xl:mb-[0px] xl:flex xl:max-w-fit xl:items-center xl:leading-[17.38px]">
          © 2018. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
