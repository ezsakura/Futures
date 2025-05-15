import React from 'react';
import { motion } from 'framer-motion';

const bgMap = {
  blue: 'bg-blue-50', emerald: 'bg-emerald-50', amber: 'bg-amber-50'
};

export default function StatCard({ title, number, note, color }) {
  return (
    <motion.div whileHover={{ y: -5 }} className={`${bgMap[color]} p-6 rounded-2xl shadow-inner`}>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>{number}</p>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </motion.div>
  );
}