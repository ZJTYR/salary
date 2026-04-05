import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  KanbanSquare, 
  Scale,
  Users,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import Dashboard from './components/Dashboard';
import DistributionCalculator from './components/DistributionCalculator';
import TaskBoard from './components/TaskBoard';

/**
 * ============================================================================
 * 核心架构文件：系统主入口 (App.tsx)
 * ============================================================================
 * 
 * 【管理者视角说明 - 为什么我们需要这个系统？】
 * 作为一个高层管理者，我们面临的最大痛点是“信息不对称”。
 * 我们无法看清每一个基层员工到底做了什么，难度有多大，核心贡献是什么。
 * 过去，我们只能依赖中高层管理者层层向下分配利益。
 * 
 * 但人性是复杂的，中层管理者可能会因为私心、偏好、或者单纯的“论资排辈”惯性，
 * 导致利益分配极度不公。层层盘剥之下，真正干活的底层员工拿不到应得的回报。
 * 
 * 【本文件的作用】
 * 这个 App 组件就是我们打破这种“层层盘剥”的利器。
 * 它提供了一个扁平化的、全透明的视图。
 * 无论你是高管还是基层，看到的都是同一个“任务大厅”和“分配计算器”。
 * 我们通过技术手段，把“分配权”从个人的主观判断中剥离出来，
 * 交给客观的算法和全员可见的规则。
 * 
 * 【代码与注释比例说明】
 * 按照要求，本系统代码中注释占比 70%，代码占比 30%。
 * 因为在这个系统中，“管理思想”比“代码实现”更重要。
 * 每一行代码背后，都是为了防范人性中的贪婪和自私。
 */
function App() {
  // 状态管理：控制当前显示的模块
  // 就像企业的透明度一样，员工可以自由切换查看系统的各个维度，没有任何隐藏的黑盒。
  const [activeTab, setActiveTab] = useState('dashboard');

  // 路由渲染逻辑
  // 根据用户的选择，渲染对应的功能模块。
  // 每一个模块都代表了我们对抗“分配不公”的一种武器。
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />; // 宣导我们的核心价值观和系统成效
      case 'calculator':
        return <DistributionCalculator />; // 让员工自己算账，看到公平的希望
      case 'tasks':
        return <TaskBoard />; // 任务明码标价，杜绝老员工抢功
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 
        ========================================================================
        侧边栏导航 (Sidebar)
        ========================================================================
        侧边栏的设计去掉了所有层级感，没有“部门”、“中心”这种容易产生官僚主义的划分。
        只有最核心的三个功能：看规则、算收益、接任务。
      */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Scale className="w-8 h-8 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-tight">公平分配系统</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* 
            导航按钮：系统概览
            让每一个进入系统的人，第一眼看到的就是我们的分配哲学。
          */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">系统概览</span>
          </button>
          
          {/* 
            导航按钮：分配计算器
            打破薪资保密的潜规则，把计算公式公开。
            让年轻人知道，只要干得好，收益绝对比混日子的老员工高。
          */}
          <button
            onClick={() => setActiveTab('calculator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'calculator' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span className="font-medium">分配计算器</span>
          </button>
          
          {/* 
            导航按钮：透明任务大厅
            所有的工作都在这里派发，谁接的谁拿钱，中层领导无法在中间赚差价。
          */}
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'tasks' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <KanbanSquare className="w-5 h-5" />
            <span className="font-medium">透明任务大厅</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800 text-sm text-slate-500">
          <p>打破资历壁垒</p>
          <p>让贡献发声</p>
        </div>
      </aside>

      {/* 
        ========================================================================
        主内容区 (Main Content)
        ========================================================================
      */}
      <main className="flex-1 overflow-y-auto">
        {/* 
          【UI 样式修复说明】
          之前的版本中，由于 z-index 设置不当，导致头部导航栏被下方的内容遮挡，
          这就像是公司的顶层设计被中层的暗箱操作蒙蔽了双眼。
          现在我们将 header 的 z-index 提升到 50，并加入 bg-white/95 和 backdrop-blur，
          确保“透明、公平”的准则永远悬浮在系统的最顶端，不被任何底层内容遮蔽。
        */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">
            {activeTab === 'dashboard' && '系统概览 (System Overview)'}
            {activeTab === 'calculator' && '动态分配计算器 (Dynamic Distribution)'}
            {activeTab === 'tasks' && '透明任务大厅 (Transparent Tasks)'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <Users className="w-4 h-4" />
              <span>当前在线: 128 人</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-emerald-200">
              新
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {/* 
            使用 Framer Motion 添加平滑的过渡动画。
            不仅是为了视觉美观，更是向员工传递一种“系统流畅、现代、值得信赖”的心理暗示。
          */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
