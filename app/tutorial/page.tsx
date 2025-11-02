"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 工作经历数据
const chapters = [
  "Chapter 1",
  "Chapter 2", 
  "Chapter 3",
  "Chapter 4",
  "Chapter 5",
  "Chapter 6",
  "Chapter 7",
];

const courseReflections = [
  {
    title: "Introduction to Web Development Fundamentals",
    chapter: "Chapter 1",
    topic: "HTML, CSS & JavaScript Basics",
    period: "Week 1-2",
    reflections: [
      "Gained comprehensive understanding of semantic HTML structure and its importance in creating accessible web content that serves all users effectively. This foundational knowledge has proven invaluable in understanding how web browsers interpret and render content, and how screen readers and other assistive technologies navigate through properly structured markup.",
      "Mastered CSS fundamentals including flexbox and grid layouts, enabling me to create responsive designs that adapt seamlessly across different device sizes. The journey from basic styling to advanced layout techniques opened up new possibilities for creating visually appealing and functional user interfaces.",
      "Developed proficiency in JavaScript ES6+ features, understanding how modern syntax improves code readability and maintainability in web applications. Features like arrow functions, destructuring, template literals, and async/await have transformed how I approach problem-solving in web development.",
      "Learned the significance of web standards and best practices, establishing a solid foundation for professional web development career. Understanding the importance of following W3C guidelines and industry conventions has shaped my approach to writing clean, maintainable code.",
      "Explored the evolution of web technologies from static HTML pages to dynamic, interactive applications. This historical perspective provided context for understanding why certain technologies emerged and how they solve specific problems in web development.",
      "Practiced building responsive layouts using CSS Grid and Flexbox, learning when to use each layout method for optimal results. The hands-on experience with different layout techniques helped solidify theoretical knowledge through practical application.",
      "Implemented various CSS animations and transitions to enhance user experience without overwhelming the interface. Learning to balance visual appeal with performance considerations became a key skill in creating polished web applications.",
      "Studied browser compatibility issues and learned strategies for ensuring consistent behavior across different browsers and devices. This knowledge proved essential for creating robust applications that work reliably for all users.",
      "Developed debugging skills using browser developer tools, learning to inspect elements, monitor network requests, and analyze performance metrics. These tools became indispensable for troubleshooting issues and optimizing application performance.",
      "Explored accessibility principles and implemented ARIA attributes to ensure web content is usable by people with disabilities. This focus on inclusive design has become a core principle in all my development work.",
      "Learned about progressive enhancement and graceful degradation strategies to ensure applications remain functional even when certain features are not supported. This approach helps create more resilient web applications.",
      "Practiced version control using Git, understanding the importance of tracking changes and collaborating effectively with other developers. Version control became an essential part of my development workflow.",
      "Studied performance optimization techniques including image compression, minification, and efficient CSS selectors. These optimizations significantly improved page load times and user experience.",
      "Implemented form validation using both HTML5 attributes and custom JavaScript, learning to provide clear feedback to users while maintaining security. Proper form handling became crucial for creating user-friendly interfaces.",
      "Explored CSS preprocessors like Sass and learned how they can improve development workflow through variables, mixins, and nested rules. These tools enhanced productivity and code organization.",
      "Studied the box model in detail, understanding how padding, borders, and margins affect element sizing and layout. This fundamental concept became the foundation for all CSS layout work.",
      "Learned about CSS specificity and the cascade, understanding how styles are applied and how to write maintainable CSS that doesn't conflict with other styles. This knowledge prevented many common styling issues.",
      "Practiced creating mobile-first responsive designs, starting with mobile layouts and progressively enhancing for larger screens. This approach resulted in better performance and user experience across all devices.",
      "Implemented CSS custom properties (variables) to create more maintainable and themeable stylesheets. This modern CSS feature greatly improved code reusability and consistency.",
      "Explored modern JavaScript features like modules, classes, and promises, understanding how they contribute to better code organization and asynchronous programming. These concepts became essential for building complex applications.",
      "Learned about the Document Object Model (DOM) and how to manipulate it effectively using JavaScript. Understanding DOM traversal and manipulation became crucial for creating interactive web experiences.",
      "Studied event handling in JavaScript, learning about event bubbling, capturing, and delegation. Proper event management became essential for creating responsive and efficient user interfaces.",
      "Practiced working with APIs and handling asynchronous operations using fetch() and async/await. This knowledge opened up possibilities for creating dynamic applications that interact with external services.",
      "Explored JavaScript design patterns and learned how they can improve code organization and maintainability. Patterns like module pattern and observer pattern became valuable tools in my development toolkit.",
      "Implemented local storage and session storage to persist data in the browser, learning about client-side data management strategies. This capability enhanced user experience by maintaining application state.",
      "Studied cross-browser compatibility issues and learned polyfills and feature detection techniques to ensure consistent behavior. This knowledge became crucial for supporting a wide range of users and devices."
    ],
  },
  {
    title: "Advanced Frontend Frameworks",
    chapter: "Chapter 2",
    topic: "React & Component Architecture",
    period: "Week 3-4",
    reflections: [
      "Explored React's component-based architecture, understanding how breaking down complex UIs into reusable components improves development efficiency and code organization.",
      "Implemented state management using hooks, learning how to handle dynamic data and user interactions in modern React applications effectively.",
      "Practiced building interactive user interfaces with proper event handling, form validation, and conditional rendering techniques for enhanced user experience.",
    ],
  },
  {
    title: "Backend Development & APIs",
    chapter: "Chapter 3",
    topic: "Node.js & Database Integration",
    period: "Week 5-6",
    reflections: [
      "Developed understanding of server-side programming with Node.js, learning how to create robust backend services that handle client requests efficiently.",
      "Implemented RESTful API design principles, creating well-structured endpoints that follow industry standards for scalable web service architecture.",
      "Gained experience with database integration using both SQL and NoSQL solutions, understanding when to use each approach based on project requirements.",
    ],
  },
  {
    title: "Full-Stack Project Development",
    chapter: "Chapter 4",
    topic: "Integration & Deployment",
    period: "Week 7-8",
    reflections: [
      "Successfully integrated frontend and backend components to create a complete web application, demonstrating end-to-end development capabilities.",
      "Learned deployment strategies using modern platforms like Vercel and Netlify, understanding the importance of CI/CD pipelines in professional development workflows.",
      "Implemented authentication and authorization systems, ensuring secure user access and data protection in web applications.",
    ],
  },
  {
    title: "Advanced Topics & Performance",
    chapter: "Chapter 5",
    topic: "Optimization & Best Practices",
    period: "Week 9-10",
    reflections: [
      "Explored performance optimization techniques including code splitting, lazy loading, and image optimization to create faster, more efficient web applications.",
    ],
  },
  {
    title: "Testing & Quality Assurance",
    chapter: "Chapter 6",
    topic: "Unit Testing & Integration Testing",
    period: "Week 11-12",
    reflections: [
      "Learned comprehensive testing strategies using Jest and React Testing Library, understanding how automated testing improves code reliability and reduces bugs.",
      "Implemented test-driven development practices, writing tests before code to ensure better design decisions and more maintainable applications.",
    ],
  },
  {
    title: "Final Project & Portfolio Development",
    chapter: "Chapter 7",
    topic: "Capstone Project & Career Preparation",
    period: "Week 13-14",
    reflections: [
      "Completed a comprehensive full-stack web application that demonstrates mastery of all course concepts, from initial planning to final deployment and presentation.",
    ],
  },
];

