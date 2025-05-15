/* ---------------- sections/Education.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';

  const education = [
    {
      institution: "Университет Экономики",
      degree: "Бакалавр, Налоги и налогообложение",
      period: "2021–2025",
      details: "Исследовал налоговые стратегии. Автор 2 статей в студенческом журнале.",
      courses: ["Налоговое право", "Финансовый анализ", "Корпоративные финансы"]
    }
  ];

export default function Education() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Образование</h2>
      {education.map((e,i)=>(
        <motion.div key={i} className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-slate-800">{e.degree}, {e.institution}</h3>
          <span className="text-sm text-slate-500">{e.period}</span>
          <p className="mt-2 text-slate-600">{e.details}</p>
          <ul className="list-disc list-inside text-slate-600 mt-2">{e.courses.map((c,j)=><li key={j}>{c}</li>)}</ul>
        </motion.div>
      ))}
    </div>
  );
}
