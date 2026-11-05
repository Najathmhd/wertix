"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Clock,
  Globe,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all duration-150";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "New Project Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Label>Contact WERTIX</Label>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-xl text-balance">
            Let&apos;s talk about your next project.
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            Have questions about our managed services or specialist availability?
            Reach out — we respond within 24 business hours.
          </p>
        </div>
      </section>

      {/* ── Contact content ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left: contact info */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-lg font-bold text-[#090D1A]">Direct Inquiries</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We engage with clients globally for dedicated project sprints, continuous digital operations, and technical consulting.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: <a href="mailto:hello@wertix.lk" className="font-bold text-[#090D1A] hover:text-[#0055e5] transition-colors duration-150">hello@wertix.lk</a>,
                    note: "Direct inbox for scoping, RFPs, and service inquiries",
                  },
                  {
                    icon: Clock,
                    label: "Response Cadence",
                    value: <span className="font-bold text-[#090D1A]">Within 24 Hours</span>,
                    note: "Mon–Fri, 9:00 AM – 6:00 PM (GMT+5:30)",
                  },
                  {
                    icon: Globe,
                    label: "Location",
                    value: <span className="font-bold text-[#090D1A]">Colombo, Sri Lanka & Remote</span>,
                    note: "Official domain: wertix.lk",
                  },
                ].map(({ icon: Icon, label, value, note }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0055e5] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-0.5">
                        {label}
                      </span>
                      <div className="text-sm">{value}</div>
                      <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#f0f5ff] border border-blue-200 text-xs">
                <p className="font-semibold text-[#090D1A] mb-1 text-sm">Looking for a detailed quote?</p>
                <p className="text-slate-600 leading-relaxed mb-3">
                  Our interactive scoping questionnaire walks through timeline, budget, and disciplines.
                </p>
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-1.5 font-bold text-[#0055e5] hover:text-[#0047c5] transition-colors duration-150"
                >
                  Launch Project Scoping Tool
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="lg:col-span-8">
              <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-[#f8fafc]">
                <h2 className="text-lg font-bold text-[#090D1A] mb-1">Send a Message</h2>
                <p className="text-xs text-slate-500 mb-5">
                  Fill out the form below to initiate a conversation with our project leads.
                </p>

                {/* Prototype notice */}
                <div className="mb-5 p-3 rounded-lg bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-500">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-slate-700">Prototype preview:</strong> Submissions are simulated locally. For real communications, email{" "}
                    <a href="mailto:hello@wertix.lk" className="text-[#0055e5] underline font-medium">
                      hello@wertix.lk
                    </a>
                    .
                  </span>
                </div>

                {submitted ? (
                  <div className="py-10 flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0055e5] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Thank you!</h3>
                    <p className="text-sm text-slate-600 max-w-xs">
                      In a production deployment this would reach our inbox. For live contact: {" "}
                      <a href="mailto:hello@wertix.lk" className="text-[#0055e5] underline">
                        hello@wertix.lk
                      </a>
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors duration-150"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-name">
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Mercer"
                          className={inputClass}
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-email">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className={inputClass}
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-subject">
                        Inquiry Category
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={inputClass}
                      >
                        <option>New Project Scoping</option>
                        <option>Dedicated Specialist Squad</option>
                        <option>Web & Technology Build</option>
                        <option>Data & Applied AI</option>
                        <option>Design & UI/UX</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="contact-message">
                        Message / Project Overview *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe your objectives, current stage, and expected timeframe..."
                        className={inputClass}
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150"
                      >
                        Submit Message
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
