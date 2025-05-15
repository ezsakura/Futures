/* ---------------- sections/About.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';

const timeline = [
      {
      year: "2022",
      title: "МЦК-ЧЭМК",
      desc: "Получил специальность 'Разработчик Web и мультимедийных приложений.'"
    },
    {
      year: "2-ая половина 2022",
      title: "Первое место работы по профессии",
      desc: "В сентябре 2022 года, устроился 'Контент-менеджером' в hi-Tech studio. 🌟."
    },
    {
      year: "2-ая половина 2022",
      title: "Первый сертификат в 1C-Bitrix",
      desc: "На этом месте работы получил свой первый сертификат 'Контент-менеджер'."
    },
    {
      year: "2024",
      title: "Второе место работы",
      desc: "Приняли на позицию джун разработчика (по совместительству сис. админом)"
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