'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ShieldCheck,
  Plus,
  Trash2,
  Calendar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatCurrency } from '@/lib/utils';
import { Address } from '@/types';
import { toast } from 'sonner';

export default function AccountPage() {
  const { user, signOut, demoLoginAsCustomer, demoLoginAsAdmin, isAdmin } = useAuth();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Saved Addresses State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      full_name: user?.full_name || 'Aryan Sharma',
      email: user?.email || 'aryan@gmail.com',
      phone: '9876543210',
      address_line1: 'Flat 402, Green Meadows Apartment',
      address_line2: 'Sector 14, Main Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postal_code: '560001',
      country: 'India',
      is_default: true,
      address_type: 'home',
    },
  ]);

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLine1, setNewLine1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Karnataka');
  const [newPostalCode, setNewPostalCode] = useState('');

  // Sample Past Orders
  const sampleOrders = [
    {
      id: 'ord-101',
      order_number: 'KUR-2026-9042',
      date: '2026-08-25',
      total_amount: 1499,
      status: 'delivered',
      items: [
        {
          name: 'KURA Bento Pro Modular Lunch Box',
          variant: 'Forest Green (1200ml)',
          quantity: 1,
          price: 1499,
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    {
      id: 'ord-102',
      order_number: 'KUR-2026-8819',
      date: '2026-08-14',
      total_amount: 3299,
      status: 'shipped',
      items: [
        {
          name: 'The Ultimate Back-to-Campus Starter Bundle',
          variant: 'Forest Harmony Edition',
          quantity: 1,
          price: 3299,
          image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
  ];

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newLine1 || !newCity || !newPostalCode) {
      toast.error('Please fill in all address fields');
      return;
    }
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      full_name: newFullName,
      email: user?.email || '',
      phone: newPhone,
      address_line1: newLine1,
      city: newCity,
      state: newState,
      postal_code: newPostalCode,
      country: 'India',
      is_default: addresses.length === 0,
      address_type: 'home',
    };
    setAddresses([...addresses, newAddr]);
    toast.success('New address added');
    setIsAddAddressOpen(false);
    setNewFullName('');
    setNewPhone('');
    setNewLine1('');
    setNewCity('');
    setNewPostalCode('');
  };

  const handleDeleteAddress = (id?: string) => {
    if (!id) return;
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.info('Address removed');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Account Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-cream-300 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-forest-800 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-extrabold text-2xl text-brand-forest-950">
                {user ? user.full_name || user.email : 'Guest Customer'}
              </h1>
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-forest-800 text-white">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-brand-charcoal-500 mt-0.5">
              {user?.email || 'Sign in to access your order history and saved cards.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2.5 bg-brand-forest-50 hover:bg-brand-forest-100 text-brand-forest-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-forest-700" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <button
                onClick={signOut}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={demoLoginAsCustomer}
                className="px-4 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sign In Demo Customer</span>
              </button>
              <button
                onClick={demoLoginAsAdmin}
                className="px-4 py-2.5 bg-brand-cream-200 hover:bg-brand-cream-300 text-brand-forest-950 rounded-xl text-xs font-bold"
              >
                Demo Admin
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs & Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-brand-cream-300 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-brand-forest-800 text-white shadow-sm'
                : 'text-brand-charcoal-700 hover:bg-brand-cream-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Invoices</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'addresses'
                ? 'bg-brand-forest-800 text-white shadow-sm'
                : 'text-brand-charcoal-700 hover:bg-brand-cream-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({addresses.length})</span>
          </button>

          <Link
            href="/wishlist"
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-brand-charcoal-700 hover:bg-brand-cream-100 transition-colors"
          >
            <span className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-brand-cream-200 text-brand-charcoal-800 text-[10px]">
              {wishlistCount}
            </span>
          </Link>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-brand-forest-800 text-white shadow-sm'
                : 'text-brand-charcoal-700 hover:bg-brand-cream-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-9">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-xl text-brand-forest-950">
                Order History
              </h2>

              <div className="space-y-4">
                {sampleOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-3xl p-6 border border-brand-cream-300 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-cream-200 gap-2">
                      <div>
                        <span className="text-[11px] text-brand-charcoal-400">Order ID:</span>
                        <div className="font-mono font-bold text-sm text-brand-forest-950">
                          #{ord.order_number}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-brand-charcoal-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {ord.date}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-3">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-cream-100 border border-brand-cream-300 shrink-0">
                            <Image
                              src={it.image}
                              alt={it.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-brand-charcoal-900 truncate">
                              {it.name}
                            </p>
                            <p className="text-[11px] text-brand-charcoal-500">
                              {it.variant} • Qty: {it.quantity}
                            </p>
                          </div>
                          <div className="font-extrabold text-xs text-brand-forest-950">
                            {formatCurrency(it.price)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-brand-cream-200 flex items-center justify-between">
                      <div className="text-xs text-brand-charcoal-500">
                        Total Amount Paid:{' '}
                        <strong className="text-brand-forest-950 font-extrabold text-sm">
                          {formatCurrency(ord.total_amount)}
                        </strong>
                      </div>
                      <Link
                        href={`/order-success/${ord.order_number}`}
                        className="text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950 flex items-center gap-1"
                      >
                        <span>View Tracking & Receipt</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-bold text-xl text-brand-forest-950">
                  Saved Shipping Addresses
                </h2>
                <button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-white rounded-3xl p-6 border border-brand-cream-300 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-forest-800 bg-brand-forest-50 px-2 py-0.5 rounded">
                          {addr.address_type}
                        </span>
                        {addr.is_default && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-brand-charcoal-900">
                        {addr.full_name}
                      </h4>
                      <p className="text-xs text-brand-charcoal-600 mt-1 leading-relaxed">
                        {addr.address_line1}
                        {addr.address_line2 && `, ${addr.address_line2}`}
                        <br />
                        {addr.city}, {addr.state} - {addr.postal_code}
                      </p>
                      <p className="text-xs text-brand-charcoal-500 mt-2">
                        Phone: <strong>+91 {addr.phone}</strong>
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-brand-cream-200 flex justify-end">
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {isAddAddressOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                    onClick={() => setIsAddAddressOpen(false)}
                  />
                  <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 animate-slide-up">
                    <h3 className="font-serif font-bold text-lg text-brand-forest-950 mb-4 pb-2 border-b border-brand-cream-300">
                      Add New Delivery Address
                    </h3>
                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                          Flat / Street / Area *
                        </label>
                        <input
                          type="text"
                          required
                          value={newLine1}
                          onChange={(e) => setNewLine1(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={newPostalCode}
                            onChange={(e) => setNewPostalCode(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddAddressOpen(false)}
                          className="px-4 py-2 border border-brand-cream-300 rounded-xl text-xs font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-cream-300 shadow-xs space-y-6">
              <h2 className="font-serif font-bold text-xl text-brand-forest-950 pb-3 border-b border-brand-cream-200">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.full_name || 'Aryan Sharma'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user?.email || 'aryan@gmail.com'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-300 bg-brand-cream-100 text-xs text-brand-charcoal-600"
                  />
                </div>
              </div>
              <button
                onClick={() => toast.success('Profile updated successfully')}
                className="px-6 py-2.5 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
