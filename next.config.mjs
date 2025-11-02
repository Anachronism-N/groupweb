import createMDX from "@next/mdx";
import rehypeRaw from "rehype-raw";

// --- Velite Build Logic (保持不变) ---
const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const config = {
  // 告诉 Next.js 我们要处理 .mdx 文件
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      {
        source: "/archives/v1",
        destination: "https://wizardly-payne-b3707b.netlify.app/",
        permanent: true,
      },
      {
        source: "/archives/v2",
        destination: "https://braydoncoyer-2hvriu779-braydon-coyer.vercel.app/",
        permanent: true,
      },
      {
        source: "/archives/v3",
        destination:
          "https://braydoncoyer-dev-git-v3-braydon-coyer.vercel.app/",
        permanent: true,
      },
      {
        source: "/archives/v4",
        destination: "https://braydoncoyer.framer.website/",
        permanent: true,
      },
      {
        source: "/blog/how-to-enable-preview-mode-in-next.js-for-your-cms",
        destination:
          "https://braydoncoyer.dev/blog/how-to-enable-preview-mode-in-next-js-for-your-cms",
        permanent: true,
      },
      {
        source:
          "/blog/setting-yourself-up-for-success-how-i-define-mvp-(minimal-viable-product)",
        destination: "https://braydoncoyer.dev/blog/how-i-define-mvp",
        permanent: true,
      },
    ];
  },
};

// --- MDX 配置 (这是新增的核心部分) ---
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [], // 如果你有 remark 插件，可以放在这里
    rehypePlugins: [
      // 这里是解决问题的关键配置
      [
        rehypeRaw,
        {
          passThrough: ["mdxjsEsm", "mdxFlowExpression", "mdxTextExpression"],
        },
      ],
    ],
  },
});

// --- 导出被 MDX 包装后的配置 ---
export default withMDX(config);
