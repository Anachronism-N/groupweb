import { HorizontalLine } from "@/app/components/HorizontalLine";
import { GridWrapper } from "@/app/components/GridWrapper";
import Image from "next/image";

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      image: "/blog/blogfolio_v5.jpg"
    },
    {
      id: 2,
      image: "/blog/introducing_blogfolio_v5_bento.jpg"
    },
    {
      id: 3,
      image: "/blog/introducing_blogfolio_v5_community_wall.jpg"
    },
    {
      id: 4,
      image: "/blog/introducing_blogfolio_v5_connections_page.jpg"
    },
    {
      id: 5,
      image: "/blog/introducing_blogfolio_v5_currently_playing.jpg"
    },
    {
      id: 6,
      image: "/blog/introducing_blogfolio_v5_newsletter.jpg"
    }
  ];

  const socialStats = [
    {
      platform: "GitHub",
      metric: "Repositories",
      value: "42",
      growth: "+12%",
      icon: "📊"
    },
    {
      platform: "Twitter",
      metric: "Followers",
      value: "2.3K",
      growth: "+8%",
      icon: "🐦"
    }
  ];

  // 圆环图数据
  const engagementData = {
    title: "Content Engagement",
    total: 100,
    segments: [
      { label: "Likes", value: 45, color: "text-blue-500", bgColor: "bg-blue-500" },
      { label: "Comments", value: 25, color: "text-green-500", bgColor: "bg-green-500" },
      { label: "Shares", value: 20, color: "text-purple-500", bgColor: "bg-purple-500" },
      { label: "Saves", value: 10, color: "text-orange-500", bgColor: "bg-orange-500" }
    ]
  };

  // 柱状图数据
  const monthlyData = [
    { month: "Jan", posts: 12, views: 8500 },
    { month: "Feb", posts: 15, views: 12000 },
    { month: "Mar", posts: 18, views: 15500 },
    { month: "Apr", posts: 22, views: 18000 },
    { month: "May", posts: 20, views: 16800 },
    { month: "Jun", posts: 25, views: 22000 }
  ];

  const maxViews = Math.max(...monthlyData.map(d => d.views));

  // 圆环图组件
  const DonutChart = ({ data }: { data: typeof engagementData }) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="bg-bg-primary border border-border-primary rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-4">{data.title}</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200 dark:text-gray-700"
              />
              {data.segments.map((segment, index) => {
                const strokeDasharray = `${segment.value} ${100 - segment.value}`;
                const strokeDashoffset = 100 - cumulativePercentage;
                cumulativePercentage += segment.value;
                
                return (
                  <path
                    key={index}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={segment.color}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">100%</div>
                <div className="text-xs text-text-secondary">Total</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {data.segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${segment.bgColor}`}></div>
                <span className="text-sm text-text-secondary">{segment.label}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 柱状图组件
  const BarChart = ({ data }: { data: typeof monthlyData }) => {
    return (
      <div className="bg-bg-primary border border-border-primary rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Performance</h3>
        
        <div className="space-y-4">
          {/* 图表区域 */}
          <div className="h-40 flex items-end justify-between space-x-2">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col items-center space-y-1">
                  {/* Views 柱子 */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t">
                    <div 
                      className="bg-gradient-to-t from-purple-primary to-indigo-500 rounded-t transition-all duration-500"
                      style={{ 
                        height: `${(item.views / maxViews) * 120}px`,
                        minHeight: '8px'
                      }}
                    ></div>
                  </div>
                  {/* Posts 柱子 */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-b">
                    <div 
                      className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-b transition-all duration-500"
                      style={{ 
                        height: `${(item.posts / 25) * 40}px`,
                        minHeight: '4px'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-text-secondary font-medium">{item.month}</span>
              </div>
            ))}
          </div>
          
          {/* 图例 */}
          <div className="flex justify-center space-x-6 pt-4 border-t border-border-primary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-primary to-indigo-500"></div>
              <span className="text-xs text-text-secondary">Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-emerald-400"></div>
              <span className="text-xs text-text-secondary">Posts</span>
            </div>
          </div>
          
          {/* 数据摘要 */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">
                {monthlyData.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">
                {monthlyData.reduce((sum, item) => sum + item.posts, 0)}
              </div>
              <div className="text-xs text-text-secondary">Total Posts</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <title>Communication | Team Project</title>
      
      {/* Hero Section */}
      <section className="relative">
        <span className="absolute left-1/2 top-20 -translate-y-1/2 translate-x-1/2">
          <HorizontalLine />
        </span>
        
        <div className="relative space-y-10 md:space-y-16">
          <div className="mx-auto text-balance pt-14 md:pt-16">
            <GridWrapper>
              <h1 className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
                Team Communication Hub
              </h1>
              
              <div className="mx-auto max-w-xl text-center mt-6 space-y-2">
                <h2 className="text-2xl md:text-3xl font-medium text-text-secondary">
                  Showcasing our team projects through social media engagement.
                </h2>
                <p className="leading-8 text-text-secondary mt-4">
                  We specialize in creating compelling digital content and managing 
                  social media campaigns that drive engagement and build communities 
                  around innovative projects.
                </p>
              </div>
            </GridWrapper>
          </div>
          
          <span className="absolute left-1/2 top-40 -translate-y-1/2 translate-x-1/2">
            <HorizontalLine />
          </span>
        </div>
      </section>

      {/* Social Media Posts Section */}
      <section className="relative space-y-10 md:space-y-16">
        <div className="relative">
          <GridWrapper>
            <div className="text-center text-sm font-medium text-indigo-600">
              <span>Social Media</span>
            </div>
          </GridWrapper>
        </div>
        
        <GridWrapper>
          <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary md:text-4xl">
            Our Team Projects on Social Platforms
          </h2>
          <p className="mx-auto max-w-xl text-center mt-6 leading-8 text-text-secondary">
            Explore how we promote and showcase our collaborative projects across various social media channels
          </p>
        </GridWrapper>
        
        <GridWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-bg-primary border border-border-primary rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400 hover:shadow-lg"
              >
                {/* Social Media Post Screenshot */}
                <div className="w-full h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Social Media Post ${project.id}`}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </GridWrapper>
      </section>

      {/* Social Media Performance Dashboard */}
      <section className="relative space-y-10 md:space-y-16">
        <div className="relative">
          <GridWrapper>
            <div className="text-center text-sm font-medium text-indigo-600">
              <span>Analytics</span>
            </div>
          </GridWrapper>
        </div>
        
        <GridWrapper>
          <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary md:text-4xl">
            Team Project Performance
          </h2>
          <p className="mx-auto max-w-xl text-center mt-6 leading-8 text-text-secondary">
            Real-time insights from our team&apos;s social media campaigns and project engagement metrics
          </p>
        </GridWrapper>
        
        <GridWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 左侧两个数据卡片 */}
            {socialStats.map((stat, index) => (
              <div
                key={index}
                className="bg-bg-primary border border-border-primary rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.growth.startsWith('+') 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {stat.growth}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-text-primary">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {stat.metric}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {stat.platform}
                  </p>
                </div>
              </div>
            ))}
            
            {/* 右侧圆环图 */}
            <DonutChart data={engagementData} />
            
            {/* 右侧柱状图 */}
            <BarChart data={monthlyData} />
          </div>
        </GridWrapper>
      </section>

      {/* Team Collaboration Section */}
      <section className="relative space-y-10 md:space-y-16">
        <div className="relative">
          <GridWrapper>
            <div className="text-center text-sm font-medium text-indigo-600">
              <span>Collaboration</span>
            </div>
          </GridWrapper>
        </div>
        
        <GridWrapper>
          <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary md:text-4xl">
            Let&apos;s Collaborate on Your Next Project
          </h2>
          <p className="mx-auto max-w-xl text-center mt-6 leading-8 text-text-secondary">
            Ready to amplify your project&apos;s reach? Our team specializes in creating 
            engaging social media strategies that turn projects into viral successes.
          </p>
        </GridWrapper>
        
        <GridWrapper>
          <div className="flex justify-center">
            <button className="bg-purple-primary hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Collaboration
            </button>
          </div>
        </GridWrapper>
      </section>
    </div>
  );
}
