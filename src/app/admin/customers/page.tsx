'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  status: 'active' | 'vip' | 'inactive';
}

const INITIAL_CUSTOMERS: CustomerSummary[] = [
  {
    id: 'cust-1',
    name: 'Aryan Sharma',
    email: 'aryan@example.com',
    phone: '+91 98765 43210',
    joinedDate: '2026-07-12',
    ordersCount: 4,
    totalSpent: 9296,
    status: 'vip',
  },
  {
    id: 'cust-2',
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    phone: '+91 98112 34567',
    joinedDate: '2026-08-01',
    ordersCount: 2,
    totalSpent: 3998,
    status: 'active',
  },
  {
    id: 'cust-3',
    name: 'Rohan Mehra',
    email: 'rohan.student@du.ac.in',
    phone: '+91 98223 88990',
    joinedDate: '2026-08-15',
    ordersCount: 1,
    totalSpent: 1299,
    status: 'active',
  },
  {
    id: 'cust-4',
    name: 'Sneha Rao',
    email: 'sneha.rao@techcorp.in',
    phone: '+91 97334 11223',
    joinedDate: '2026-08-20',
    ordersCount: 3,
    totalSpent: 6797,
    status: 'vip',
  },
  {
    id: 'cust-5',
    name: 'Karan Joshi',
    email: 'karan.j@gmail.com',
    phone: '+91 96556 77889',
    joinedDate: '2026-08-28',
    ordersCount: 1,
    totalSpent: 899,
    status: 'active',
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerSummary[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const totalRegistered = customers.length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgSpend = Math.round(totalRevenue / totalRegistered);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
            Customer Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-500 mt-0.5">
            Monitor customer spend profiles, lifetime value, and order history.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-brand-cream-300 shadow-xs">
          <span className="text-[11px] font-bold text-brand-charcoal-500 uppercase tracking-wider">
            Total Customers
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 mt-1">
            {totalRegistered}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
            +18% growth this month
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-cream-300 shadow-xs">
          <span className="text-[11px] font-bold text-brand-charcoal-500 uppercase tracking-wider">
            Total Customer LTV
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 mt-1">
            {formatCurrency(totalRevenue)}
          </div>
          <span className="text-[10px] text-brand-charcoal-500 mt-1 block">
            Verified online payments
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-cream-300 shadow-xs">
          <span className="text-[11px] font-bold text-brand-charcoal-500 uppercase tracking-wider">
            Average Spend / Customer
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 mt-1">
            {formatCurrency(avgSpend)}
          </div>
          <span className="text-[10px] text-brand-charcoal-500 mt-1 block">
            2.2 avg orders per user
          </span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-3xl border border-brand-cream-300 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-brand-charcoal-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by customer name, email address, or mobile number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs text-brand-charcoal-800 placeholder-brand-charcoal-400 bg-transparent focus:outline-none"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-brand-cream-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-cream-50 text-brand-charcoal-700 font-bold border-b border-brand-cream-300 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Member Since</th>
                <th className="py-4 px-6">Total Orders</th>
                <th className="py-4 px-6">Total Spend</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200 text-brand-charcoal-800">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brand-charcoal-400">
                    No customers found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-cream-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-forest-800 text-white font-serif font-bold text-sm flex items-center justify-center shadow-xs">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal-900">{c.name}</p>
                          <span className="text-[10px] text-brand-charcoal-400">ID: {c.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-brand-charcoal-700">
                        <Mail className="w-3 h-3 text-brand-charcoal-400" />
                        <span>{c.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-charcoal-500 text-[11px]">
                        <Phone className="w-3 h-3 text-brand-charcoal-400" />
                        <span>{c.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-brand-charcoal-600">
                        <Calendar className="w-3 h-3 text-brand-charcoal-400" />
                        <span>{c.joinedDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-brand-forest-950">
                      {c.ordersCount} orders
                    </td>
                    <td className="py-4 px-6 font-extrabold text-brand-forest-950">
                      {formatCurrency(c.totalSpent)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          c.status === 'vip'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 bg-brand-cream-200 hover:bg-brand-cream-300 text-brand-forest-900 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-brand-cream-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-forest-800 text-white font-serif font-bold text-base flex items-center justify-center">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-brand-forest-950">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-[11px] text-brand-charcoal-500">
                    Member since {selectedCustomer.joinedDate}
                  </span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  selectedCustomer.status === 'vip'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {selectedCustomer.status}
              </span>
            </div>

            <div className="space-y-2 text-xs text-brand-charcoal-700 bg-brand-cream-100 p-4 rounded-2xl">
              <div className="flex justify-between">
                <span>Email Address:</span>
                <strong className="text-brand-charcoal-900">{selectedCustomer.email}</strong>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <strong className="text-brand-charcoal-900">{selectedCustomer.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Orders:</span>
                <strong className="text-brand-charcoal-900">{selectedCustomer.ordersCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Lifetime Value:</span>
                <strong className="text-brand-forest-950 font-bold">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </strong>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
