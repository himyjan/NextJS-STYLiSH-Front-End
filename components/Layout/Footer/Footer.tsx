const FOOTER_ITEMS = [
  { text: "關於 STYLiSH" },
  { text: "服務條款" },
  { text: "隱私政策" },
  { text: "聯絡我們" },
  { text: "FAQ" },
];

const Footer = () => {
  return (
    <footer className="w-full h-[146px] bg-dark-grey mb-[60px]">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col flex-wrap justify-start items-center h-[109px] w-[248px] pt-[23px] pl-[40px]">
          {FOOTER_ITEMS?.map((item, index, arr) => {
            if (index === arr.length - 1) {
              return (
                <div
                  key={`footer-${index + 1}`}
                  className="text-[14px] leading-[20px] w-[121px] h-[20px] mb-[8px] text-light-grey"
                >
                  {item.text}
                </div>
              );
            }
            return (
              <div key={`footer-${index + 1}`}>
                <div
                  key={`footer-${index + 1}`}
                  className="text-[14px] leading-[20px] w-[121px] h-[20px] mb-[8px] text-light-grey"
                >
                  {item.text}
                </div>
                <div className="hidden" />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-[20px] h-[20px] mr-[14px] bg-line bg-cover bg-center" />
          <div className="w-[20px] h-[20px] mr-[14px] bg-twitter bg-cover bg-center" />
          <div className="w-[20px] h-[20px] mr-[14px] bg-facebook bg-cover bg-center" />
        </div>
        <div className="w-full text-center text-grey text-[10px] leading-[14px] mb-20px">
          © 2018. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
