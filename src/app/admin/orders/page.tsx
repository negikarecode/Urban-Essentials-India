'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  Search,
  Eye,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
  Plus,
  Trash2,
  ChevronRight,
  Package,
  MapPin,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Tag,
  AlertCircle,
  X,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';
import { useLiveOrders } from '@/lib/orderStore';
import { useLiveProducts } from '@/lib/productStore';
import { toast } from 'sonner';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, saveOrder, deleteOrder } = useLiveOrders();
  const { products } = useLiveProducts();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Manual Order Creation Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [manualCity, setManualCity] = useState('');
  const [manualState, setManualState] = useState('');
  const [manualPincode, setManualPincode] = useState('');
  const [manualSelectedProductId, setManualSelectedProductId] = useState(products[0]?.id || '');
  const [manualQuantity, setManualQuantity] = useState(1);
  const [manualDiscount, setManualDiscount] = useState(0);


  const handleStatusChange = (orderId: string, newStatus: OrderStatus, orderNumber?: string) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, order_status: newStatus });
    }
    toast.success(`Order #${orderNumber || 'order'} updated to "${newStatus}"`);
  };

  const handleDeleteOrder = (orderId: string, orderNumber: string) => {
    if (confirm(`Are you sure you want to delete order #${orderNumber}?`)) {
      deleteOrder(orderId);
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      toast.info(`Deleted order #${orderNumber}`);
    }
  };

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCustomerName.trim() || !manualEmail.trim()) {
      toast.error('Customer name and email are required');
      return;
    }

    const prod = products.find((p) => p.id === manualSelectedProductId) || products[0];
    if (!prod) {
      toast.error('Please select a valid product');
      return;
    }

    const subtotal = prod.price * Number(manualQuantity);
    const totalAmount = Math.max(0, subtotal - Number(manualDiscount));
    const randomOrderNum = `URB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      order_number: randomOrderNum,
      guest_email: manualEmail.trim(),
      guest_phone: manualPhone.trim(),
      shipping_address: {
        full_name: manualCustomerName.trim(),
        email: manualEmail.trim(),
        phone: manualPhone.trim(),
        address_line1: manualAddress.trim(),
        city: manualCity.trim(),
        state: manualState.trim(),
        postal_code: manualPincode.trim(),
        country: 'India',
      },
      subtotal,
      discount_amount: Number(manualDiscount),
      shipping_fee: 0,
      tax_amount: 0,
      total_amount: totalAmount,
      coupon_code: manualDiscount > 0 ? 'MANUAL_DISCOUNT' : undefined,
      order_status: 'confirmed',
      payment_status: 'paid',
      payment_method: 'cod',
      items: [
        {
          id: `item-${Date.now()}`,
          order_id: randomOrderNum,
          product_id: prod.id,
          product_name: prod.name,
          sku: prod.sku,
          unit_price: prod.price,
          quantity: Number(manualQuantity),
          total_price: subtotal,
          product_image: prod.images[0]?.image_url,
        },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveOrder(newOrder);
    toast.success(`Manual order #${randomOrderNum} created successfully!`);
    setIsManualModalOpen(false);
    setManualCustomerName('');
    setManualEmail('');
  };

  const filtered = orders.filter((o) => {
    if (filterStatus !== 'all' && o.order_status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchNum = o.order_number.toLowerCase().includes(q);
      const matchName = o.shipping_address?.full_name?.toLowerCase().includes(q) || false;
      const matchEmail = (o.guest_email || o.shipping_address?.email || '').toLowerCase().includes(q);
      const matchItem = (o.items || []).some((i) => i.product_name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q));
      if (!matchNum && !matchName && !matchEmail && !matchItem) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Order Fulfillment & History
          </h1>
          <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-1">
            Track incoming customer purchases, review delivery addresses, update statuses, or generate manual offline orders.
          </p>
        </div>

        <button
          onClick={() => setIsManualModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Manual Order</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors shrink-0 ${
                  filterStatus === st
                    ? 'bg-brand-forest-800 text-white shadow-xs'
                    : 'bg-brand-cream-100 dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search order #, customer, email, SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-brand-charcoal-500 dark:text-zinc-400 pt-1 border-t border-brand-cream-200 dark:border-zinc-800">
          <span>
            Showing <strong>{filtered.length}</strong> of <strong>{orders.length}</strong> orders
          </span>
          {(filterStatus !== 'all' || search) && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setSearch('');
              }}
              className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 dark:bg-zinc-800/80 border-b border-brand-cream-300 dark:border-zinc-800 text-brand-charcoal-600 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Order #</th>
                <th className="py-3 px-4 font-bold">Customer Details</th>
                <th className="py-3 px-4 font-bold">Purchased Items</th>
                <th className="py-3 px-4 font-bold">Total Paid</th>
                <th className="py-3 px-4 font-bold">Date Placed</th>
                <th className="py-3 px-4 font-bold">Fulfillment Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brand-charcoal-400 dark:text-zinc-500">
                    No orders matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((ord) => {
                  const itemsCount = (ord.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0);
                  const itemsSummary = (ord.items || []).map((i) => `${i.product_name} (x${i.quantity})`).join(', ');

                  return (
                    <tr key={ord.id || ord.order_number} className="hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                      {/* Order Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-forest-950 dark:text-white">
                        #{ord.order_number}
                      </td>

                      {/* Customer info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-brand-charcoal-900 dark:text-zinc-100">
                          {ord.shipping_address?.full_name || ord.guest_email?.split('@')[0] || 'Customer'}
                        </div>
                        <div className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500">
                          {ord.guest_email || ord.shipping_address?.email || 'N/A'}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4 text-brand-charcoal-700 dark:text-zinc-300 max-w-xs truncate" title={itemsSummary}>
                        {itemsSummary || `${itemsCount} items`}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-brand-forest-950 dark:text-white">
                          {formatCurrency(ord.total_amount)}
                        </div>
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                          {ord.payment_status || 'PAID'} • {ord.payment_method || 'Online'}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-brand-charcoal-500 dark:text-zinc-400">
                        {new Date(ord.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={ord.order_status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus, ord.order_number)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase focus:outline-none border cursor-pointer ${
                            ord.order_status === 'delivered'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                              : ord.order_status === 'shipped'
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                              : ord.order_status === 'cancelled'
                              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="p-1.5 text-brand-forest-800 dark:text-emerald-400 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            title="View full order breakdown"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(ord.id, ord.order_number)}
                            className="p-1.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Full Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Order Invoice & Summary
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  #{selectedOrder.order_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-cream-50 dark:bg-zinc-800/60 p-4 rounded-2xl text-xs text-brand-charcoal-700 dark:text-zinc-300 border border-brand-cream-300 dark:border-zinc-700">
              <div className="space-y-1">
                <strong className="block text-brand-forest-950 dark:text-white font-bold uppercase mb-1">
                  Customer Information
                </strong>
                <p className="font-bold text-brand-charcoal-900 dark:text-zinc-100">{selectedOrder.shipping_address?.full_name}</p>
                <p className="flex items-center gap-1.5 text-brand-charcoal-600 dark:text-zinc-400">
                  <Mail className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-500" />
                  <span>{selectedOrder.guest_email || selectedOrder.shipping_address?.email}</span>
                </p>
                <p className="flex items-center gap-1.5 text-brand-charcoal-600 dark:text-zinc-400">
                  <Phone className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-500" />
                  <span>{selectedOrder.guest_phone || selectedOrder.shipping_address?.phone || 'N/A'}</span>
                </p>
              </div>

              <div className="space-y-1">
                <strong className="block text-brand-forest-950 dark:text-white font-bold uppercase mb-1">
                  Shipping Destination
                </strong>
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-forest-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {selectedOrder.shipping_address?.address_line1}
                    {selectedOrder.shipping_address?.address_line2 ? `, ${selectedOrder.shipping_address?.address_line2}` : ''}
                    <br />
                    {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} - {selectedOrder.shipping_address?.postal_code}
                  </span>
                </p>
              </div>
            </div>

            {/* Order Items Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 uppercase tracking-wider">
                Purchased Line Items ({(selectedOrder.items || []).length})
              </h4>
              <div className="divide-y divide-brand-cream-200 dark:divide-zinc-700 border border-brand-cream-300 dark:border-zinc-700 rounded-2xl overflow-hidden">
                {(selectedOrder.items || []).map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 text-xs bg-white dark:bg-zinc-800/80">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream-200 dark:bg-zinc-700 shrink-0 border border-brand-cream-300 dark:border-zinc-600">
                        <Image
                          src={item.product_image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'}
                          alt={item.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-brand-charcoal-900 dark:text-zinc-100">{item.product_name}</div>
                        {item.variant_name && <div className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">{item.variant_name}</div>}
                        <div className="text-[10px] font-mono text-brand-charcoal-400 dark:text-zinc-500">SKU: {item.sku}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-brand-forest-950 dark:text-white">
                        {formatCurrency(item.total_price || item.unit_price * item.quantity)}
                      </div>
                      <div className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
                        Qty: {item.quantity} × {formatCurrency(item.unit_price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-brand-cream-100/70 dark:bg-zinc-800 p-4 rounded-2xl space-y-1.5 text-xs text-brand-charcoal-700 dark:text-zinc-300">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount_amount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Discount Applied ({selectedOrder.coupon_code || 'PROMO'}):</span>
                  <span>-{formatCurrency(selectedOrder.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Handling:</span>
                <span>{selectedOrder.shipping_fee === 0 ? 'FREE' : formatCurrency(selectedOrder.shipping_fee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-cream-300 dark:border-zinc-700 font-extrabold text-sm text-brand-forest-950 dark:text-white">
                <span>Total Amount Paid:</span>
                <span>{formatCurrency(selectedOrder.total_amount)}</span>
              </div>
            </div>

            {/* Order Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-cream-300 dark:border-zinc-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300">Update Status:</span>
                <select
                  value={selectedOrder.order_status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus, selectedOrder.order_number)}
                  className="px-3 py-1.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs font-bold uppercase"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold transition-colors w-full sm:w-auto"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Order Creation Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsManualModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Admin Sales Entry
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Create Manual / Offline Order
                </h3>
              </div>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Customer full name"
                    value={manualCustomerName}
                    onChange={(e) => setManualCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Customer Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="customer@example.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    City / State
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={manualCity}
                      onChange={(e) => setManualCity(e.target.value)}
                      className="w-1/2 px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={manualState}
                      onChange={(e) => setManualState(e.target.value)}
                      className="w-1/2 px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              {/* Product Selection */}
              <div className="p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700 space-y-3">
                <label className="block text-xs font-bold text-brand-forest-950 dark:text-white uppercase">
                  Select Product Item *
                </label>
                <select
                  value={manualSelectedProductId}
                  onChange={(e) => setManualSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku}) — {formatCurrency(p.price)} (Stock: {p.stock_quantity})
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={manualQuantity}
                      onChange={(e) => setManualQuantity(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                      Discount (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={manualDiscount}
                      onChange={(e) => setManualDiscount(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Save & Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
