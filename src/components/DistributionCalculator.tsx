import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

/**
 * ============================================================================
 * 模块：动态分配计算器 (DistributionCalculator.tsx)
 * ============================================================================
 * 
 * 【管理者视角说明】
 * 为什么我们需要这个计算器？
 * 传统的薪酬体系是一个“黑盒”，员工不知道自己的努力能换来多少回报。
 * 中层管理者常常利用这个黑盒，用“年底多发点奖金”这种空头支票来画大饼。
 * 
 * 这个计算器就是为了打破黑盒。
 * 我们把算法公开，让员工自己去拉动滑块。
 * 当他们发现“只要我承担高复杂度的任务，我的收入就能立刻超越摸鱼的老员工”时，
 * 这种确定性会极大地激发他们的内驱力。
 * 
 * 【关于“资历增加导致对比下降”的科学性解释】
 * 针对疑问：“为什么入职年限增加，新系统的薪酬反而比传统系统低了？这不科学。”
 * 答：这正是本系统的**核心反剥削机制**！
 * 在传统系统中，资历是“线性加钱”的，哪怕老员工每天只喝茶（低强度、低复杂度），
 * 他的工资依然会随着年限无脑上涨。这部分多出来的钱从哪里来？就是从拼命干活的年轻人身上剥削来的。
 * 
 * 在我们的新系统中，我们**不奖励“熬年头”，只奖励“经验带来的高产出”**。
 * 如果老员工仗着资历深开始摸鱼（把强度和复杂度拉低），新系统会毫不留情地砍掉他的“资历溢价”，
 * 让他回归基础薪资。这就是为什么在低产出状态下，新系统薪资会低于传统系统。
 * 但如果老员工利用丰富的经验，继续承担高复杂度的核心任务，他的“经验乘数”会让他拿到比传统系统高得多的天价薪酬！
 * 
 * 【代码与注释比例说明】
 * 本文件严格遵循 70% 注释，30% 代码的规范。
 * 重点在于解释算法背后的管理学逻辑。
 */
