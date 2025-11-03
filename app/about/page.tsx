import { NewsletterSignUp } from "@/app/components/NewsletterSignUp";
import { HorizontalLine } from "@/app/components/HorizontalLine";
import { getTimeOfDayGreeting } from "app/lib/utils";
import React from "react";
import { CurrentlyPlayingBento } from "@/app/components/CurrentlyPlayingBento";
import { ConnectionsBento } from "@/app/components/ConnectionsBento";
import { ScrapbookBento } from "@/app/components/ScrapbookBento";
import { ShadowBox } from "@/app/components/ShadowBox";
import { Resume } from "app/components/Resume";
import { StatsBento } from "@/app/components/StatsBento";
import { CurrentlyReadingBento } from "@/app/components/CurrentlyReadingBento";
import { GridWrapper } from "@/app/components/GridWrapper";
import { AboutTrackPattern } from "@/app/components/AboutTrackPattern";
import { Photo } from "@/app/components/Photo";

export default function AboutPage() {
  const timeOfDayGreeting = getTimeOfDayGreeting();

  return (
    <section
      className="relative min-h-screen"
      style={{
        backgroundImage: "url(/bg/bg_LYX.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mt-14 min-h-screen bg-black/5 dark:bg-black/20">
        <title>About | Braydon Coyer</title>
        <div className="relative space-y-10 md:space-y-16">
          {/* Title */}
          <GridWrapper className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around lg:px-24">
              <div className="order-2 mx-auto max-w-lg lg:order-1 lg:m-0 lg:max-w-3xl lg:pr-12">
                <div className="text-center text-sm font-medium text-indigo-600 lg:text-left">
                  <span>{timeOfDayGreeting}</span>
                </div>
                <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-left lg:text-6xl lg:leading-[64px]">
                  I&apos;m Yixuan, a creative designer and developer.
                </h1>
              </div>
              <div className="order-1 my-12 flex-shrink-0 lg:order-2 lg:my-0">
                <div className="relative mx-auto w-full max-w-[400px]">
                  <div className="relative grid grid-cols-3">
                    <div className="relative z-20 -translate-y-2">
                      <Photo
                        width={140}
                        height={140}
                        src="/braydon_speaking_photo.jpeg"
                        alt="Braydon Coyer"
                        direction="left"
                      />
                    </div>
                    <div className="relative z-30">
                      <Photo
                        width={140}
                        height={140}
                        src="/braydon_headshot_1.jpeg"
                        alt="Braydon Coyer"
                        direction="right"
                      />
                    </div>
                    <div className="relative z-20 translate-y-4">
                      <Photo
                        width={140}
                        height={140}
                        src="/braydon_headshot_3.jpg"
                        alt="Braydon Coyer"
                        direction="left"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GridWrapper>

          <span className="absolute left-1/2 top-40 -translate-y-1/2 translate-x-1/2">
            <HorizontalLine />
          </span>

          {/* About */}
          <div className="relative space-y-8 text-center">
            <div className="space-y-4">
              <GridWrapper>
                <div className="text-center text-sm font-medium text-indigo-600">
                  <span>About</span>
                </div>
              </GridWrapper>
              <GridWrapper>
                <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Here&apos;s a quick intro about my hackathon
                </h2>
              </GridWrapper>
            </div>
            <div className="relative h-fit w-full overflow-hidden">
              <div className="absolute left-0 top-0 w-full md:left-4 lg:left-[355px] xl:left-[455px]">
                <AboutTrackPattern />
              </div>

              {/* Section 1 */}
              <div className="grid grid-cols-1 gap-8 py-12 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pb-20 xl:py-32">
                <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/knights_kwest.jpeg"
                        alt="A headshot"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    BACKGROUND
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    What problem is this project trying to solve? AI-based
                    educational tools for children are in high demand, but most
                    lack interactivity and emotional engagement. This project
                    introduces an “AI Learning Companion” that turns AI from a
                    passive tool into an engaging learning partner. What kind of
                    users would need this project? (1) Parents seeking
                    personalized and effective learning experiences (2) Children
                    who enjoy interactive and game-based learning
                  </p>
                </div>
                <div className="hidden lg:order-1 lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/knights_kwest.jpeg"
                      alt="A headshot"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="grid grid-cols-1 gap-8 py-24 lg:grid-cols-2 lg:items-center lg:justify-between lg:pl-12">
                <div className="flex flex-col items-center text-left lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                        src="/c3_speaker_head.png"
                        alt="Speaking at C3 Conf!"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    IDEA
                  </h2>

                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    What features does this project need? 🧠 Personalized
                    Learning: Uses NLP to track progress and interests,
                    adjusting content dynamically. 🧸 Embodied Interaction:
                    Enables two-way expression, movement, and voice interaction.
                    🎮 Task Incentives: Completing tasks “feeds” or upgrades the
                    pet, combining education with companionship. 📶
                    Multi-Platform Support: Seamlessly connects mobile devices
                    and smart hardware.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/braydon_headshot_3.jpg"
                      alt="Speaking at C3 Conf!"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="grid grid-cols-1 gap-8 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between xl:py-24">
                <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/braydon_and_pj.jpeg"
                        alt="A headshot"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    IMPLEMENTATION
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    Design and prototyping used Figma for UI and Rhino for 3D
                    modeling, with 3D printing for the physical prototype. The
                    system runs on an ESP32-C3 with DS-S002M servos for
                    real-time movement. Powered by Dify + RAG, it enables
                    adaptive, context-aware interaction, creating an intelligent
                    and responsive learning companion.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/braydon_and_pj.jpeg"
                      alt="A headshot"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pl-12 xl:py-24">
                <div className="flex flex-col items-center text-left lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                        src="/braydon_speaking_photo.jpeg"
                        alt="A headshot"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    🌈 RESULT
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                    🎬 Prototype Demo The prototype was built on ESP32-S3 with
                    DS-S002M servos, enabling real-time motion and emotional
                    feedback. Children interact with the AI pet through voice
                    and learning tasks. 🎨 Modeling & Structure Designed in
                    Rhino and produced via 3D printing, ensuring stable servo
                    integration and smooth motion. 🧠 AI & UI Design Interface
                    created with Figma and z.ai; AI system built on Dify using
                    RAG for contextual dialogue and personalized responses.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/braydon_speaking_photo.jpeg"
                      alt="A headshot"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="relative space-y-8 text-center">
            <div className="space-y-4">
              <GridWrapper>
                <div className="text-center text-sm font-medium text-indigo-600">
                  <span>Experience</span>
                </div>
              </GridWrapper>
              <GridWrapper>
                <h2 className="mx-auto max-w-lg text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  My work history and achievements timeline.
                </h2>
              </GridWrapper>
            </div>
          </div>
          <div className="space-y-16">
            <GridWrapper>
              <Resume />
            </GridWrapper>
            {/* <div className="flex justify-center">
            <Button variant="secondary">Download Resume</Button>
          </div> */}
          </div>

          <section className="relative space-y-16">
            <div className="space-y-4">
              <GridWrapper>
                <div className="text-center text-sm font-medium text-indigo-600">
                  <span>More</span>
                </div>
              </GridWrapper>

              <GridWrapper>
                <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary">
                  Here&apos;s what sets me apart and makes me unique
                </h2>
              </GridWrapper>
            </div>

            {/* About Grid */}
            <GridWrapper>
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
                <div className="lg:col-span-3 lg:row-span-6">
                  <CurrentlyPlayingBento />
                </div>
                <div className="hidden lg:col-span-7 lg:row-span-5 lg:block">
                  <ScrapbookBento />
                </div>
                <div className="hidden lg:col-span-2 lg:col-start-11 lg:row-span-10 lg:block lg:min-h-[50px]">
                  <CurrentlyReadingBento />
                </div>
                <div className="lg:col-span-7 lg:row-span-8">
                  <ConnectionsBento linkTo="/connections" />
                </div>

                <div className="lg:col-span-3 lg:row-span-4">
                  <StatsBento />
                </div>
              </div>
            </GridWrapper>
          </section>

          {/* Newsletter */}
          <NewsletterSignUp />
        </div>
      </div>
    </section>
  );
}
