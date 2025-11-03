import Image from "next/image";
import { softwareData } from "../data/toolbox";
import { BentoCard } from "./BentoCard";

export function ToolboxBento({
  linkTo,
  isHorizontalScroll = false,
}: {
  linkTo?: string;
  isHorizontalScroll?: boolean;
}) {
  // Create items function to avoid nested anchor tags when linkTo is provided
  const createItems = (preventLinks: boolean = false) =>
    softwareData.map((item, index) => {
      const content = (
        <>
          {/* 工具图标 */}
          <div className={`relative rounded-[16px] border border-border-primary p-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-gray-400 sm:rounded-[18px] sm:p-3 md:rounded-[20px] md:p-4 ${
            isHorizontalScroll 
              ? "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" 
              : "h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20"
          }`}>
            <div
              className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] transition-all duration-200 hover:bg-white"
              style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
            >
              <Image
                className={`transition-all duration-200 hover:scale-105 ${
                  isHorizontalScroll 
                    ? "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" 
                    : "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                }`}
                alt={item.title}
                src={item.imgSrc}
                width={32}
                height={32}
              />
            </div>
          </div>

          {/* 工具名称 */}
          <span className={`truncate font-medium leading-tight text-gray-600 ${
            isHorizontalScroll 
              ? "max-w-[45px] text-[9px] sm:max-w-[50px] sm:text-[10px] md:max-w-[60px] md:text-xs" 
              : "max-w-[50px] text-[10px] sm:max-w-[60px] sm:text-xs md:max-w-[70px]"
          }`}>
            {item.title}
          </span>
        </>
      );

      if (preventLinks) {
        return (
          <div
            key={item.title}
            className="flex cursor-pointer flex-col items-center space-y-1 text-center sm:space-y-2"
          >
            {content}
          </div>
        );
      }

      return (
        <a
          key={item.title}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`打开 ${item.title} 官网`}
          title={item.title}
          className="flex cursor-pointer flex-col items-center space-y-1 text-center sm:space-y-2"
        >
          {content}
        </a>
      );
    });
  // Prevent nested anchor tags when linkTo is provided
  const items = createItems(!!linkTo);

  return (
    <BentoCard linkTo={linkTo} height="md:h-auto lg:h-auto">
      <div className="z-20 mb-4 text-center sm:mb-6">
        <h2 className="text-sm font-medium sm:text-base">Toolbox</h2>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Check out my favorite tools and spots around the web.
        </p>
      </div>
      {isHorizontalScroll ? (
        <div className="mx-auto max-w-4xl overflow-x-auto px-2 sm:px-4 scrollbar-hide pt-2">
          <div
            className="flex gap-2 pb-2 sm:gap-3 md:gap-4 lg:gap-5"
            style={{ minWidth: "max-content" }}
          >
            {items}
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-4xl grid-cols-4 justify-items-center gap-3 px-2 sm:grid-cols-5 sm:gap-4 sm:px-4 md:grid-cols-6 md:gap-5 lg:grid-cols-7 lg:gap-6 xl:grid-cols-8">
          {items}
        </div>
      )}
    </BentoCard>
  );
}
