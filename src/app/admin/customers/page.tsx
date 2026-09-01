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
  Plus,
  Trash2,
  Eye,
  Crown,
  X,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLiveCustomers, CustomerSummary } from '@/lib/customerStore';
import { useLiveOrders } from '@/lib/orderStore';
import { toast } from 'sonner';

export default function AdminCustomersPage() {
  const { customers, saveCustomer, deleteCustomer } = useLiveCustomers();
  const { orders } = useLiveOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSegment, setFilterSegment] = useState<'all' | 'vip' | 'active'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newStatus, setNewStatus] = useState<'active' | 'vip' | 'inactive'>('active');


  const filteredCustomers = customers.filter((c) => {
    if (filterSegment === 'vip' && c.status !== 'vip') return false;
    if (filterSegment === 'active' && c.status === 'inactive') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchPhone = (c.phone || '').includes(q);
      const matchCity = (c.city || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchCity) return false;
    }

    return true;
  });

  const totalRegistered = customers.length;
  const totalRevenue = customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0);
  const avgSpend = totalRegistered > 0 ? Math.round(totalRevenue / totalRegistered) : 0;
  const vipCount = customers.filter((c) => c.status === 'vip').length;

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      toast.error('Name and email are required');
      return;
    }

    const created: CustomerSummary = {
      id: `cust_${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || '+91 98765 00000',
      city: newCity.trim(),
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0,
      status: newStatus,
    };

    saveCustomer(created);
    toast.success(`Customer profile for "${created.name}" created!`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete customer "${name}"?`)) {
      deleteCustomer(id);
      if (selectedCustomer?.id === id) setSelectedCustomer(null);
      toast.info(`Deleted customer "${name}"`);
    }
  };

  // Get customer's specific orders
  const customerOrders = selectedCustomer
    ? orders.filter(
        (o) =>
          (o.guest_email || '').toLowerCase() === selectedCustomer.email.toLowerCase() ||
          (o.shipping_address?.email || '').toLowerCase() === selectedCustomer.email.toLowerCase() ||
          o.shipping_address?.full_name?.toLowerCase() === selectedCustomer.name.toLowerCase()
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Customer Directory & LTV
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
            Monitor customer spend profiles, lifetime value, and complete chronological purchase histories.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[11px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider">
            Total Customers
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white mt-1">
            {totalRegistered}
          </div>
          <span className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400 font-semibold mt-1 block">
            {vipCount} VIP patrons
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[11px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider">
            Total Customer LTV
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white mt-1">
            {formatCurrency(totalRevenue)}
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">
            Cumulative Sales
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[11px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider">
            Average Spend / Patron
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white mt-1">
            {formatCurrency(avgSpend)}
          </div>
          <span className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400 mt-1 block">
            Across {orders.length} orders
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            VIP Tier Accounts
          </span>
          <div className="font-serif font-extrabold text-2xl text-amber-800 dark:text-amber-300 mt-1">
            {vipCount}
          </div>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-1 block">
            Highest LTV Tier
          </span>
        </div>
      </div>

      {/* Search & Segment Toolbar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(['all', 'vip', 'active'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setFilterSegment(seg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors ${
                  filterSegment === seg
                    ? 'bg-brand-forest-800 text-white shadow-xs'
                    : 'bg-brand-cream-100 dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700'
                }`}
              >
                {seg === 'all' ? 'All Customers' : seg === 'vip' ? '⭐ VIP Only' : 'Active'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search customer name, email, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-brand-charcoal-500 dark:text-zinc-400 pt-1 border-t border-brand-cream-200 dark:border-zinc-800">
          <span>
            Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
          </span>
          {(filterSegment !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setFilterSegment('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-cream-100/70 dark:bg-zinc-800/80 text-brand-charcoal-700 dark:text-zinc-300 font-bold border-b border-brand-cream-300 dark:border-zinc-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact & City</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6">Total Orders</th>
                <th className="py-4 px-6">Total Spend (LTV)</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800 text-brand-charcoal-800 dark:text-zinc-200">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brand-charcoal-400 dark:text-zinc-500">
                    No customers match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                    {/* Customer Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-forest-800 text-white font-serif font-bold text-sm flex items-center justify-center shadow-xs">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal-900 dark:text-zinc-100">{c.name}</p>
                          <span className="text-[10px] font-mono text-brand-charcoal-400 dark:text-zinc-500">ID: {c.id.slice(0, 10)}</span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-brand-charcoal-700 dark:text-zinc-300">
                        <Mail className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-500" />
                        <span>{c.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-brand-charcoal-500 dark:text-zinc-400 text-[11px]">
                        <Phone className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-500" />
                        <span>{c.phone || 'N/A'}</span>
                        {c.city && <span>• {c.city}</span>}
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-brand-charcoal-600 dark:text-zinc-400">
                        <Calendar className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-500" />
                        <span>{c.joinedDate}</span>
                      </div>
                    </td>

                    {/* Orders Count */}
                    <td className="py-4 px-6 font-bold text-brand-charcoal-900 dark:text-zinc-100">
                      {c.ordersCount} Order{c.ordersCount !== 1 ? 's' : ''}
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-6 font-extrabold text-brand-forest-950 dark:text-white">
                      {formatCurrency(c.totalSpent)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          c.status === 'vip'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : c.status === 'active'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        {c.status === 'vip' && <Crown className="w-3 h-3 text-amber-600 dark:text-amber-400" />}
                        <span>{c.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCustomer(c)}
                          className="p-1.5 text-brand-forest-800 dark:text-emerald-400 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          title="View customer profile and order history"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          className="p-1.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details & History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedCustomer(null)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-forest-800 text-white font-serif font-extrabold text-xl flex items-center justify-center">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white flex items-center gap-2">
                    <span>{selectedCustomer.name}</span>
                    {selectedCustomer.status === 'vip' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        VIP PATRON
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400">{selectedCustomer.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 bg-brand-cream-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-brand-cream-300 dark:border-zinc-700 text-center">
              <div>
                <span className="text-[10px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase">Lifetime Orders</span>
                <div className="font-extrabold text-lg text-brand-forest-950 dark:text-white mt-0.5">{selectedCustomer.ordersCount}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase">Total Spend (LTV)</span>
                <div className="font-extrabold text-lg text-emerald-800 dark:text-emerald-400 mt-0.5">{formatCurrency(selectedCustomer.totalSpent)}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase">Member Since</span>
                <div className="font-bold text-xs text-brand-charcoal-700 dark:text-zinc-300 mt-1">{selectedCustomer.joinedDate}</div>
              </div>
            </div>

            {/* Purchase History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 uppercase tracking-wider">
                Order History ({customerOrders.length})
              </h4>
              {customerOrders.length === 0 ? (
                <div className="p-6 text-center text-xs text-brand-charcoal-400 dark:text-zinc-500 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl">
                  No orders recorded for this customer email yet.
                </div>
              ) : (
                <div className="divide-y divide-brand-cream-200 dark:divide-zinc-700 border border-brand-cream-300 dark:border-zinc-700 rounded-2xl overflow-hidden">
                  {customerOrders.map((ord) => (
                    <div key={ord.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <div>
                        <div className="font-bold text-brand-forest-950 dark:text-white font-mono">#{ord.order_number}</div>
                        <div className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
                          {(ord.items || []).map((i) => `${i.product_name} (x${i.quantity})`).join(', ')}
                        </div>
                        <div className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 mt-0.5">
                          {new Date(ord.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-brand-forest-950 dark:text-white">{formatCurrency(ord.total_amount)}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-brand-cream-200 dark:bg-zinc-700 text-brand-charcoal-800 dark:text-zinc-200">
                          {ord.order_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end border-t border-brand-cream-300 dark:border-zinc-800">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Patron Registry
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Add New Customer
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Customer full name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="customer@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Tier / Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                >
                  <option value="active">Active Customer</option>
                  <option value="vip">VIP Patron</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