const Tutorial = () => {
  const [tab, setTab] = useState<number>(0);
  const [direction, setDirection] = useState<string>("right");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (id: number) => {
    if (id > tab) {
      setDirection("right");
    } else {
      setDirection("left");
    }
    setTab(id);
    scrollContainer(id);
  };

  const scrollContainer = (id: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const selectedTab = container.children[id] as HTMLElement;
      const containerWidth = container.clientWidth;
      const selectedTabOffsetLeft = selectedTab.offsetLeft;
      const selectedTabWidth = selectedTab.clientWidth;

      container.scroll({
        left: selectedTabOffsetLeft - containerWidth / 2 + selectedTabWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <section className="relative min-h-screen" style={{ backgroundImage: 'url(/bg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="relative z-10 bg-black/5 dark:bg-black/20 min-h-screen">
        <div className="container mx-auto px-4 py-8 lg:py-16">
        <section className="flex flex-col mx-0 xl:mx-[8%] lg:mx-[5%] md:mx-[3%] pt-16 lg:pt-24 relative">
          <header className="flex flex-row gap-4 justify-center items-center font-bold mb-8 lg:mb-16">
            <div className="w-16 lg:w-24 border-b-2 border-blue-500"></div>
            <span className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-800 dark:text-gray-200 text-center px-4">
              Course Learning Reflections
            </span>
            <div className="w-16 lg:w-24 border-b-2 border-blue-500"></div>
          </header>
          
          <div className="flex flex-col gap-6 lg:flex-row w-full py-8 lg:py-12 lg:gap-8 items-start max-w-6xl mx-auto">
            {/* 章节列表 */}
            <div
              ref={containerRef}
              className="flex lg:gap-0 overflow-x-scroll lg:inline-block w-full lg:w-[28%] lg:border-l-2 lg:border-l-blue-300 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 lg:p-6"
            >
              {chapters.map((chapter, id) => (
                <div
                  key={id}
                  className={`lg:w-full cursor-pointer hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 px-4 lg:px-6 py-3 lg:py-4 font-bold rounded-lg mb-2 lg:mb-3 text-black text-center lg:text-left whitespace-nowrap lg:whitespace-normal ${
                    tab === id &&
                    "lg:border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-md"
                  }`}
                  onClick={() => handleTabClick(id)}
                >
                  {chapter}
                </div>
              ))}
            </div>

            {/* 课程心得详情 */}
            <div className="w-full lg:w-[72%] h-[600px] lg:h-[700px] bg-white rounded-xl shadow-xl overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={tab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  custom={direction}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="h-full overflow-y-auto p-6 lg:p-8"
                >
                  <div className="mb-4 lg:mb-6 p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl lg:text-2xl font-bold text-black mb-2 lg:mb-3">
                      {courseReflections[tab].title}
                    </h3>
                    <div className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm">
                      <span className="px-2 lg:px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        📚 {courseReflections[tab].topic}
                      </span>
                      <span className="px-2 lg:px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        📅 {courseReflections[tab].period}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 lg:space-y-6 pb-8">
                    <h4 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4 flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      Key Learning Insights
                    </h4>
                    <div className="space-y-4">
                      {courseReflections[tab].reflections.map((reflection, index) => (
                        <div key={index} className="p-4 lg:p-5 border-l-4 border-blue-200 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-start gap-3 lg:gap-4">
                            <div className="flex-shrink-0 w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mt-1">
                              <span className="text-white text-xs lg:text-sm font-bold">{index + 1}</span>
                            </div>
                            <p className="text-black leading-relaxed text-sm lg:text-base">
                              {reflection}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
  );
};

export default Tutorial;