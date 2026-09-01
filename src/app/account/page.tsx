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
  Lock,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatCurrency } from '@/lib/utils';
import { Address } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';

import { useLiveOrders } from '@/lib/orderStore';

export default function AccountPage() {
  const { user, signOut, isAdmin, updateProfile } = useAuth();
  const { wishlistCount } = useWishlist();
  const { orders } = useLiveOrders();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Saved Addresses State
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLine1, setNewLine1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Karnataka');
  const [newPostalCode, setNewPostalCode] = useState('');

  // Profile Edit State
  const [profileName, setProfileName] = useState(user?.full_name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  // Filter real orders for this logged-in account
  const userOrders = user
    ? orders.filter(
        (o) =>
          o.user_id === user.id ||
          (o.guest_email || '').toLowerCase() === user.email.toLowerCase() ||
          (o.shipping_address?.email || '').toLowerCase() === user.email.toLowerCase()
      )
    : [];

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
    toast.success('New delivery address added');
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

  const handleSaveProfile = async () => {
    await updateProfile(profileName, profilePhone);
  };

  // If user is not logged in, render authenticated customer access prompt
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-18 h-18 rounded-3xl bg-brand-cream-200 flex items-center justify-center text-brand-forest-800 mx-auto border border-brand-cream-300 shadow-sm">
          <Lock className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
            Sign In to Your Account
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed max-w-md mx-auto">
            Please log in to view your order history, track deliveries, manage saved addresses, and view your personal wishlist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link href="/login">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Sign In with Email
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Create New Account
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Account Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-brand-cream-300 dark:border-zinc-800 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-forest-800 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md">
            {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white">
                {user.full_name || user.email}
              </h1>
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-forest-800 text-white">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2.5 bg-brand-forest-50 dark:bg-brand-forest-950/60 hover:bg-brand-forest-100 dark:hover:bg-brand-forest-900 text-brand-forest-900 dark:text-emerald-300 border dark:border-brand-forest-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
              <span>Admin Dashboard</span>
            </Link>
          )}
          <button
            onClick={signOut}
            className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-400 border dark:border-rose-900/60 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs & Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'orders'
                ? 'bg-brand-forest-800 text-white shadow-sm'
                : 'text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800'
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
                : 'text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({addresses.length})</span>
          </button>

          <Link
            href="/wishlist"
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-brand-cream-200 dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-200 text-[10px]">
              {wishlistCount}
            </span>
          </Link>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
              activeTab === 'profile'
                ? 'bg-brand-forest-800 text-white shadow-sm'
                : 'text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800'
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
              <h2 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                Order History
              </h2>

              {userOrders.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
                  <div className="w-14 h-14 bg-brand-cream-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-brand-forest-800 dark:text-emerald-400">
                    <Package className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white">No orders placed yet</h3>
                    <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 max-w-sm mx-auto mt-1">
                      You haven&apos;t placed any orders yet. When you place an order, it will appear here in real-time.
                    </p>
                  </div>
                  <Link href="/products" className="inline-block px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors">
                    Explore Catalog
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-cream-200 dark:border-zinc-800 gap-2">
                        <div>
                          <span className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500">Order ID:</span>
                          <div className="font-mono font-bold text-sm text-brand-forest-950 dark:text-white">
                            #{ord.order_number}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-brand-charcoal-500 dark:text-zinc-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(ord.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            ord.order_status === 'delivered'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          }`}>
                            {ord.order_status}
                          </span>
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="space-y-3">
                        {(ord.items || []).map((it, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                              <Image
                                src={it.product_image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'}
                                alt={it.product_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100 truncate">
                                {it.product_name}
                              </p>
                              <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
                                {it.variant_name || 'Standard'} • Qty: {it.quantity}
                              </p>
                            </div>
                            <div className="font-extrabold text-xs text-brand-forest-950 dark:text-white">
                              {formatCurrency(it.total_price || it.unit_price * it.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-brand-cream-200 dark:border-zinc-800 flex items-center justify-between">
                        <div className="text-xs text-brand-charcoal-500 dark:text-zinc-400">
                          Total Amount Paid:{' '}
                          <strong className="text-brand-forest-950 dark:text-white font-extrabold text-sm">
                            {formatCurrency(ord.total_amount)}
                          </strong>
                        </div>
                        <Link
                          href={`/order-success/${ord.order_number}`}
                          className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white flex items-center gap-1"
                        >
                          <span>View Tracking & Receipt</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Saved Shipping Addresses
                </h2>
                <button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-forest-800 dark:text-emerald-400 bg-brand-forest-50 dark:bg-brand-forest-950/60 px-2 py-0.5 rounded border border-brand-forest-200 dark:border-brand-forest-800">
                          {addr.address_type}
                        </span>
                        {addr.is_default && (
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            Default
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100">
                        {addr.full_name}
                      </h4>
                      <p className="text-xs text-brand-charcoal-600 dark:text-zinc-400 mt-1 leading-relaxed">
                        {addr.address_line1}
                        {addr.address_line2 && `, ${addr.address_line2}`}
                        <br />
                        {addr.city}, {addr.state} - {addr.postal_code}
                      </p>
                      <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-2">
                        Phone: <strong>+91 {addr.phone}</strong>
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-brand-cream-200 dark:border-zinc-800 flex justify-end">
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1"
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
                  <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border dark:border-zinc-800 z-10 animate-slide-up">
                    <h3 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white mb-4 pb-2 border-b border-brand-cream-300 dark:border-zinc-800">
                      Add New Delivery Address
                    </h3>
                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                          Flat / Street / Area *
                        </label>
                        <input
                          type="text"
                          required
                          value={newLine1}
                          onChange={(e) => setNewLine1(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                            PIN Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={newPostalCode}
                            onChange={(e) => setNewPostalCode(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500 font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddAddressOpen(false)}
                          className="px-4 py-2 border border-brand-cream-300 dark:border-zinc-700 rounded-xl text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold"
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
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-6">
              <h2 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white pb-3 border-b border-brand-cream-200 dark:border-zinc-800">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Email Address (Account Identifier)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 bg-brand-cream-100 dark:bg-zinc-800/60 text-xs text-brand-charcoal-600 dark:text-zinc-400"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold transition-colors"
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
