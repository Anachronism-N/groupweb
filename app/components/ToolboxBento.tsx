import { softwareData } from "../data/toolbox";
import { BentoCard } from "./BentoCard";

const items = softwareData
  .map((item, index) => (
    <a
      key={item.title}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`打开 ${item.title} 官网`}
      title={item.title}
      className="flex flex-col items-center text-center space-y-1 sm:space-y-2 cursor-pointer"
    >
      {/* 工具图标 */}
      <div
        className="relative rounded-[16px] sm:rounded-[18px] md:rounded-[20px] 
                   border border-border-primary p-2 sm:p-3 md:p-4 
                   transition-all duration-300 ease-out
                   hover:border-gray-400 hover:-translate-y-1 hover:scale-105
                   w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20"
      >
        <div
          className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]
                     hover:bg-white transition-all duration-200"
          style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
        >
          <img 
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-all duration-200 hover:scale-105" 
            alt={item.title} 
            src={item.imgSrc} 
          />
        </div>
      </div>
      
      {/* 工具名称 */}
      <span className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight 
                       max-w-[50px] sm:max-w-[60px] md:max-w-[70px] truncate">
        {item.title}
      </span>
    </a>
  ));

export function ToolboxBento({ linkTo }: { linkTo?: string }) {
  return (
    <BentoCard linkTo={linkTo} height="md:h-auto lg:h-auto">
      <div className="z-20 text-center mb-4 sm:mb-6">
        <h2 className="text-sm sm:text-base font-medium">Toolbox</h2>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Check out my favorite tools and spots around the web.
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 
                      gap-3 sm:gap-4 md:gap-5 lg:gap-6 
                      justify-items-center max-w-4xl mx-auto px-2 sm:px-4">
        {items}
      </div>
    </BentoCard>
  );
}
