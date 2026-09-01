'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowRight,
  Plus,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  Boxes,
  Tag,
  Star,
  Users,
  Eye,
  Check,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLiveProducts } from '@/lib/productStore';
import { useLiveOrders } from '@/lib/orderStore';
import { useLiveReviews } from '@/lib/reviewStore';
import { useLiveCoupons } from '@/lib/couponStore';
import { Order, Product } from '@/types';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const { products, updateProductStock } = useLiveProducts();
  const { orders, updateOrderStatus } = useLiveOrders();
  const { reviews } = useLiveReviews();
  const { coupons } = useLiveCoupons();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Financial & inventory analytics calculations
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total_amount || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.order_status === 'pending' || o.order_status === 'processing');
  const activeProducts = products.filter((p) => p.is_active);
  const lowStockProducts = products.filter((p) => p.stock_quantity <= (p.low_stock_threshold || 10));

  const STATS = [
    {
      title: 'Gross Sales Revenue',
      value: formatCurrency(totalRevenue),
      change: `${orders.length} orders recorded`,
      icon: TrendingUp,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Total Orders',
      value: `${totalOrdersCount} Orders`,
      change: pendingOrders.length > 0 ? `${pendingOrders.length} orders pending fulfillment` : 'All orders fulfilled',
      icon: ShoppingBag,
      color: 'text-brand-forest-800 bg-brand-forest-50 border-brand-forest-200',
    },
    {
      title: 'Active Catalog Items',
      value: `${activeProducts.length} Products`,
      change: `${products.length - activeProducts.length} hidden items`,
      icon: Package,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      title: 'Low Stock Alerts',
      value: `${lowStockProducts.length} Items`,
      change: lowStockProducts.length > 0 ? 'Requires replenishment' : 'All inventory levels healthy',
      icon: AlertTriangle,
      color: lowStockProducts.length > 0 ? 'text-amber-700 bg-amber-50 border-amber-300' : 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  const handleQuickRestock = (productId: string, currentStock: number, addAmount: number, name: string) => {
    const newStock = currentStock + addAmount;
    updateProductStock(productId, newStock);
    toast.success(`Restocked +${addAmount} units for "${name}" (New total: ${newStock})`);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Admin Overview & Analytics
          </h1>
          <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-1">
            Real-time ecommerce performance, order fulfillment, stock alerts, and catalog controls.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/inventory"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-700 hover:bg-brand-cream-50 dark:hover:bg-zinc-800 text-brand-forest-950 dark:text-zinc-100 rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Boxes className="w-4 h-4 text-brand-forest-800 dark:text-emerald-400" />
            <span>Manage Inventory</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.color} dark:bg-zinc-800 dark:border-zinc-700`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] font-medium text-brand-charcoal-500 dark:text-zinc-400 mt-1">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/admin/products"
          className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 hover:border-brand-forest-800 dark:hover:border-emerald-500 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <Package className="w-5 h-5 text-brand-forest-800 dark:text-emerald-400" />
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoal-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-xs text-brand-forest-950 dark:text-white mt-2">Products</h4>
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">{products.length} listed</p>
        </Link>

        <Link
          href="/admin/orders"
          className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 hover:border-brand-forest-800 dark:hover:border-emerald-500 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <ShoppingBag className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoal-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-xs text-brand-forest-950 dark:text-white mt-2">Orders</h4>
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">{orders.length} total orders</p>
        </Link>

        <Link
          href="/admin/coupons"
          className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 hover:border-brand-forest-800 dark:hover:border-emerald-500 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <Tag className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoal-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-xs text-brand-forest-950 dark:text-white mt-2">Coupons</h4>
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">{coupons.length} active promo codes</p>
        </Link>

        <Link
          href="/admin/reviews"
          className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 hover:border-brand-forest-800 dark:hover:border-emerald-500 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between">
            <Star className="w-5 h-5 text-purple-700 dark:text-purple-400" />
            <ArrowRight className="w-3.5 h-3.5 text-brand-charcoal-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="font-bold text-xs text-brand-forest-950 dark:text-white mt-2">Reviews</h4>
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">{reviews.length} total reviews</p>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-cream-200 dark:border-zinc-800">
          <div>
            <h2 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white">
              Recent Customer Orders
            </h2>
            <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
              Live orders placed on your store with auto-calculated subtotals and fulfillment tracking.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white flex items-center gap-1"
          >
            <span>Manage All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center text-brand-charcoal-400 dark:text-zinc-500 text-xs">
            No customer orders placed yet. Test the store checkout to see live orders appear here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-brand-cream-200 dark:border-zinc-800 text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Order #</th>
                  <th className="pb-3 font-bold">Customer</th>
                  <th className="pb-3 font-bold">Items Purchased</th>
                  <th className="pb-3 font-bold">Total Paid</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
                {orders.slice(0, 6).map((ord) => {
                  const itemsCount = (ord.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0);
                  const itemsSummary = (ord.items || []).map((i) => `${i.product_name} (x${i.quantity})`).join(', ');

                  return (
                    <tr key={ord.id || ord.order_number} className="hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-brand-forest-950 dark:text-white">
                        #{ord.order_number}
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-brand-charcoal-900 dark:text-zinc-100">
                          {ord.shipping_address?.full_name || ord.guest_email?.split('@')[0] || 'Customer'}
                        </div>
                        <div className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500">
                          {ord.guest_email || ord.shipping_address?.email || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3.5 text-brand-charcoal-700 dark:text-zinc-300 max-w-xs truncate" title={itemsSummary}>
                        {itemsSummary || `${itemsCount} items`}
                      </td>
                      <td className="py-3.5 font-extrabold text-brand-forest-950 dark:text-white">
                        {formatCurrency(ord.total_amount)}
                      </td>
                      <td className="py-3.5 text-brand-charcoal-500 dark:text-zinc-400">
                        {new Date(ord.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            ord.order_status === 'delivered'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : ord.order_status === 'shipped'
                              ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                              : ord.order_status === 'cancelled'
                              ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {ord.order_status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                          {ord.order_status === 'shipped' && <Truck className="w-3 h-3" />}
                          {(ord.order_status === 'processing' || ord.order_status === 'pending' || ord.order_status === 'confirmed') && (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{ord.order_status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1 bg-brand-cream-200 dark:bg-zinc-800 hover:bg-brand-cream-300 dark:hover:bg-zinc-700 text-brand-forest-900 dark:text-zinc-100 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inventory & Low Stock Quick Alert with 1-Click Restock */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-cream-200 dark:border-zinc-800">
          <div>
            <h2 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Low Stock Alerts & Quick Restock</span>
            </h2>
            <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
              Items at or below low stock threshold. Click restock buttons to instantly add inventory.
            </p>
          </div>
          <Link
            href="/admin/inventory"
            className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white"
          >
            All Inventory &rarr;
          </Link>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="p-6 text-center text-xs text-brand-charcoal-500 dark:text-zinc-400 bg-brand-cream-50 dark:bg-zinc-800/50 rounded-2xl border border-brand-cream-200 dark:border-zinc-700 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>All {products.length} products have healthy stock levels. No replenishment needed.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lowStockProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-amber-50/70 dark:bg-zinc-800/80 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream-200 dark:bg-zinc-700 shrink-0 border border-amber-300 dark:border-amber-700">
                    <Image
                      src={prod.images[0]?.image_url || '/placeholder.png'}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-brand-charcoal-900 dark:text-zinc-100 line-clamp-1">{prod.name}</h4>
                    <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
                      SKU: <span className="font-mono font-bold text-brand-forest-950 dark:text-white">{prod.sku}</span> • Threshold: {prod.low_stock_threshold || 10}
                    </p>
                    <span className="font-extrabold text-xs text-amber-800 dark:text-amber-300 mt-1 inline-block">
                      {prod.stock_quantity === 0 ? 'Out of Stock (0 units)' : `${prod.stock_quantity} units remaining`}
                    </span>
                  </div>
                </div>

                {/* Quick Restock Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => handleQuickRestock(prod.id, prod.stock_quantity, 10, prod.name)}
                    className="px-2.5 py-1 bg-white dark:bg-zinc-700 hover:bg-emerald-50 dark:hover:bg-zinc-600 border border-amber-300 dark:border-zinc-600 text-brand-forest-900 dark:text-zinc-100 rounded-lg text-xs font-bold shadow-xs transition-colors"
                    title="Add 10 units"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => handleQuickRestock(prod.id, prod.stock_quantity, 25, prod.name)}
                    className="px-2.5 py-1 bg-white dark:bg-zinc-700 hover:bg-emerald-50 dark:hover:bg-zinc-600 border border-amber-300 dark:border-zinc-600 text-brand-forest-900 dark:text-zinc-100 rounded-lg text-xs font-bold shadow-xs transition-colors"
                    title="Add 25 units"
                  >
                    +25
                  </button>
                  <button
                    onClick={() => handleQuickRestock(prod.id, prod.stock_quantity, 50, prod.name)}
                    className="px-2.5 py-1 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                    title="Add 50 units"
                  >
                    +50
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Order Details
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  #{selectedOrder.order_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                ✕
              </button>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-cream-50 dark:bg-zinc-800 p-4 rounded-2xl text-xs text-brand-charcoal-700 dark:text-zinc-300">
              <div>
                <strong className="block text-brand-forest-950 dark:text-white font-bold uppercase mb-1">
                  Customer & Contact
                </strong>
                <p>{selectedOrder.shipping_address?.full_name}</p>
                <p>{selectedOrder.guest_email || selectedOrder.shipping_address?.email}</p>
                <p>{selectedOrder.guest_phone || selectedOrder.shipping_address?.phone}</p>
              </div>
              <div>
                <strong className="block text-brand-forest-950 dark:text-white font-bold uppercase mb-1">
                  Delivery Address
                </strong>
                <p>{selectedOrder.shipping_address?.address_line1}</p>
                {selectedOrder.shipping_address?.address_line2 && <p>{selectedOrder.shipping_address?.address_line2}</p>}
                <p>
                  {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} - {selectedOrder.shipping_address?.postal_code}
                </p>
                <p>{selectedOrder.shipping_address?.country || 'India'}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 uppercase tracking-wider">
                Order Items ({(selectedOrder.items || []).length})
              </h4>
              <div className="divide-y divide-brand-cream-200 dark:divide-zinc-800 border border-brand-cream-300 dark:border-zinc-800 rounded-2xl overflow-hidden">
                {(selectedOrder.items || []).map((item) => (
                  <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand-cream-200 dark:bg-zinc-700 shrink-0">
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

            {/* Financial Totals */}
            <div className="bg-brand-cream-100/70 dark:bg-zinc-800 p-4 rounded-2xl space-y-1.5 text-xs text-brand-charcoal-700 dark:text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount_amount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>Coupon Discount ({selectedOrder.coupon_code || 'PROMO'}):</span>
                  <span>-{formatCurrency(selectedOrder.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span>{selectedOrder.shipping_fee === 0 ? 'FREE' : formatCurrency(selectedOrder.shipping_fee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-cream-300 dark:border-zinc-700 font-extrabold text-sm text-brand-forest-950 dark:text-white">
                <span>Total Amount Paid:</span>
                <span>{formatCurrency(selectedOrder.total_amount)}</span>
              </div>
            </div>

            {/* Status Update & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-cream-300 dark:border-zinc-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300">Status:</span>
                <select
                  value={selectedOrder.order_status}
                  onChange={(e) => {
                    const newSt = e.target.value as any;
                    updateOrderStatus(selectedOrder.id, newSt);
                    setSelectedOrder({ ...selectedOrder, order_status: newSt });
                    toast.success(`Order #${selectedOrder.order_number} status changed to ${newSt}`);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold uppercase"
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
    </div>
  );
}
