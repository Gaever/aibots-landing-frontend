"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  storeLink: string;
  revenue: string;
  service: string;
}

interface ContactFormProps {
  title: string;
  subtitle: string;
  note: string;
  footnote: string;
  stillDoubting: string;
  demoText: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    link: string;
    revenue: string;
    service: string;
    submit: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    link: string;
    revenue: string;
    service: string;
  };
  revenueOptions: string[];
  serviceOptions: string[];
}

export function ContactForm({
  title,
  subtitle,
  note,
  footnote,
  stillDoubting,
  demoText,
  labels,
  placeholders,
  revenueOptions,
  serviceOptions,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    storeLink: "",
    revenue: "",
    service: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="relative px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">{title}</h2>
          {/* <p className="text-xl text-gray-600 font-light mb-3">{subtitle}</p> */}
          {/* <div className="inline-block px-5 py-2 rounded-full bg-emerald-100 border border-emerald-200">
            <p className="text-sm text-emerald-800 font-medium">{note}</p>
          </div> */}
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-2xl bg-white border border-gray-200 shadow-lg">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {labels.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={placeholders.name}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {labels.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={placeholders.email}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {labels.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={placeholders.phone}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="storeLink" className="block text-sm font-semibold text-gray-700 mb-2">
                  {labels.link}
                </label>
                <input
                  type="url"
                  id="storeLink"
                  name="storeLink"
                  value={formData.storeLink}
                  onChange={handleChange}
                  placeholder={placeholders.link}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="revenue" className="block text-sm font-semibold text-gray-700 mb-2">
                  {labels.revenue}
                </label>
                <select
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-gray-900 appearance-none cursor-pointer transition-all"
                  required
                >
                  <option value="">{placeholders.revenue}</option>
                  {revenueOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  {labels.service}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-gray-900 appearance-none cursor-pointer transition-all"
                  required
                >
                  <option value="">{placeholders.service}</option>
                  {serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5"
            >
              {labels.submit}
            </button>

            <p className="text-sm text-gray-500 text-center leading-relaxed font-light">{footnote}</p>
          </div>
        </form>

        <div className="mt-12 text-center p-8 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-gray-600 mb-2 text-base font-light">{stillDoubting}</p>
          <p className="text-lg text-gray-900 font-semibold">{demoText}</p>
        </div>
      </div>
    </section>
  );
}
