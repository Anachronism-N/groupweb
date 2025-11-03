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
        const data = (await res.json()) as CourseReflection[] | { error: string };
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
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 mt-8 text-gray-900 border-b-2 border-blue-200 pb-3" {...props} />
    ),
    h2: (props: any) => (
      <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-5 mt-8 text-gray-800 border-l-4 border-blue-400 pl-4" {...props} />
    ),
    h3: (props: any) => (
      <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-4 mt-6 text-gray-700" {...props} />
    ),
    h4: (props: any) => (
      <h4 className="text-lg md:text-xl font-medium leading-tight mb-3 mt-5 text-gray-700" {...props} />
    ),
    p: (props: any) => (
      <p className="mb-4 text-base leading-relaxed text-gray-600" {...props} />
    ),
    ul: (props: any) => (
      <ul className="mb-6 space-y-2" {...props} />
    ),
    ol: (props: any) => (
      <ol className="mb-6 space-y-2" {...props} />
    ),
    li: ({ children, ...props }: any) => (
      <li
        className="ml-6 pl-4 py-2 rounded-r-lg border-l-3 border-blue-300 bg-gradient-to-r from-blue-50 to-transparent text-gray-700 hover:from-blue-100 transition-colors duration-200"
        {...props}
      >
        <div className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <div className="flex-1">{children}</div>
        </div>
      </li>
    ),
    a: (props: any) => (
      <a
        className="font-medium text-blue-600 hover:text-blue-800 border-b border-blue-300 hover:border-blue-500 transition-all duration-200"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <blockquote className="my-6 rounded-lg border-l-4 border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 text-gray-700 shadow-sm" {...props}>
        <div className="flex items-start">
          <svg className="w-6 h-6 text-indigo-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">{props.children}</div>
        </div>
      </blockquote>
    ),
    code: ({ inline, children, className, ...props }: any) => {
      const content = String(children || "");
      if (inline ?? true) {
        return (
          <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 border border-gray-200" {...props}>
            {content}
          </code>
        );
      }
      return <code className={className} {...props}>{content}</code>;
    },
    pre: ({ children, ...props }: any) => {
      const codeEl = Array.isArray(children) ? children.find((c: any) => c?.type === "code") : children;
      const raw = typeof codeEl?.props?.children === "string" ? codeEl.props.children : Array.isArray(codeEl?.props?.children) ? codeEl.props.children.join("") : "";
      const language = codeEl?.props?.className?.replace('language-', '') || 'text';
      const html = highlight(String(raw));
      
      return (
        <div className="my-6 rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <span className="text-gray-300 text-sm font-mono">{language}</span>
            <button 
              onClick={() => navigator.clipboard?.writeText(raw)}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              复制
            </button>
          </div>
          <pre className="overflow-x-auto bg-[#0f172a] p-4 text-white" {...props}>
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
        </div>
      );
    },
    table: (props: any) => (
      <div className="my-6 overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full border-collapse bg-white">
          {props.children}
        </table>
      </div>
    ),
    thead: (props: any) => (
      <thead className="bg-gray-50" {...props} />
    ),
    th: (props: any) => (
      <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-900" {...props} />
    ),
    td: (props: any) => (
      <td className="border-b border-gray-100 px-4 py-3 text-gray-700" {...props} />
    ),
    hr: (props: any) => (
      <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" {...props} />
    ),
    strong: (props: any) => (
      <strong className="font-semibold text-gray-900" {...props} />
    ),
    em: (props: any) => (
      <em className="italic text-gray-700" {...props} />
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
              Comprehensive insights and key learnings from my web development journey
            </p>
          </div>
        </GridWrapper>

        {/* Main Content */}
        <GridWrapper>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 py-8 lg:flex-row lg:gap-8 lg:py-12">
            {/* 章节列表 */}
            <div className="flex w-full rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur-sm lg:inline-block lg:w-[28%] lg:gap-0 lg:border-l-2 lg:border-l-blue-300 lg:p-6">
              {isLoading && (
                <div className="w-full space-y-2">
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                </div>
              )}

              {!isLoading && items && items.length > 0 && (
                <>
                  {items.map((item, id) => (
                    <div
                      key={`${item.chapter}-${id}`}
                      className={`mb-2 cursor-pointer rounded-lg px-4 py-3 text-center font-bold text-black transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 lg:mb-3 lg:w-full lg:px-6 lg:py-4 lg:text-left ${
                        tab === id &&
                        "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-md lg:border-l-4"
                      }`}
                      onClick={() => handleTabClick(id)}
                    >
                      {item.chapter}
                    </div>
                  ))}
                </>
              )}

              {!isLoading && items && items.length === 0 && (
                <div className="text-sm text-gray-600">
                  暂无章节。请将 Markdown 文件上传到 <code className="font-mono">public/tutorial</code> 目录。
                </div>
              )}
            </div>

            {/* 课程心得详情 */}
            <div className="w-full rounded-xl bg-white shadow-xl lg:w-[72%]">
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
                        <h3 className="mb-2 text-xl font-bold text-black lg:mb-3 lg:text-2xl">
                          {items[tab]?.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs lg:gap-4 lg:text-sm">
                          <span className="rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-700 lg:px-3">
                            📚 {items[tab]?.topic}
                          </span>
                          <span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-700 lg:px-3">
                            📅 {items[tab]?.period}
                          </span>
                        </div>
                      </div>
                      <div className="prose prose-slate max-w-none pb-8 lg:pb-10">
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
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-700">
                      未找到教程内容。请将 Markdown 文件上传到 <code className="font-mono">public/tutorial</code> 目录，支持 <code className="font-mono">.md</code> 或 <code className="font-mono">.mdx</code>。
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </GridWrapper>

        {/* Toolbox Section */}
        <GridWrapper>
          <section className="py-12 lg:py-16 w-full">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-8 lg:mb-12"
              >
                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                  My Development Toolbox
                </h2>
                <p className="mx-auto max-w-2xl text-base text-gray-600 lg:text-lg">
                  Hardware & software tools that power my development workflow and enhance productivity
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
      </div>
    </div>
  );
};

export default Tutorial;