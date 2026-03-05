import { Navbar, Footer } from "./components/layout";
import { 
  Hero, 
  About, 
  GamingProfile, 
  Portfolio, 
  Experience,
  Skills, 
  Contact 
} from "./components/sections";
import { ParticleBackground, DynamicBackground, SectionTransition } from "./components/common";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      {/* 动态背景层 - 简洁版，仅在非Hero区域显示 */}
      <DynamicBackground />

      {/* 导航栏 */}
      <Navbar />

      {/* Hero区域 - 视差效果（包含固定背景层） */}
      <Hero />

      {/* 自然过渡区域 - 从Hero到About的融合层 */}
      <div className="hero-to-about-transition" />

      {/* 主要内容 - 位于Hero之后，带有渐变融入效果和动态粒子背景 */}
      <main className="relative z-20 bg-transparent">
        {/* 动态粒子背景 - 简化版 */}
        <div className="main-particle-bg">
          <ParticleBackground 
            particleCount={30}
            colors={['rgba(139, 92, 246, 0.25)', 'rgba(236, 72, 153, 0.18)', 'rgba(99, 102, 241, 0.22)', 'rgba(6, 182, 212, 0.15)']}
            maxRadius={1.5}
            minRadius={0.3}
            speed={0.1}
            connectDistance={80}
          />
        </div>
        
        {/* About区域顶部渐变融入层 */}
        <div className="about-fade-in-overlay" />
        
        {/* 关于我 - 揭示过渡 */}
        <SectionTransition id="about" transitionType="reveal" showTopDivider={false} delay={0}>
          <About />
        </SectionTransition>

        {/* 游戏履历 - 滑入过渡 */}
        <SectionTransition id="gaming" transitionType="slide" delay={0.1}>
          <GamingProfile />
        </SectionTransition>

        {/* 作品集画廊 - 缩放过渡 */}
        <SectionTransition id="portfolio" transitionType="scale" delay={0.1}>
          <Portfolio />
        </SectionTransition>

        {/* 工作经历时间轴 - 揭示过渡 */}
        <SectionTransition id="experience" transitionType="reveal" delay={0.1}>
          <Experience />
        </SectionTransition>

        {/* 技能展示 - 滑入过渡 */}
        <SectionTransition id="skills" transitionType="slide" delay={0.1}>
          <Skills />
        </SectionTransition>

        {/* 联系方式 - 缩放过渡 */}
        <SectionTransition id="contact" transitionType="scale" showBottomDivider={true} delay={0.1}>
          <Contact />
        </SectionTransition>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}

export default App;
