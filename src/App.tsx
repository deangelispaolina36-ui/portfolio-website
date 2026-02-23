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
      {/* 全局动态流动背景 */}
      <FlowingBackground 
        showMouseGlow={true}
        showParticles={true}
        showWaves={true}
        showLines={true}
        showGrid={true}
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
