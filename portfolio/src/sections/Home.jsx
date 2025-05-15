/* ---------------- sections/Home.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import CTA from '../components/CTA';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Front-End', value: 55 },
  { name: 'Экономика', value: 25 },
  { name: 'Кофе ☕️', value: 20 }
];
const COLORS = ['#A3CEF1', '#C1E1C1', '#FFE5B4'];

export default function Home({ onContact }) {
  return (
    <>
      <section className=" text-center p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-teal-50 to-yellow-50 shadow-inner">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-extrabold leading-tight text-slate-800"
              >
                Привет! Я Константин Никифоров <span className="inline-block origin-[70%_70%] animate-wiggle">👋</span>
              </motion.h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                Front-End разработчик, любитель чистого кода, по совместительству
                профессиональный дегустатор латте. Создаю быстро работающие интерфейсы и превращаю сухие
                таблицы в сочные графики.
              </p>
            </section>
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Опыт" number="3+ года" note="в веб-разработке" color="blue" />
          <StatCard title="Проекты" number="15+" note="от лендингов до SaaS" color="emerald" />
          <StatCard title="Чашек кофе" number="~1000" note="и ни одной пролито ☕️" color="amber" />
        </div>
        <div className="w-full h-72 lg:h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} label>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
      <CTA onContact={onContact} />
    </>
  );
}