/* ---------------- sections/About.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';

const timeline = [
      {
      year: "2022",
      title: "Первая стажировка",
      desc: "Погрузился в корпоративный фронтенд, освободился от страха перед чужим кодом и Jira."
    },
    {
      year: "2023",
      title: "Победа на хакатоне",
      desc: "Наш стартап-бот для налоговых вычетов взял 1 место из 72 команд. Не без моей анимации загрузки 🌟."
    },
    {
      year: "2024",
      title: "Запуск SaaS-сервиса",
      desc: "Сolo-dev: React + Firebase + Stripe. 500+ активных пользователей спустя две недели."
    }
];

export default function About({ onContact }) {
  return (
    <>
      <section>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Обо мне</h2>
              <p className="text-slate-600 max-w-3xl">
                Я увлечён технологиями и финансами: днём оптимизирую React-приложения, вечером разбираюсь в налоговых льготах
                и сложных отчётностях. Люблю качественный дизайн, читаю MDN вместо романов и считаю, что хороший интерфейс
                экономит пользователю время так же, как грамотная налоговая стратегия экономит деньги.
              </p>
            </section>
      {/* Timeline */}
                  <section>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-8">Путь развития</h3>
                    <div className="relative ml-4 border-l-2 border-slate-200 pl-6 space-y-10">
                      {timeline.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="relative"
                        >
                          <span className="absolute -left-[17px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600"></span>
                          <h4 className="text-lg font-medium text-slate-800">{item.year} — {item.title}</h4>
                          <p className="text-slate-600 text-sm mt-1 max-w-xl">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
      <CTA onContact={onContact} />
    </>
  );
}