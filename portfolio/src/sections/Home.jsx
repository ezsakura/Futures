/* ---------------- sections/Home.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import CTA from '../components/CTA';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Front-End', value: 55 },
  { name: 'Back-End', value: 10 },
  { name: 'Кофе ☕️', value: 35 }
];
const COLORS = ['#A3CEF1', '#C1E1C1', '#FFE5B4'];

const Text = [ {
  name: 'sakura' 
},
{
  desc :'Front-End разработчик, любитель чистого кода, по совместительству профессиональный дегустатор латте. Создаю быстро работающие интерфейсы и превращаю сухие таблицы в сочные графики.'
}
 ];

export default function Home({ onContact }) {
  return (
    <>
      <section className=" text-center p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-teal-50 to-yellow-50 shadow-inner">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="
                  text-3xl    /* по умолчанию на самых маленьких экранах */
                  sm:text-4xl /* от sm (640px) и выше */
                  md:text-5xl /* от md (768px) и выше */
                  lg:text-6xl /* от lg (1024px) и выше */
                  xl:text-7xl /* от xl (1280px) и выше */
                  font-extrabold
                  leading-tight
                  text-slate-800
                  break-words    /* даёт возможность переноса слов при нехватке места */
                "
              >
                Привет! Я {Text.map((item, index) => (
                 <span key={index}> {item.name} </span> 
                ))}
                <span className="inline-block origin-[70%_70%] animate-wiggle">👋</span>
              </motion.h1>

              <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                {Text.map((item, index) => (
                 <span key={index}> {item.desc} </span> 
                ))}
              </p>
            </section>
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Опыт" number="1+ год" note="в веб-разработке" color="blue" />
          <StatCard title="Проекты" number="3" note="от лендингов до дашбордов" color="emerald" />
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