"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  projectDescription: string;
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
    service: string;
    projectDescription: string;
    submit: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    service: string;
    projectDescription: string;
  };
  serviceOptions: string[];
  messages: {
    success: string;
    error: string;
  };
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
  serviceOptions,
  messages,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    projectDescription: "",
  });

  const sendToTelegramMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: [
            data.phone && `Телефон: ${data.phone}`,
            data.service && `Услуга: ${data.service}`,
            data.projectDescription && `Описание проекта:\n${data.projectDescription}`,
          ]
            .filter(Boolean)
            .join("\n\n"),
          meta: {
            source: "landing-contact-form",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        projectDescription: "",
      });
      // Show success message briefly before clearing or just keep it there
      // We'll use mutation state for this
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToTelegramMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    // Clear success/error status on change if we want, but TanStack query handles it better via reset or just staying there.
    // For now we just let the mutation state handle it.
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact-form" className="relative px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-0 sm:p-8 md:p-10 rounded-2xl bg-white md:border md:border-gray-200 md:shadow-lg"
        >
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                    text-gray-900 placeholder-gray-400 transition-all"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                    text-gray-900 placeholder-gray-400 transition-all"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                    text-gray-900 placeholder-gray-400 transition-all"
                  required
                />
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                    text-gray-900 appearance-none cursor-pointer transition-all"
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

            <div>
              <label
                htmlFor="projectDescription"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {labels.projectDescription}
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder={placeholders.projectDescription}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                  text-gray-900 placeholder-gray-400 transition-all resize-none"
              />
            </div>

            <div className="px-0">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base
                  hover:bg-indigo-700 transition-all duration-200 shadow-lg
                  shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/40
                  hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={sendToTelegramMutation.isPending}
              >
                {labels.submit}
              </button>
            </div>

            {sendToTelegramMutation.isSuccess && (
              <div className="p-4 rounded-xl bg-teal-500 text-white shadow-lg shadow-teal-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">
                    <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold">{messages.success}</p>
                </div>
              </div>
            )}

            {sendToTelegramMutation.isError && (
              <div className="p-4 rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-1 rounded-full">
                    <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold">{messages.error}</p>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 text-center leading-relaxed font-light">
              {footnote}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
