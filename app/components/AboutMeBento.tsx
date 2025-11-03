import { getTimeOfDayGreeting } from "../lib/utils";
import { BentoCard } from "./BentoCard";

export function AboutMeBento({ linkTo }: { linkTo?: string }) {
  const timeOfDayGreeting = getTimeOfDayGreeting();

  return (
    <BentoCard height="h-[275px] md:h-[304px] lg:h-[320px]" linkTo={linkTo}>
      <div className="group flex h-full items-center justify-between">
        <div className="text-balance w-2/5 pr-4 md:w-1/2 md:pr-6">
          <h2 className="mb-4 text-base font-medium">Learn more about our team</h2>
          <p className="mb-2 text-balance text-text-secondary">
            {timeOfDayGreeting} <br />
            We&apos;re LLLN, a creative team exploring AI, storytelling, and interactive design.We believe creativity should be redefined in the age of intelligence, where humans and AI co-create new narratives.
          </p>
        </div>
        <div className="relative flex-shrink-0">
          <div className="group inline-block text-center">
            <div
              className="rounded-[20px] border border-border-primary p-2 transition-all duration-500 ease-out group-hover:border-indigo-400"
              style={{ width: 188, height: 278 }}
            >
              <div
                className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
                style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
              ></div>
            </div>
          </div>
          <img
            className="absolute -top-1 left-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow transition-all duration-500 group-hover:rotate-[4deg] group-hover:scale-105"
            src="/Me.png"
            alt="Our team"
          />
        </div>
      </div>
    </BentoCard>
  );
}
