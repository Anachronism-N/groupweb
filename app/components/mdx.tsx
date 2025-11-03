"use client";
import React, { useState } from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { highlight } from "sugar-high";
import Link from "next/link";

import { BgGradient } from "./BgGradient";

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
  [key: string]: any;
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 text-left text-sm font-semibold text-gray-900 first:rounded-tl-lg last:rounded-tr-lg"
    >
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr
      key={index}
      className="transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md"
    >
      {row.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700 transition-all duration-200"
        >
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">{rows}</tbody>
      </table>
    </div>
  );
}

function CustomLink(props) {
  let href = props.href;

  const styles = `font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300 relative inline-block
    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500 
    after:transition-all after:duration-300 hover:after:w-full
    before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-indigo-50 before:opacity-0 before:transition-all before:duration-300 
    hover:before:opacity-100 hover:before:scale-105 px-1 py-0.5 -mx-1 -my-0.5`;

  if (href.startsWith("/")) {
    return (
      <Link className={styles} href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a className={styles} {...props} />;
  }

  return (
    <a
      className={styles}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function RoundedImage(props) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      className="drama-shadow rounded-xl"
      width={800}
      height={600}
    />
  );
}

function Callout(props) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Pre = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  const childrenArray = React.Children.toArray(children);
  const code = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === "code",
  ) as React.ReactElement;

  const className = code?.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang ?? "";
  const filename = matches?.groups?.filename ?? ""; // Extract filename if present

  return (
    <pre {...props}>
      <div className="code-frame">
        <div className="code-frame-content">
          <div className="frame-controls">
            <div className="frame-control" />
            <div className="frame-control" />
            <div className="frame-control" />
          </div>
          {filename && <div className="code-frame-filename">{filename}</div>}
        </div>
      </div>
      <div className="code-container">{code}</div>
    </pre>
  );
};

