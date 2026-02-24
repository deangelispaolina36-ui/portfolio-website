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
import { ParticleBackground, MouseGlow } from "./components/common";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      {/* 全局鼠标跟随光晕效果 - 所有页面共享 */}
      <MouseGlow 
        color="rgba(139, 92, 246, 0.12)" 
        size={500} 
        enableBreathing={true}
        opacity={1}
      />

      {/* 导航栏 */}
      <Navbar />

      {/* Hero区域 - 视差效果（包含固定背景层） */}
      <Hero />

      {/* 自然过渡区域 - 从Hero到About的融合层 */}
      <div className="hero-to-about-transition" />

      {/* 流动背景层 - 仅在非Hero区域显示 */}
      <div className="flowing-bg-container">
        {/* 多层流动波纹效果 */}
        <div className="flowing-waves-layer">
          <div className="flowing-wave-1" />
          <div className="flowing-wave-2" />
          <div className="flowing-wave-3" />
        </div>
        
        {/* 流动线条效果 */}
        <div className="flowing-lines-layer">
          <div className="flowing-line" />
          <div className="flowing-line" />
          <div className="flowing-line" />
          <div className="flowing-line" />
        </div>
        
        {/* 漂浮光点 */}
        <div className="floating-light-dot" />
        <div className="floating-light-dot" />
        <div className="floating-light-dot" />
        <div className="floating-light-dot" />
        <div className="floating-light-dot" />
        
        {/* 呼吸网格背景 */}
        <div className="breathing-grid" />
        
        {/* 渐变遮罩 */}
        <div className="flowing-gradient-overlay" />
      </div>

      {/* 主要内容 - 位于Hero之后，带有渐变融入效果和动态粒子背景 */}
      <main className="relative z-20 bg-slate-950">
        {/* 动态粒子背景 - 作为main区域的背景 */}
        <div className="main-particle-bg">
          <ParticleBackground 
            particleCount={80}
            colors={['rgba(139, 92, 246, 0.5)', 'rgba(236, 72, 153, 0.4)', 'rgba(99, 102, 241, 0.4)', 'rgba(167, 139, 250, 0.3)']}
            maxRadius={2.5}
            minRadius={0.8}
            speed={0.3}
            connectDistance={120}
          />
        </div>
        
        {/* About区域顶部渐变融入层 */}
        <div className="about-fade-in-overlay" />
        
        {/* 关于我 */}
        <About />

        {/* 游戏履历 */}
        <GamingProfile />

        {/* 作品集画廊 */}
        <Portfolio />

        {/* 工作经历时间轴 */}
        <Experience />

        {/* 技能展示 */}
        <Skills />

        {/* 联系方式 */}
        <Contact />
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}

export default App;
