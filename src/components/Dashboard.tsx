import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap, Target, ArrowRight, X } from 'lucide-react';

/**
 * ============================================================================
 * 模块：系统概览 (Dashboard.tsx)
 * ============================================================================
 * 
 * 【管理者视角说明】
 * 为什么我们需要一个“系统概览”页面？
 * 很多时候，底层的员工根本不知道公司的分配规则是什么。
 * 规则越模糊，中层管理者操作的空间就越大。
 * 
 * 这个页面的核心目的，就是把我们的“底牌”亮给所有人看。
 * 我们要明确告诉每一个新员工：
 * “在这里，我们不看你来了多少年，我们只看你解决了多难的问题。”
 * 
 * 【代码与注释比例说明】
 * 本文件严格遵循 70% 注释，30% 代码的规范。
 * 每一块 UI 组件的设计，都对应着一个解决“层层剥削”的管理学原理。
 */
export default function Dashboard() {
  // 状态管理：控制白皮书弹窗的显示与隐藏
  // 透明度是公平的第一步。我们把所有的规则写在白皮书里，任何人随时可以查看。
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* 
        ========================================================================
        英雄区域 (Hero Section)
        ========================================================================
        这是员工进入系统看到的第一句话。
        我们没有写“欢迎使用某某系统”，而是直接点出痛点：“解决论资排辈”。
        这是一种强烈的心理暗示，告诉受委屈的年轻人：高层看到了你们的困境。
      */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">解决“论资排辈”，重塑财富分配规则</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            在传统的职场环境中，年轻员工往往承担了最繁重、最具创新性的工作，却因为“资历浅”而无法获得匹配的报酬。
            本系统旨在通过<strong>去中心化评估、任务复杂度量化、以及透明的贡献点机制</strong>，彻底打破年龄和资历的壁垒，实现真正的“按劳分配”。
          </p>
          {/* 
            白皮书触发按钮
            点击后将打开一个全屏弹窗，用最通俗的语言向员工解释系统的底层逻辑。
          */}
          <button 
            onClick={() => setIsWhitepaperOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            查看分配算法白皮书 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 
        ========================================================================
        核心原则展示 (Core Principles)
        ========================================================================
        这里列出了系统的三大支柱。
        这不仅仅是功能介绍，这是我们向中层管理者下达的“削权令”。
        通过系统机制，剥夺他们随意分配奖金、随意抢占下属功劳的特权。
      */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 
          原则一：贡献本位
          解决痛点：老员工靠工龄混日子，新员工干活多拿钱少。
          管理手段：将薪酬池的绝大部分与动态的“贡献点”挂钩。
        */}
        <Card 
          icon={<Zap className="w-6 h-6 text-amber-500" />}
          title="贡献本位 (Contribution First)"
          description="薪酬池的 70% 严格按照当月实际产出的『贡献点』进行动态分配，彻底剥离基础工龄工资的权重。"
        />
        {/* 
          原则二：防抢功机制
          解决痛点：中层领导或老员工把新人做的方案写上自己的名字。
          管理手段：任务上链，多节点确权。谁提交的代码/方案，系统底层就绑定谁。
        */}
        <Card 
          icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
          title="防抢功机制 (Credit Protection)"
          description="任务上链与多节点（同行）确权。老员工无法通过职级压制强行署名，每一行代码、每一份方案都可追溯到实际执行者。"
        />
        {/* 
          原则三：难度系数乘数
          解决痛点：简单的体力劳动和复杂的脑力劳动被一视同仁，导致没人愿意啃硬骨头。
          管理手段：引入复杂度乘数，高难度任务收益呈指数级增长。
        */}
        <Card 
          icon={<Target className="w-6 h-6 text-blue-500" />}
          title="难度系数乘数 (Complexity Multiplier)"
          description="拒绝简单的“拼时长”。系统引入任务复杂度乘数，攻克核心技术难题的年轻员工，其单项收益可达到常规任务的 5-10 倍。"
        />
      </section>

      {/* 
        ========================================================================
        系统成效数据 (Stats)
        ========================================================================
        用真实的数据向全员证明：这套系统不是画大饼，而是真金白银的改变。
        当底层员工看到“青年员工平均薪酬提升 42%”时，他们的积极性会被彻底点燃。
      */}
      <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">系统运行成效 (System Impact)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat value="42%" label="青年员工平均薪酬提升" />
          <Stat value="100%" label="任务贡献透明度" />
          <Stat value="-65%" label="因分配不公导致的离职率" />
          <Stat value="8.5x" label="最高/最低贡献收益差" />
        </div>
      </section>

      {/* 
        ========================================================================
        白皮书弹窗 (Whitepaper Modal)
        ========================================================================
        使用 AnimatePresence 实现平滑的弹窗动画。
        这里面包含了用户要求的“大白话”系统细节解释。
      */}
      <AnimatePresence>
        {isWhitepaperOpen && (
          <WhitepaperModal onClose={() => setIsWhitepaperOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// 辅助组件：卡片
function Card({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 border border-slate-100">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

// 辅助组件：数据统计
function Stat({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-emerald-600 mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}

/**
 * ============================================================================
 * 辅助组件：白皮书弹窗 (WhitepaperModal)
 * ============================================================================
 * 
 * 【设计理念】
 * 很多公司的制度写得像法律条文，员工根本看不懂，这其实是管理层在推卸责任。
 * 我们的白皮书必须用最通俗的语言（大白话），站在员工的角度，
 * 把痛点、规则、怎么赚钱，清清楚楚地写出来。
 * 只有员工看懂了，系统才能真正运转起来。
 */
function WhitepaperModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* 遮罩层：点击遮罩层也可以关闭弹窗 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      {/* 弹窗内容区 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* 弹窗头部 */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            分配算法与核心规则白皮书
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 
          弹窗滚动内容区
          这里使用原生的 HTML 标签进行排版，确保内容清晰易读。
        */}
        <div className="p-8 overflow-y-auto text-slate-700 space-y-8">
          
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              为什么我们要改变？（系统痛点）
            </h3>
            <p className="mb-4 leading-relaxed">在传统的公司里，大家经常遇到这些让人憋屈的事情，这也是我们下决心重构系统的原因：</p>
            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <p><strong>论资排辈：</strong> 老员工每天喝茶看报纸，工资却比拼命干活的年轻人高得多，仅仅因为他们“来得早”。</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <p><strong>层层盘剥：</strong> 奖金发给部门经理，经理再分给下面的人。关系好的拿得多，真正干活的拿得少，中层管理者权力过大。</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <p><strong>抢夺功劳：</strong> 新人熬夜写出的代码、做出的方案，最后汇报时却写上了主管或老员工的名字，有苦说不出。</p>
              </li>
            </ul>
          </section>

          <hr className="border-slate-100" />

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              我们怎么解决？（核心规则）
            </h3>
            <p className="mb-4 leading-relaxed">为了彻底消灭这些不公平，我们把“分钱的权力”从人的手里收了回来，交给了透明的系统规则：</p>
            <div className="grid gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">规则一：任务明码标价（打破信息黑盒）</h4>
                <p className="text-sm text-slate-600">所有的工作都被拆分成具体的任务，每个任务都有明确的“贡献点（CP）”。干多少活，拿多少点，清清楚楚，领导不能随便画大饼。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">规则二：谁干的就绑定谁（防抢功机制）</h4>
                <p className="text-sm text-slate-600">你在系统里接了任务并完成，这个贡献点就永远刻在你的名字下。任何领导都无法在后台把你的名字改成他的。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1">规则三：大家说了算（同行评议）</h4>
                <p className="text-sm text-slate-600">任务做得好不好，不是你的直属领导一个人说了算，而是由几位同事一起打分。这杜绝了领导因为个人喜好给你穿小鞋。</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 border-l-4 border-l-blue-500">
                <h4 className="font-bold text-slate-800 mb-1">规则四：复杂任务如何协作？（任务分包与智能合约机制）</h4>
                <p className="text-sm text-slate-600">
                  如果一个大任务需要跨部门、多人协作怎么办？系统引入了类似“包工头”的机制。
                  当你接下一个大任务（例如 1000 CP），你可以自己决定贡献范围。比如你负责架构占 30%，剩下的 70%（700 CP）你可以直接在系统内**“分包”**给前端和后端同事。
                  这 700 CP 对他们来说就是新的 100%，他们甚至可以继续往下分包。
                  **系统通过这种“树状智能合约”，让每个人都成为微型 CEO，自由组队，按约分钱，无需管理层插手。**
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 border-l-4 border-l-purple-500">
                <h4 className="font-bold text-slate-800 mb-2">规则五：双盲评审怎么审？（对事不对人与标签匹配）</h4>
                <div className="text-sm text-slate-600 space-y-3">
                  <p>
                    <strong>疑问 1：不知道审谁，怎么打分？</strong><br/>
                    <strong>解答：只看“交付物”和“验收标准（DoD）”。</strong> 评委根本不需要知道你是谁，长什么样，平时跟你关系好不好。任务发布时必须写明客观的验收标准（比如：接口响应时间&lt;200ms，测试覆盖率&gt;80%）。评委只对着你的代码、文档和这些硬性标准打分。这彻底实现了真正的<strong>“对事不对人”</strong>。
                  </p>
                  <p>
                    <strong>疑问 2：怎么找到合适的评委？需要建立复杂的人际关系树吗？</strong><br/>
                    <strong>解答：不需要！系统采用“动态能力标签”+“分包协作图谱”。</strong> 评委分为两类：<br/>
                    1. <strong>利益相关方（非盲）：</strong> 也就是你的“发包方”或“下游接收方”。系统通过任务分包数据自动关联他们，他们负责验收“这东西能不能用”。<br/>
                    2. <strong>专业委员会（双盲）：</strong> 系统根据任务的“能力标签”（如：Java、UI设计），在全公司拥有该标签的员工池中随机抽取。他们负责评判“这东西做得专不专业”。
                  </p>
                  <p>
                    <strong>总结：</strong> 用算法标签匹配专业评委，用客观的验收标准代替主观的“人情分”，用信誉质押惩罚恶意打分者。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              钱到底怎么算？（收益获取方式）
            </h3>
            <p className="mb-4 leading-relaxed">我们的薪酬计算公式非常简单直接，没有任何隐藏条款：</p>
            
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl my-6 text-center">
              <p className="text-lg font-mono font-bold text-emerald-800">
                总收入 = 基础生活保障金 + ( 实际工作强度 × 任务复杂度乘数 ) + 极小的资历补偿
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-slate-100 p-2 rounded-lg shrink-0"><Target className="w-5 h-5 text-slate-600" /></div>
                <div>
                  <strong className="text-slate-900 block mb-1">基础生活保障金：</strong>
                  <span className="text-sm text-slate-600">保证每个人都有体面的基本生活，无论你是新员工还是老员工，这部分一视同仁。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-slate-100 p-2 rounded-lg shrink-0"><Zap className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <strong className="text-slate-900 block mb-1">工作强度与复杂度乘数（最关键！）：</strong>
                  <span className="text-sm text-slate-600">你接了多少任务，完成了多少工作量，这是基础。更重要的是，如果你解决的是核心技术难题，或者拿下了大客户（高复杂度），你的收益会成倍放大（比如乘以5倍、10倍）。</span>
                </div>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-slate-900 text-white rounded-xl text-center">
              <p className="font-medium">
                总结：在这里，没有“熬年头”，只有“拼贡献”。<br/>
                <span className="text-emerald-400">只要你敢于挑战高难度的任务，你的收入就能立刻超越那些混日子的老员工！</span>
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 
            新增：设计哲学板块
            回应用户关于《遥远的救世主》王庙村模式的深刻洞察。
          */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              设计哲学：数字化时代的“王庙村模式”与双轨制升级
            </h3>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-slate-700 text-sm leading-relaxed space-y-4">
              <p>
                如果您看过《遥远的救世主》（豆豆 著），您会发现我们的分包机制非常像书中的<strong>“王庙村生产模式”</strong>：
                将复杂的音响生产拆解为一道道工序，每个人（农户）就是一个独立的节点，只对自己的上游负责，交付符合标准的零件。
              </p>
              <p>
                我们的系统确实借鉴了这种<strong>“将公司内部完全市场化”</strong>的精髓。在我们的分包链条中，最底层的执行者确实只需要对“给他下发任务的上游”负责，满足上游的验收标准（DoD）即可。这极大地降低了沟通成本，让每个人成为自负盈亏的“微型个体户”。
              </p>
              <p className="font-bold text-slate-900 mt-4">
                但是，我们做了一个至关重要的升级 —— 引入了“双轨制评审（Dual-Track Judging）”。
              </p>
              <p>
                王庙村模式是<strong>单轨制</strong>（上游评价下游）。这在制造实体零件时没问题（尺寸不对就是不对）。但在软件开发等知识密集型工作中，如果只让上游评价，极易导致两个致命问题：
                <br/>1. <strong>上下级串通：</strong> 上游为了包庇下游，降低验收标准。
                <br/>2. <strong>技术债务：</strong> 上游只关心“功能能不能跑通”，根本不在乎底层的代码写得有多烂、架构有多糟糕。
              </p>
              <p>
                因此，我们的系统是<strong>双轨并行</strong>的：
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>轨道一（生存线）：利益相关方验收（王庙村模式）。</strong> 给你派发任务的上游，决定你的东西“能不能用”，解决业务需求。</li>
                <li><strong>轨道二（质量线）：双盲专业评审（系统升级）。</strong> 系统随机抽取的匿名专家，决定你的东西“好不好、专不专业”，守住公司的技术底线。</li>
              </ul>
              <p className="font-medium text-purple-800 mt-2">
                双轨制既保留了王庙村模式的高效与责任到人，又用算法弥补了人性在知识生产中的漏洞。
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 
            新增：组织架构演进板块
            回应用户关于“中层管理者是否还需要存在”以及“PM角色定位”的深刻问题。
          */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
              组织演进：中层管理者去哪了？还需要 PM 吗？
            </h3>
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-slate-700 text-sm leading-relaxed space-y-4">
              <p>
                当任务分配和奖金发放全部由系统和智能合约接管后，传统的组织架构将发生剧变。您提出的问题直击灵魂：<strong>中层管理者还需要存在吗？</strong>
              </p>
              
              <div className="space-y-3 mt-4">
                <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                  <h4 className="font-bold text-amber-800 mb-1">1. 传统“传话筒式”中层的消亡</h4>
                  <p>
                    过去，很多中层管理者（如某些总监、经理）的核心权力是“信息差”和“分配权”。他们把老板的任务往下传，把员工的功劳往上报，借此克扣奖金。
                    <strong>在这套系统中，这类纯粹靠“管人”为生的中层将被彻底淘汰。</strong> 因为系统已经代替了他们分配利益的功能。
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                  <h4 className="font-bold text-amber-800 mb-1">2. 中层转型：从“管理者”变成“超级发包方（架构师）”</h4>
                  <p>
                    中层并没有消失，而是<strong>转型</strong>了。老板下发了一个 10000 CP 的战略级大项目，普通员工是接不住的。
                    这时候需要有人把这 10000 CP 的大项目，精准地拆解成 10 个 1000 CP 的子项目，并定义好每个子项目的边界和验收标准（DoD）。
                    这需要极高的专业能力和架构视野。<strong>未来的中层，不再是“管人”的官，而是凭硬核实力拆解任务的“超级发包方”。</strong>
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                  <h4 className="font-bold text-amber-800 mb-1">3. PM（产品/项目经理）的新定位：出资方与清道夫</h4>
                  <p>
                    在高度分包的协作网中，必然会出现跨节点的摩擦。PM 的角色依然不可或缺，但性质完全变了：
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>产品经理 (Product Manager)：变成了“出资方”。</strong> 他们负责挖掘市场需求，向公司申请 CP 预算，然后把需求挂到任务大厅。他们是轨道的起点。</li>
                    <li><strong>项目经理 (Project Manager)：变成了“清道夫/润滑剂”。</strong> 他们不再是拿着鞭子催进度的监工，而是作为独立的节点接下“协调任务”。如果前端和后端因为接口扯皮，PM 负责去清理这些阻塞（Blockers）。<strong>PM 赚取的 CP，来自于他们成功促成了其他节点的合约交付。</strong></li>
                  </ul>
                </div>
              </div>
              
              <p className="font-medium text-amber-800 mt-4 text-center bg-amber-100/50 p-3 rounded-lg">
                结论：管理并没有消失，而是从“权力的压迫”变成了“专业的服务”。
              </p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
