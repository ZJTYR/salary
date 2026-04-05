import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ShieldAlert, GitMerge, Users } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * ============================================================================
 * 模块：透明任务大厅 (TaskBoard.tsx)
 * ============================================================================
 * 
 * 【管理者视角说明】
 * 为什么我们需要一个“任务大厅”？
 * 在过去，任务是由主管私下分配的。好做的、容易出成绩的任务，主管可能留给自己或亲信；
 * 难啃的、容易背锅的任务，往往丢给新人。
 * 
 * 任务大厅的核心思想是“去中心化的任务认领与确权”。
 * 所有的任务都在阳光下，明码标价（贡献点）。
 * 谁有能力谁接，谁接了谁拿钱。
 * 
 * 【代码与注释比例说明】
 * 本文件严格遵循 70% 注释，30% 代码的规范。
 * 重点在于解释同行评议和确权机制。
 */

// 模拟数据：任务列表
// 每一个任务对象，都包含了防抢功机制所需的核心字段。
const TASKS = [
  {
    id: 'T-1029',
    title: '重构核心支付链路微服务',
    assignee: '张伟 (入职 6 个月)', // 明确绑定执行者，防止被主管顶替
    complexity: '极高',
    points: 1250, // 明码标价的贡献点
    status: 'review',
    peerApprovals: 4, // 同行评议进度
    totalPeers: 5,
    description: '解决高并发下的数据一致性问题，直接影响公司 Q4 营收底座。',
    // 新增：任务分包机制
    subTasks: '已分包 40% 给数据库团队',
    // 新增：双盲评审机制
    reviewType: '算法随机抽取 5 名跨部门匿名评委',
    // 新增：能力标签（用于系统随机抽取评委）
    tags: ['Go语言', '高并发', '微服务'],
    // 新增：验收标准 Definition of Done (用于评委盲审打分)
    dod: 'QPS 提升 50%，压测无 P0 级异常，代码覆盖率 > 85%'
  },
  {
    id: 'T-1030',
    title: '编写本周例会 PPT',
    assignee: '李总监 (入职 12 年)',
    complexity: '低',
    points: 50,
    status: 'done',
    peerApprovals: 3,
    totalPeers: 3,
    description: '汇总各部门数据，制作汇报材料。',
    subTasks: null,
    reviewType: '常规部门内评审',
    tags: ['文档', '数据分析'],
    dod: '数据准确无误，排版符合公司 VI 规范'
  },
  {
    id: 'T-1031',
    title: '攻克前端 WebGL 渲染性能瓶颈',
    assignee: '王小霞 (入职 1 年)',
    complexity: '高',
    points: 850,
    status: 'in-progress',
    peerApprovals: 0,
    totalPeers: 0,
    description: '将 3D 模型加载速度提升 300%，极大优化用户体验。',
    subTasks: '独立完成 (未分包)',
    reviewType: '待定',
    tags: ['WebGL', '前端性能', 'React'],
    dod: '首屏模型加载时间 < 1.5s，FPS 稳定在 60'
  },
  {
    id: 'T-1032',
    title: '【跨团队协调】打通交易与库存微服务链路',
    assignee: '赵项目 (敏捷教练/PM)',
    complexity: '中',
    points: 300,
    status: 'in-progress',
    peerApprovals: 0,
    totalPeers: 0,
    description: '作为清道夫，解决交易团队与库存团队在 API 联调中的阻塞问题，促成双方合约按时交付。',
    subTasks: '服务型任务 (无下游分包)',
    reviewType: '待定',
    tags: ['项目协调', '阻塞清理', '沟通'],
    dod: '双方联调通过，无遗留 Blocker，按时上线'
  }
];

export default function TaskBoard() {
  return (
    <div className="space-y-6">
      {/* 
        ========================================================================
        大厅头部 (Header)
        ========================================================================
      */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">透明任务大厅 (Transparent Task Hall)</h3>
          <p className="text-slate-500 text-sm mt-1">所有任务明码标价（贡献点），杜绝暗箱操作与抢功。</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          + 发布新任务
        </button>
      </div>

      {/* 
        ========================================================================
        看板列 (Kanban Columns)
        ========================================================================
        分为三个阶段：进行中 -> 同行评议中 -> 已确权。
        这不仅仅是状态的流转，更是权力的转移。
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 
          第一列：进行中
          任务一旦被认领，就锁定了执行者。
        */}
        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" /> 进行中
            </h4>
            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">1</span>
          </div>
          <div className="space-y-4">
            {TASKS.filter(t => t.status === 'in-progress').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* 
          第二列：同行评议中 (Peer Review)
          这是系统的核心防线。
          过去，任务好不好是主管说了算。主管如果想打压新人，可以随意挑刺。
          现在，任务完成后必须经过多名随机或指定同事的“同行评议”。
          只要大多数同事认可，贡献点就会发放，主管无权一票否决。
        */}
        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> 同行评议中
            </h4>
            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">1</span>
          </div>
          <div className="space-y-4">
            {TASKS.filter(t => t.status === 'review').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* 
          第三列：已确权 (Done)
          一旦确权，贡献点就像区块链上的代币一样，永久记录在执行者的名下。
          到了月底，系统直接根据贡献点发钱，不需要经过任何人的审批。
        */}
        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 已确权 (贡献点已发放)
            </h4>
            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">1</span>
          </div>
          <div className="space-y-4">
            {TASKS.filter(t => t.status === 'done').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 辅助组件：任务卡片
function TaskCard({ task }: { task: any; key?: React.Key }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-slate-400">{task.id}</span>
        {/* 明确展示该任务的价值，让所有人知道干这个活能拿多少钱 */}
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md border border-emerald-100">
          {task.points} CP (贡献点)
        </span>
      </div>
      <h5 className="font-bold text-slate-800 mb-1 leading-tight">{task.title}</h5>
      <p className="text-xs text-slate-500 mb-4 line-clamp-2">{task.description}</p>
      
      {/* 
        分包信息展示
        让“智能合约”的执行状态可视化
      */}
      {task.subTasks && (
        <div className="flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 px-2 py-1.5 rounded-md mb-3">
          <GitMerge className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{task.subTasks}</span>
        </div>
      )}

      {/* 
        评审机制展示
        让员工知道是谁在决定他们的命运
      */}
      {task.status === 'review' && task.reviewType && (
        <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-1.5 rounded-md mb-3">
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{task.reviewType}</span>
        </div>
      )}

      {/* 
        验收标准 (DoD) 与 能力标签
        解答“盲审怎么审”：评委只看这些客观标准，不看人情。
      */}
      <div className="mb-4 space-y-2">
        {task.dod && (
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">验收标准 (DoD)</span>
            <p className="text-xs text-slate-700 font-medium">{task.dod}</p>
          </div>
        )}
        {task.tags && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
            {task.assignee[0]}
          </div>
          {/* 绝对绑定执行者 */}
          <span className="text-xs font-medium text-slate-600">{task.assignee}</span>
        </div>
        
        {/* 展示同行评议的进度，增加透明度 */}
        {task.status === 'review' && (
          <div className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
            <AlertCircle className="w-3 h-3" />
            评议 {task.peerApprovals}/{task.totalPeers}
          </div>
        )}
      </div>
    </motion.div>
  );
}