function Code({ children, ...props }) {
  const codeHTML = highlight(children);
  const isMultiLine = children.includes("\n");
  const [isCopied, setIsCopied] = useState(false);

  const className = props.className || "";
  const matches = className.match(/language-(?<lang>.*?)(:(?<filename>.*))?$/);
  const language = matches?.groups?.lang ?? "";
  const filename = matches?.groups?.filename ?? "";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(children)
      .then(() => {
        console.log("Code copied to clipboard");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
      });
  };

  if (!isMultiLine) {
    return (
      <code
        className="rounded-lg border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 font-mono text-sm text-gray-800 shadow-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-md"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  }

  return (
    <div className="group my-8 w-full max-w-[805px]">
      <div className="code-frame hover:shadow-3xl relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 font-mono shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <div className="code-frame-content">
          <div className="frame-controls flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="frame-control h-3 w-3 rounded-full bg-red-500 shadow-sm" />
              <div className="frame-control h-3 w-3 rounded-full bg-yellow-500 shadow-sm" />
              <div className="frame-control h-3 w-3 rounded-full bg-green-500 shadow-sm" />
            </div>
            {filename && (
              <span className="code-frame-filename text-sm font-medium text-gray-300">
                {filename}
              </span>
            )}
            {language && (
              <div className="rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-400">
                {language}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-3 z-10 rounded-lg bg-gray-700/80 p-2 text-gray-300 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-gray-600 hover:text-white group-hover:opacity-100"
          title="复制代码"
        >
          {isCopied ? (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.25 16.25L9.6397 16.6859C9.80873 16.9226 10.0993 17.0402 10.3854 16.9877C10.6714 16.9352 10.9013 16.7221 10.9753 16.4409L10.25 16.25ZM16.7147 8.33866C17.0398 8.082 17.0953 7.61038 16.8387 7.28527C16.582 6.96016 16.1104 6.90467 15.7853 7.16134L16.7147 8.33866ZM8.3603 12.3141C8.11954 11.977 7.65113 11.8989 7.31407 12.1397C6.97701 12.3805 6.89894 12.8489 7.1397 13.1859L8.3603 12.3141ZM10.9753 16.4409C11.5574 14.2291 12.971 12.2079 14.2825 10.7134C14.9328 9.97242 15.5456 9.37472 15.9949 8.96321C16.2192 8.7577 16.4021 8.59926 16.5275 8.49327C16.5902 8.44029 16.6385 8.40046 16.6704 8.37446C16.6863 8.36146 16.6982 8.35192 16.7056 8.34593C16.7094 8.34293 16.712 8.34082 16.7136 8.3396C16.7143 8.339 16.7148 8.33861 16.715 8.33846C16.7151 8.33838 16.7151 8.33835 16.7151 8.33839C16.7151 8.33841 16.715 8.33847 16.715 8.33848C16.7149 8.33857 16.7147 8.33866 16.25 7.75C15.7853 7.16134 15.7851 7.16146 15.7849 7.1616C15.7848 7.16167 15.7847 7.16182 15.7845 7.16195C15.7842 7.16222 15.7838 7.16254 15.7833 7.16292C15.7823 7.16367 15.7811 7.16466 15.7796 7.16587C15.7765 7.1683 15.7723 7.17164 15.767 7.17588C15.7565 7.18436 15.7415 7.19646 15.7223 7.21209C15.684 7.24333 15.629 7.28871 15.5594 7.34755C15.4202 7.46519 15.2222 7.63683 14.9817 7.8571C14.5013 8.29716 13.8485 8.93383 13.155 9.72406C11.779 11.2921 10.1926 13.5209 9.52469 16.0591L10.9753 16.4409ZM7.1397 13.1859L9.6397 16.6859L10.8603 15.8141L8.3603 12.3141L7.1397 13.1859Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"
              />
              <rect
                width="10.5"
                height="10.5"
                x="8.75"
                y="8.75"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                rx="2"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="code-container relative rounded-b-xl bg-gradient-to-br from-slate-900 to-slate-800">
        <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-gray-100">
          <code
            className="mb-12"
            dangerouslySetInnerHTML={{ __html: codeHTML }}
            {...props}
          />
        </pre>
      </div>
    </div>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  // eslint-disable-next-line react/display-name
  return ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: `font-semibold tracking-tight text-text-primary transition-all duration-300 hover:text-indigo-600 group relative ${
          level === 1
            ? "mb-8 mt-8 scroll-m-20 text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent"
            : level === 2
              ? "mb-6 mt-10 scroll-m-20 text-3xl md:text-4xl border-l-4 border-indigo-500 pl-4 bg-gradient-to-r from-indigo-50 to-purple-50 py-3 rounded-r-lg shadow-sm"
              : level === 3
                ? "mb-5 mt-8 scroll-m-20 text-2xl md:text-3xl text-gray-800 border-b-2 border-gradient-to-r from-indigo-200 to-purple-200 pb-2"
                : level === 4
                  ? "mb-4 mt-6 scroll-m-20 text-xl md:text-2xl text-gray-700 relative before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-400 before:to-purple-400 before:rounded-full pl-4"
                  : level === 5
                    ? "mb-3 mt-5 scroll-m-20 text-lg md:text-xl text-gray-600"
                    : "mb-2 mt-4 scroll-m-20 text-base md:text-lg text-gray-500"
        }`,
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className:
            "anchor opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -left-6 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600",
        }),
      ],
      children,
    );
  };
}

function paragraph({ children }) {
  // Check if children contains any block-level elements
  const hasBlockElements = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      typeof child.type === "string" &&
      /^(div|p|ul|ol|h[1-6])$/i.test(child.type),
  );

  // If there are block-level elements, render without wrapping p tag
  if (hasBlockElements) {
    return <>{children}</>;
  }

  // Otherwise, wrap in a p tag with enhanced styling
  return (
    <p className="mb-6 text-base leading-8 text-text-secondary transition-all duration-300 selection:bg-indigo-100 selection:text-indigo-900 hover:text-gray-700">
      {children}
    </p>
  );
}

