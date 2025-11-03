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
        className="mb-6 mt-8 border-b-2 border-blue-200 pb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
        {...props}
      />
    ),
    h2: (props: any) => (
      <h2
        className="mb-5 mt-8 border-l-4 border-blue-400 pl-4 text-2xl font-semibold leading-tight text-gray-800 md:text-3xl"
        {...props}
      />
    ),
    h3: (props: any) => (
      <h3
        className="mb-4 mt-6 text-xl font-semibold leading-tight text-gray-700 md:text-2xl"
        {...props}
      />
    ),
    h4: (props: any) => (
      <h4
        className="mb-3 mt-5 text-lg font-medium leading-tight text-gray-700 md:text-xl"
        {...props}
      />
    ),
    p: (props: any) => (
      <p className="mb-4 text-base leading-relaxed text-gray-600" {...props} />
    ),
    ul: (props: any) => <ul className="mb-6 space-y-2" {...props} />,
    ol: (props: any) => <ol className="mb-6 space-y-2" {...props} />,
    li: ({ children, ...props }: any) => (
      <li
        className="border-l-3 ml-6 rounded-r-lg border-blue-300 bg-gradient-to-r from-blue-50 to-transparent py-2 pl-4 text-gray-700 transition-colors duration-200 hover:from-blue-100"
        {...props}
      >
        <div className="flex items-start">
          <span className="mr-3 mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></span>
          <div className="flex-1">{children}</div>
        </div>
      </li>
    ),
    a: (props: any) => (
      <a
        className="border-b border-blue-300 font-medium text-blue-600 transition-all duration-200 hover:border-blue-500 hover:text-blue-800"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        className="my-6 rounded-lg border-l-4 border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 text-gray-700 shadow-sm"
        {...props}
      >
        <div className="flex items-start">
          <svg
            className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-indigo-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">{props.children}</div>
        </div>
      </blockquote>
    ),
    code: ({ inline, children, className, ...props }: any) => {
      const content = String(children || "");
      if (inline ?? true) {
        return (
          <code
            className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800"
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
        <div className="my-6 overflow-hidden rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
            <span className="font-mono text-sm text-gray-300">{language}</span>
            <button
              onClick={() => navigator.clipboard?.writeText(raw)}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              复制
            </button>
          </div>
          <pre
            className="overflow-x-auto bg-[#0f172a] p-4 text-white"
            {...props}
          >
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
        </div>
      );
    },
    table: (props: any) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full border-collapse bg-white">
          {props.children}
        </table>
      </div>
    ),
    thead: (props: any) => <thead className="bg-gray-50" {...props} />,
    th: (props: any) => (
      <th
        className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-900"
        {...props}
      />
    ),
    td: (props: any) => (
      <td
        className="border-b border-gray-100 px-4 py-3 text-gray-700"
        {...props}
      />
    ),
    hr: (props: any) => (
      <hr
        className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        {...props}
      />
    ),
    strong: (props: any) => (
      <strong className="font-semibold text-gray-900" {...props} />
    ),
    em: (props: any) => <em className="italic text-gray-700" {...props} />,
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
                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                  My Development Toolbox
                </h2>
                <p className="mx-auto max-w-2xl text-base text-gray-600 lg:text-lg">
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
