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
          <div
            className={`relative rounded-[16px] border border-border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-gray-400 ${
              isHorizontalScroll
                ? "h-16 w-16 p-3"
                : "h-18 w-18 md:h-22 md:w-22 p-4 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            }`}
          >
            <div
              className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] transition-all duration-200 hover:bg-white"
              style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
            >
              <Image
                className={`transition-all duration-200 hover:scale-105 ${
                  isHorizontalScroll
                    ? "h-7 w-7"
                    : "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                }`}
                alt={item.title}
                src={item.imgSrc}
                width={32}
                height={32}
              />
            </div>
          </div>

          {/* 工具名称 */}
          <span
            className={`truncate text-center font-medium leading-tight text-gray-600 ${
              isHorizontalScroll
                ? "max-w-[64px] text-xs"
                : "max-w-[72px] text-sm sm:max-w-[80px] md:max-w-[88px]"
            }`}
          >
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
        <div className="scrollbar-hide mx-auto max-w-4xl overflow-x-auto px-2 pt-2 sm:px-4">
          <div
            className="flex gap-4 pb-2 sm:gap-5 md:gap-6"
            style={{ minWidth: "max-content" }}
          >
            {items}
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-4xl grid-cols-2 justify-items-center gap-3 px-2 sm:grid-cols-3 sm:gap-4 sm:px-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6 2xl:grid-cols-7">
          {items}
        </div>
      )}
    </BentoCard>
  );
}