function FullWidthCallout({ children, type }) {
  const hasLinks = React.Children.toArray(children).some((child) => {
    if (
      typeof child === "string" &&
      child.includes("[") &&
      child.includes("](")
    ) {
      return true;
    }

    if (React.isValidElement(child) && child.props?.children) {
      return React.Children.toArray(child.props.children).some(
        (grandchild) =>
          React.isValidElement(grandchild) && grandchild.type === CustomLink,
      );
    }

    return false;
  });

  const processedChildren = hasLinks
    ? React.Children.map(children, (child) => {
        if (
          typeof child === "string" &&
          child.includes("[") &&
          child.includes("](")
        ) {
          const segments: (string | JSX.Element)[] = [];
          let currentIndex = 0;
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          let match;

          while ((match = linkRegex.exec(child)) !== null) {
            if (match.index > currentIndex) {
              segments.push(child.substring(currentIndex, match.index));
            }

            segments.push(
              <CustomLink key={match.index} href={match[2]}>
                {match[1]}
              </CustomLink>,
            );

            currentIndex = match.index + match[0].length;
          }

          if (currentIndex < child.length) {
            segments.push(child.substring(currentIndex));
          }

          return segments;
        }

        return child;
      })
    : children;

  const badges = {
    idea: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      ring: "ring-yellow-600/20",
      label: "Idea",
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      ring: "ring-blue-700/10",
      label: "Info",
    },
    thought: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      ring: "ring-indigo-700/10",
      label: "Thought",
    },
    warning: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      ring: "ring-rose-700/10",
      label: "Warning",
    },
  };

  const badge = badges[type];

  return (
    <blockquote className="relative -mx-3 mb-8 w-[100vw] overflow-clip border-y border-border-primary px-6 py-8 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px] md:col-start-1 md:col-end-4 md:mx-0 md:w-full md:px-0">
      <span className="absolute -top-1/2 left-1/2 -z-10 -translate-x-1/2 opacity-50">
        <BgGradient />
      </span>
      <div className="blog-container drama-shadow mx-auto rounded-md bg-bg-primary p-6">
        {badge && (
          <span
            className={`mb-3.5 inline-flex items-center rounded-full ${badge.bg} px-4 py-1 text-xs font-medium uppercase ${badge.text} ring-1 ring-inset ${badge.ring}`}
          >
            {badge.label}
          </span>
        )}
        <div className="text-text-secondary">{processedChildren}</div>
      </div>
    </blockquote>
  );
}

function IdeaQuote({ children }) {
  return <FullWidthCallout type="idea">{children}</FullWidthCallout>;
}

function WarningQuote({ children }) {
  return <FullWidthCallout type="warning">{children}</FullWidthCallout>;
}

function InfoQuote({ children }) {
  return <FullWidthCallout type="info">{children}</FullWidthCallout>;
}

function ThoughtQuote({ children }) {
  return <FullWidthCallout type="thought">{children}</FullWidthCallout>;
}

// Enhanced List Components
function UnorderedList({ children }) {
  return <ul className="my-6 ml-6 list-none space-y-2">{children}</ul>;
}

function OrderedList({ children }) {
  return (
    <ol className="counter-reset-[list-counter] my-6 ml-6 list-none space-y-2">
      {children}
    </ol>
  );
}

function ListItem({ children }) {
  return (
    <li className="relative pl-8 leading-7 text-text-secondary transition-all duration-200 hover:text-gray-700">
      <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-md">
        •
      </span>
      {children}
    </li>
  );
}

// Enhanced Blockquote
function Blockquote({ children }) {
  return (
    <blockquote className="border-gradient-to-b my-8 rounded-r-lg border-l-4 bg-gradient-to-r from-indigo-50 from-indigo-500 to-purple-50 to-purple-600 py-4 pl-6 pr-4 italic text-gray-700 shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 hover:shadow-xl">
      <div className="relative">
        <svg
          className="absolute -left-2 -top-2 h-8 w-8 text-indigo-400 opacity-50"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        {children}
      </div>
    </blockquote>
  );
}

const sharedComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  img: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  Ideaquote: IdeaQuote,
  Infoquote: InfoQuote,
  Thoughtquote: ThoughtQuote,
  Warningquote: WarningQuote,
  code: Code,
  Table,
  p: paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  blockquote: Blockquote,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export const MDXContent = ({ code, components, ...props }: MDXProps) => {
  const Component = useMDXComponent(code);
  return (
    <Component components={{ ...sharedComponents, ...components }} {...props} />
  );
};
