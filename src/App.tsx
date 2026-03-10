import { Navbar, Footer } from "./components/layout";
import { 
  Hero, 
  About, 
  GamingProfile, 
  Portfolio, 
  Experience,
  Achievements,
  Skills, 
  Contact 
} from "./components/sections";
import { TechBackground, SectionTransition } from "./components/common";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      {/* 科技感动态背景 - 仅在非Hero区域显示 */}
      <TechBackground />

      {/* 导航栏 */}
      <Navbar />

      {/* Hero区域 - 视差效果（包含固定背景层） */}
      <Hero />

      {/* 自然过渡区域 - 从Hero到About的融合层 */}
      <div className="hero-to-about-transition" />

      {/* 主要内容 - 位于Hero之后 */}
      <main className="relative z-20 bg-transparent">
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

        {/* 荣誉与成就 - 缩放过渡 */}
        <SectionTransition id="achievements" transitionType="scale" delay={0.1}>
          <Achievements />
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
