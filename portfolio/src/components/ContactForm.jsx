/* ---------------- components/ContactForm.jsx ---------------- */
import React, { useRef, useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        formRef.current.reset();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch(err => {
        alert(`Ошибка отправки: ${err.text || 'проверьте интернет'}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Оставьте заявку на обратную связь</h1>
      {['name', 'email'].map(field => (
        <div key={field} className="grid gap-1">
          <label htmlFor={field} className="text-sm font-medium">{field === 'name' ? 'Имя' : 'Email'}</label>
          <input
            id={field}
            name={field}
            required
            type={field}
            placeholder={field === 'name' ? 'Иван Иванов' : 'you@example.com'}
            className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      ))}
      <div className="grid gap-1">
        <label htmlFor="message" className="text-sm font-medium">Сообщение</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Ваше сообщение…"
          className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl">
        {loading ? <Loader className="animate-spin" /> : <Mail />} {loading ? 'Отправляем...' : submitted ? 'Отправлено!' : 'Отправить'}
      </button>
    </form>
  );
}