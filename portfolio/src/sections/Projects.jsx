/* ---------------- sections/Projects.jsx ---------------- */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import Testimonials from '../components/Testimonials';

  const categories = [
    { id: "all", label: "Все" },
    { id: "dashboard", label: "Дашборды" },
    { id: "landing", label: "Сайт-лендинги" },
    { id: "saas", label: "SaaS" },
    { id: "mobile", label: "Мобильные" }
  ];
  const projects = [
    {
      id: 1,
      title: "FinDash – финанс. дашборд",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=60",
      category: "dashboard",
      tech: "React, Recharts, Zustand",
      desc: "Интерактивная визуализация финансовых KPI для SMB-клиентов.",
      demo: "https://findash.example.com",
      repo: "https://github.com/abobus/findash"
    },
    {
      id: 2,
      title: "Barista-Landing",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=60",
      category: "landing",
      tech: "Next.js, Tailwind, Framer Motion",
      desc: "Сайт-визитка для кофейни с плавной анимацией и магазином мерча.",
      demo: "https://barista.example.com",
      repo: "https://github.com/abobus/barista-landing"
    },
    {
      id: 3,
      title: "TaxWise AI Bot",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=60",
      category: "saas",
      tech: "React, OpenAI, Supabase",
      desc: "Помощник ответит на вопросы о налогах в реальном времени.",
      demo: "https://taxwise.example.com",
      repo: "https://github.com/abobus/taxwise-bot"
    },
    {
      id: 4,
      title: "EcoMobile – трекер отходов",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=60",
      category: "mobile",
      tech: "React Native, Expo",
      desc: "Геймификация сортировки мусора с ежедневными челленджами.",
      demo: "https://expo.dev/@abobus/ecomobile",
      repo: "https://github.com/abobus/ecomobile"
    }
  ];
  const testimonials = [
  { name: 'Иван Иванов', text: 'Отличная работа, всё было сделано вовремя!' },
  { name: 'Мария Петрова', text: 'Профессионализм и креативность на высоте.' }
];  
export default function Projects({ onContact }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter==='all'?projects:projects.filter(p=>p.category===filter);
  return (
    <>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Проекты</h2>
      <div className="flex gap-3 mb-6">{categories.map(c=><button key={c.id} onClick={()=>setFilter(c.id)} className={`px-4 py-1 rounded-full ${filter===c.id?'bg-blue-600 text-white':'bg-white border'}`}>{c.label}</button>)}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{filtered.map(p=>(
        <motion.div key={p.id} whileHover={{y:-6}} className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <img src={p.img} alt={p.title} className="h-48 w-full object-cover"/>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div><h3 className="font-semibold text-slate-800">{p.title}</h3><p className="text-sm text-slate-500 mt-2 mb-4">{p.desc}</p><span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{p.tech}</span></div>
            <div className="mt-4 flex gap-2"><a href={p.demo} target="_blank" className="underline">Demo</a><a href={p.repo} target="_blank" className="underline">Code</a></div>
          </div>
        </motion.div>
      ))}</div>
      <CTA onContact={onContact} />
      <Testimonials testimonials={testimonials} />

    </>
  );
}