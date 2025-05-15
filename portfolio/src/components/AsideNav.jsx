/* ---------------- components/AsideNav.jsx ---------------- */
import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, BadgeCheck, Code2, Mail, BookOpen } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'about', label: 'Обо мне', icon: User },
  { id: 'skills', label: 'Скиллы', icon: BadgeCheck },
  { id: 'projects', label: 'Проекты', icon: Code2 },
  { id: 'education', label: 'Образование', icon: BookOpen },
  { id: 'certs', label: 'Сертификаты', icon: BadgeCheck },
  { id: 'contact', label: 'Контакты', icon: Mail },
];

export default function AsideNav({ current, onChange }) {
  return (
      <aside className="overflow-auto flex justify-center flex-col w-full md:w-64 h-auto md:h-screen sticky top-0 p-4 m-0 md:m-4 bg-white rounded-none md:rounded-3xl shadow-inner">
      <nav className="flex flex-row md:flex-col gap-2 mt-6 justify-around md:justify-start">
        {navItems.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => onChange(id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              current === id ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-slate-800 hover:bg-blue-200'
            }`}
          >
            <Icon icon={Icon} size={20} /> {label}
          </motion.button>
        ))}
      </nav>
    </aside>
  );
}