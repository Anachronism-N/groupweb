"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolboxBento } from "../components/ToolboxBento";
import { GridWrapper } from "@/app/components/GridWrapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { highlight } from "sugar-high";

type CourseReflection = {
  title: string;
  chapter: string;
  topic: string;
  period: string;
  reflections: string[];
  content: string;
};

const Tutorial = () => {
  const [tab, setTab] = useState<number>(0);
  const [direction, setDirection] = useState<string>("right");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [items, setItems] = useState<CourseReflection[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleTabClick = (id: number) => {
    if (id > tab) {
      setDirection("right");
    } else {
      setDirection("left");
    }
    setTab(id);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/tutorial");
        if (!res.ok) {
          throw new Error(`加载失败: ${res.status}`);
        }
        const data = (await res.json()) as
          | CourseReflection[]
          | { error: string };
        if (Array.isArray(data)) {
          setItems(data);
          setTab(0);
        } else {
          throw new Error((data as any).error || "未知错误");
        }
      } catch (e) {
        setError((e as Error).message);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const mobileVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === "right" ? 100 : -100,
    }),
    visible: { opacity: 1, x: 0 },
    exit: (direction: string) => ({
      opacity: 0,
      x: direction === "right" ? -100 : 100,
    }),
  };

  const desktopVariants = {
    hidden: (direction: string) => ({
      opacity: 0,
      y: direction === "right" ? 100 : -100,
    }),
    visible: { opacity: 1, y: 0 },
    exit: (direction: string) => ({
      opacity: 0,
      y: direction === "right" ? -100 : 100,
    }),
  };

  const variants = isMobile ? mobileVariants : desktopVariants;

  const mdComponents = {
    h1: (props: any) => (
      <h1
        className="relative mb-8 mt-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl"
        {...props}
      >
        <div className="absolute -bottom-3 left-0 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"></div>
        {props.children}
      </h1>
    ),
    h2: (props: any) => (
      <h2
        className="group relative mb-6 mt-8 text-2xl font-semibold leading-tight text-gray-800 md:text-3xl"
        {...props}
      >
        <div className="absolute -left-6 top-0 h-full w-1 rounded-full bg-gradient-to-b from-blue-400 to-indigo-500 shadow-md transition-all duration-300 group-hover:w-2"></div>
        <div className="relative pl-4">
          {props.children}
          <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500 group-hover:w-full"></div>
        </div>
      </h2>
    ),
    h3: (props: any) => (
      <h3
        className="group relative mb-5 mt-7 cursor-pointer text-xl font-semibold leading-tight text-gray-700 md:text-2xl"
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        <div className="absolute inset-0 -mx-2 -my-1 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 px-2 py-1 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
      </h3>
    ),
    h4: (props: any) => (
      <h4
        className="relative mb-4 mt-6 text-lg font-medium leading-tight text-gray-700 md:text-xl"
        {...props}
      >
        <span className="relative">
          {props.children}
          <div className="absolute -bottom-1 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
        </span>
      </h4>
    ),
    p: (props: any) => (
      <p
        className="mb-6 text-base leading-8 text-gray-600 transition-all duration-300 selection:bg-indigo-100 selection:text-indigo-900 hover:text-gray-700"
        {...props}
      />
    ),
    ul: (props: any) => <ul className="mb-8 ml-2 space-y-3" {...props} />,
    ol: (props: any) => (
      <ol
        className="counter-reset-[list-counter] mb-8 ml-2 space-y-3"
        {...props}
      />
    ),
    li: ({ children, ...props }: any) => (
      <li
        className="group relative ml-6 rounded-lg bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-3 pl-6 pr-4 text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 hover:shadow-md"
        {...props}
      >
        <div className="flex items-start">
          <span className="mr-4 mt-2 inline-flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-110">
            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
          </span>
          <div className="flex-1">{children}</div>
        </div>
        <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-indigo-400 to-purple-500 opacity-60 transition-opacity duration-300 group-hover:opacity-100"></div>
      </li>
    ),
    a: (props: any) => (
      <a
        className="relative -mx-1 -my-0.5 inline-block px-1 py-0.5 font-medium text-indigo-600 transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-indigo-50 before:opacity-0 before:transition-all before:duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500 after:transition-all after:duration-300 hover:text-indigo-800 hover:before:scale-105 hover:before:opacity-100 hover:after:w-full"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        className="border-gradient-to-b group relative my-8 rounded-xl border-l-4 bg-gradient-to-r from-indigo-50 from-indigo-500 via-purple-50 to-pink-50 to-purple-600 p-8 text-gray-700 shadow-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 hover:shadow-2xl"
        {...props}
      >
        <div className="flex items-start">
          <div className="mr-4 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <div className="flex-1 text-lg italic leading-relaxed">
            {props.children}
          </div>
        </div>
        <div className="absolute right-4 top-4 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
          <svg
            className="h-16 w-16 text-indigo-400"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
      </blockquote>
    ),
    code: ({ inline, children, className, ...props }: any) => {
      const content = String(children || "");
      if (inline ?? true) {
        return (
          <code
            className="rounded-lg border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 font-mono text-sm text-gray-800 shadow-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-md"
            {...props}
          >
            {content}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {content}
        </code>
      );
    },
    pre: ({ children, ...props }: any) => {
      const codeEl = Array.isArray(children)
        ? children.find((c: any) => c?.type === "code")
        : children;
      const raw =
        typeof codeEl?.props?.children === "string"
          ? codeEl.props.children
          : Array.isArray(codeEl?.props?.children)
            ? codeEl.props.children.join("")
            : "";
      const language =
        codeEl?.props?.className?.replace("language-", "") || "text";
      const html = highlight(String(raw));

      return (
        <div className="hover:shadow-3xl group my-8 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500 shadow-sm"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-sm"></div>
                <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm"></div>
              </div>
              <span className="font-mono text-sm font-medium text-gray-300">
                {language}
              </span>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(raw)}
              className="rounded-lg bg-gray-700/80 px-3 py-1.5 text-sm text-gray-300 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-gray-600 hover:text-white group-hover:opacity-100"
            >
              复制代码
            </button>
          </div>
          <pre
            className="overflow-x-auto bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-sm leading-relaxed text-white"
            {...props}
          >
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
        </div>
      );
    },
    table: (props: any) => (
      <div className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <table className="min-w-full border-collapse bg-white">
          {props.children}
        </table>
      </div>
    ),
    thead: (props: any) => (
      <thead
        className="bg-gradient-to-r from-indigo-50 to-purple-50"
        {...props}
      />
    ),
    th: (props: any) => (
      <th
        className="border-b-2 border-indigo-200 px-6 py-4 text-left font-semibold text-gray-900 first:rounded-tl-xl last:rounded-tr-xl"
        {...props}
      />
    ),
    td: (props: any) => (
      <td
        className="border-b border-gray-100 px-6 py-4 text-gray-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50"
        {...props}
      />
    ),
    hr: (props: any) => (
      <hr
        className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-60"
        {...props}
      />
    ),
    strong: (props: any) => (
      <strong
        className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-semibold text-gray-900 text-transparent"
        {...props}
      />
    ),
    em: (props: any) => (
      <em className="font-medium italic text-gray-700" {...props} />
    ),
  } as any;

  return (
    <div className="relative">
      <div className="relative space-y-16">
        {/* Header */}
        <GridWrapper>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
              Course Learning Reflections
            </h1>
            <p className="mt-4 text-sm/7 text-text-secondary md:text-base">
              Comprehensive insights and key learnings from my web development
              journey
            </p>
          </div>
        </GridWrapper>

        {/* Toolbox Section */}
        <GridWrapper>
          <section className="w-full py-12 lg:py-16">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 text-center lg:mb-12"
              >
                <h2 className="text-balance text-3xl font-medium leading-tight tracking-tighter text-text-primary md:text-4xl md:leading-[48px]">
                  My Development Toolbox
                </h2>
                <p className="mt-3 text-sm/6 text-text-secondary md:text-base">
                  Hardware & software tools that power my development workflow
                  and enhance productivity
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ToolboxBento />
              </motion.div>
            </div>
          </section>
        </GridWrapper>

        {/* Main Content */}
        <GridWrapper>
          <div className="mx-auto mb-8 mt-8 max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-medium leading-tight tracking-tighter text-text-primary md:text-4xl md:leading-[48px]">
              Tutorial Chapters
            </h2>
            <p className="mt-3 text-sm/6 text-text-secondary md:text-base">
              Navigate through different learning modules and explore detailed
              content
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 py-8 lg:py-12">
            {/* 章节列表 - 修改为横向布局 */}
            <div className="mx-auto flex w-full max-w-5xl overflow-x-auto rounded-xl border-b-2 border-b-blue-300 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
              {isLoading && (
                <div className="w-full space-y-2">
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                </div>
              )}

              {!isLoading && items && items.length > 0 && (
                <div className="flex min-w-max gap-4">
                  {items.map((item, id) => (
                    <div
                      key={`${item.chapter}-${id}`}
                      className={`chinese-title cursor-pointer whitespace-nowrap rounded-lg px-6 py-3 font-bold text-black transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                        tab === id &&
                        "border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-md"
                      }`}
                      onClick={() => handleTabClick(id)}
                    >
                      {item.chapter}
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && items && items.length === 0 && (
                <div className="chinese-body text-sm text-gray-600">
                  暂无章节。请将 Markdown 文件上传到{" "}
                  <code className="font-mono">public/tutorial</code> 目录。
                </div>
              )}
            </div>

            {/* 课程心得详情 */}
            <div className="mx-auto w-full max-w-5xl rounded-xl bg-white shadow-xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={tab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  custom={direction}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="p-6 lg:p-8"
                >
                  {isLoading && (
                    <div className="space-y-3">
                      <div className="h-10 w-2/3 animate-pulse rounded bg-gray-200" />
                      <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
                      <div className="space-y-2 pt-4">
                        <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
                      </div>
                    </div>
                  )}

                  {!isLoading && items && items.length > 0 && (
                    <>
                      <div className="mb-4 rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 lg:mb-6 lg:p-6">
                        <h3 className="chinese-title mb-2 text-xl font-bold text-black lg:mb-3 lg:text-2xl">
                          {items[tab]?.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs lg:gap-4 lg:text-sm">
                          <span className="chinese-body rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-700 lg:px-3">
                            📚 {items[tab]?.topic}
                          </span>
                          <span className="chinese-body rounded-full bg-green-100 px-2 py-1 font-medium text-green-700 lg:px-3">
                            📅 {items[tab]?.period}
                          </span>
                        </div>
                      </div>
                      <div className="prose prose-slate chinese-body max-w-none pb-8 lg:pb-10">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={mdComponents}
                        >
                          {items[tab]?.content || ""}
                        </ReactMarkdown>
                      </div>
                    </>
                  )}

                  {!isLoading && items && items.length === 0 && (
                    <div className="chinese-body rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-700">
                      未找到教程内容。请将 Markdown 文件上传到{" "}
                      <code className="font-mono">public/tutorial</code>{" "}
                      目录，支持 <code className="font-mono">.md</code> 或{" "}
                      <code className="font-mono">.mdx</code>。
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </GridWrapper>
      </div>
    </div>
  );
};

export default Tutorial;
