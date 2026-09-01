'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSent(true);
    toast.success('Thank you! Your message has been received. We will respond within 24 hours.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-bold text-brand-forest-700 dark:text-emerald-400 uppercase tracking-widest">
          We&apos;re Here to Help
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white">
          Contact Customer Care & Inquiries
        </h1>
        <p className="text-sm text-brand-charcoal-600 dark:text-zinc-400">
          Have a question about product dimensions, warranty claims, school bulk orders, or corporate gifting? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-forest-100 dark:bg-brand-forest-950/80 text-brand-forest-800 dark:text-emerald-400 flex items-center justify-center shrink-0 border dark:border-brand-forest-800">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100">Email Support</h4>
                <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">Response within 24 hours</p>
                <a
                  href="mailto:urbanessentsialindia@gmail.com"
                  className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline mt-1 block"
                >
                  urbanessentsialindia@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-forest-100 dark:bg-brand-forest-950/80 text-brand-forest-800 dark:text-emerald-400 flex items-center justify-center shrink-0 border dark:border-brand-forest-800">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100">WhatsApp & Phone Support</h4>
                <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                <a
                  href="tel:8310082568"
                  className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline mt-1 block"
                >
                  +91 83100 82568
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-forest-100 dark:bg-brand-forest-950/80 text-brand-forest-800 dark:text-emerald-400 flex items-center justify-center shrink-0 border dark:border-brand-forest-800">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100">Registered Office</h4>
                <p className="text-xs text-brand-charcoal-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  Urban Essentials<br />
                  C-825, Gaur Sidhartam, Sidhart Vihar, Ghaziabad, 201009
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brand-forest-900 dark:bg-zinc-900 text-white rounded-3xl p-6 border border-brand-forest-800 dark:border-zinc-800 space-y-2">
            <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-amber-400" />
              <span>School & Institutional Bulk Orders</span>
            </h4>
            <p className="text-xs text-brand-cream-200 dark:text-zinc-300 leading-relaxed">
              We provide custom logo embossing and bulk volume discounts for schools, universities, and corporate onboarding packages.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white mb-6 pb-3 border-b border-brand-cream-200 dark:border-zinc-800">
            Send us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
              >
                <option value="Product Inquiry">Product Details & Specs</option>
                <option value="Order Tracking">Order Status / Tracking</option>
                <option value="Warranty Claim">1-Year Warranty Claim</option>
                <option value="Bulk/School Order">School / Corporate Bulk Order</option>
                <option value="Other">Other Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                Message *
              </label>
              <textarea
                rows={5}
                required
                placeholder="How can we assist you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
