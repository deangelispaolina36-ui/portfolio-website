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
import { FlowingBackground } from "./components/common";

function App() {
  return (
    <div className="min-h-screen bg-transparent text-white relative">
      {/* Cyberpunk 弥散渐变背景 */}
      <div className="cyber-atmosphere" />
      
      {/* 噪点纹理叠加层 */}
      <div className="noise-overlay" />
      
      {/* 全局动态流动背景（保留粒子效果） */}
      <FlowingBackground 
        showMouseGlow={true}
        showParticles={true}
        showWaves={false}
        showLines={true}
        showGrid={false}
      />

      {/* 导航栏 */}
      <Navbar />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 首页Hero区域 */}
        <Hero />

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