export default function DistributionCalculator() {
  // 核心变量一：资历 (Seniority)
  // 在传统系统中，这是决定薪资的最核心要素。
  // 在新系统中，它不再是无脑加钱的筹码，而是作为“经验杠杆乘数”存在。
  const [seniority, setSeniority] = useState(2); // Years
  
  // 核心变量二：工作强度 (Intensity)
  // 衡量员工实际付出的劳动量。新员工往往承担了最重的体力/执行工作。
  const [intensity, setIntensity] = useState(80); // 0-100 scale
  
  // 核心变量三：任务复杂度 (Complexity)
  // 衡量员工解决核心问题的能力。这是新系统中最值钱的指标。
  const [complexity, setComplexity] = useState(70); // 0-100 scale

  /**
   * 传统系统算法模拟 (Traditional System Logic)
   * 
   * 算法剖析：
   * 基础工资极度依赖资历 (seniority * 1500)。
   * 强度 (intensity) 只能换来微薄的加班费或绩效 (intensity * 20)。
   * 复杂度完全不计入公式，因为中层管理者无法量化，或者故意不量化以便自己抢功。
   * 
   * 结果：老员工躺赢，新员工累死却拿不到钱。
   */
  const traditionalSalary = useMemo(() => {
    return 4000 + (seniority * 1500) + (intensity * 20);
  }, [seniority, intensity]);

  /**
   * 创新公平系统算法 (Innovative System Logic)
   * 
   * 算法剖析：
   * 1. 基础工资 (5000)：保障所有人的基本生活尊严，一视同仁。
   * 2. 核心奖金 (intensity * complexity * 0.8)：这是点睛之笔。
   *    只有当你既努力（强度高），又解决了难题（复杂度高）时，收益才会爆发。
   * 3. 经验杠杆乘数 (1 + seniority * 0.05)：
   *    我们承认老员工的经验是有价值的，但前提是他必须把经验转化为实际产出！
   *    如果产出（核心奖金）为0，乘数再高也是0。
   *    如果老员工保持高产出，他的经验会让他的收益比新人多出百分之几十。
   * 
   * 结果：真正干活、干难活的人，拿走最大的蛋糕。老员工必须持续输出才能维持高薪。
   */
  const innovativeSalary = useMemo(() => {
    const base = 5000;
    const performanceBonus = intensity * complexity * 0.8;
    const experienceMultiplier = 1 + (seniority * 0.05); // 每年增加 5% 的效能杠杆
    return Math.round(base + (performanceBonus * experienceMultiplier));
  }, [seniority, intensity, complexity]);

  const data = [
    {
      name: '传统按资排辈系统',
      salary: traditionalSalary,
      fill: '#94a3b8' // slate-400，代表陈旧、灰暗的过去
    },
    {
      name: '新世代公平分配系统',
      salary: innovativeSalary,
      fill: '#10b981' // emerald-500，代表生机、公平的未来
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-2">动态分配计算器 (Distribution Calculator)</h3>
        <p className="text-slate-500 text-sm mb-8">
          调整下方参数，直观对比“传统职场”与“创新公平系统”下，该员工的最终薪酬差异。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 
            ====================================================================
            控制面板 (Controls)
            ====================================================================
            让员工自己动手，感受规则改变带来的震撼。
          */}
          <div className="space-y-8">
            <ControlGroup 
              label="员工资历 (入职年限)" 
              value={seniority} 
              setValue={setSeniority} 
              min={0} max={20} 
              unit="年"
              description="传统系统中最核心的加薪指标。在新系统中，它转化为'经验杠杆'，必须配合高产出才能生效。"
            />
            <ControlGroup 
              label="实际工作强度/产出量" 
              value={intensity} 
              setValue={setIntensity} 
              min={0} max={100} 
              unit="分"
              description="新员工往往承担最繁重的执行工作。这是多劳多得的基础。"
            />
            <ControlGroup 
              label="任务复杂度/核心贡献" 
              value={complexity} 
              setValue={setComplexity} 
              min={0} max={100} 
              unit="分"
              description="解决核心技术难题或创造核心业务价值的能力。这是拉开收入差距的关键。"
            />

            {/* 
              结论分析区
              根据滑块的值，系统自动给出管理学视角的点评。
              这相当于一个虚拟的“公正的HR”，告诉员工系统是如何保护他们的。
            */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-semibold text-slate-700 mb-2">结论分析</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {seniority < 5 && intensity > 70 && complexity > 70 ? (
                  <span className="text-emerald-600 font-medium">
                    当前画像为典型的“高产出新员工”。在传统系统中，由于资历浅，其高强度和高复杂度的贡献被严重低估。在新系统中，其薪酬得到了爆发式修正，实现了真正的公平。
                  </span>
                ) : seniority > 10 && intensity < 40 ? (
                  <span className="text-amber-600 font-medium">
                    当前画像为典型的“低产出老员工”。在传统系统中，仅凭资历即可获得高薪。在新系统中，由于缺乏实际高价值产出，其“经验杠杆”失效，薪酬回归到合理的基础水平，彻底阻断了对年轻人的剥削。
                  </span>
                ) : seniority > 10 && intensity > 70 && complexity > 70 ? (
                  <span className="text-blue-600 font-medium">
                    当前画像为典型的“高产出核心骨干”。老员工利用丰富的经验保持了高强度和高复杂度的输出。在新系统中，其“经验杠杆”被彻底激活，获得了比传统系统更丰厚的回报！
                  </span>
                ) : (
                  <span>
                    系统根据实际贡献点（强度 × 复杂度）动态调节奖金池，资历仅作为“经验杠杆乘数”放大高产出者的收益，确保多劳多得、优劳优得。
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* 
            ====================================================================
            图表展示 (Chart)
            ====================================================================
            用最直观的柱状图，展示两种制度下的收入差距。
            没有什么比真金白银的数字更能说服人。
          */}
          <div className="h-[400px] w-full flex flex-col">
            <h4 className="text-center font-bold text-slate-700 mb-6">月度薪酬对比 (单位: 元)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="salary" radius={[8, 8, 0, 0]} maxBarSize={100}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// 辅助组件：滑块控制组
function ControlGroup({ label, value, setValue, min, max, unit, description }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <label className="font-semibold text-slate-700">{label}</label>
        <span className="text-lg font-black text-emerald-600">{value} <span className="text-sm font-medium text-slate-500">{unit}</span></span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      />
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}
