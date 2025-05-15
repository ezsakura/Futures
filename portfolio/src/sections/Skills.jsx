/* ---------------- sections/Skills.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';

  const skills = [
    { name: "HTML5 & CSS3", level: 90, years: 3, desc: "Pixel-perfect layouts, responsive design, BEM/SMACSS" },
    { name: "JavaScript (ES6+)", level: 85, years: 3, desc: "Modern JS, DOM manipulation, fetch API" },
    { name: "React & Hooks", level: 82, years: 2, desc: "Custom hooks, context, performance optimizations" },
    { name: "TypeScript", level: 70, years: 1.5, desc: "Типизация, generics, интеграция в React" },
    { name: "Recharts & D3.js", level: 65, years: 1, desc: "Интерактивные диаграммы и графики" },
    { name: "Tailwind CSS", level: 80, years: 2, desc: "Utility-first подход и кастомные конфиги" }
  ];

export default function Skills() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Скиллы</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{skills.map((s, i) => (
        <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,delay:i*0.05}} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
          <h4 className="text-lg font-medium text-slate-800 mb-2">{s.name}</h4>
          <div className="w-full bg-slate-100 rounded-full h-2"><div style={{width:`${s.level}%`}} className="h-2 rounded-full bg-blue-600"/></div>
          <p className="text-xs text-slate-500 mt-2">{s.level}% уверенности</p>
          <p className="text-sm text-slate-600 mt-1">Опыт: {s.years} лет</p>
          <p className="text-sm italic mt-1 text-slate-600">{s.desc}</p>
        </motion.div>
      ))}</div>
    </div>
  );
}