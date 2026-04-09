import { useState } from "react";
import { getStatusBadge } from "../../utils/helpers";
export default function Dashboard({ data }) {
  const activeOrders = data.orders.filter(o => o.orderStatus !== "DELIVERED").length;
  const totalRevenue = data.orders.reduce((s, o) => s + o.totalAmount, 0);
  const pendingPayments = data.payments.filter(p => p.paymentStatus === "PENDING").length;

  return (
    <div>
      <div className="grid-3 section-gap" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { icon: "🏪", label: "Restaurants", value: data.restaurants.length, sub: "Active listings" },
          { icon: "📦", label: "Total Orders", value: data.orders.length, sub: `${activeOrders} active` },
          { icon: "👤", label: "Users", value: data.users.length, sub: "Registered" },
          { icon: "₹", label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, sub: `${pendingPayments} pending` },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Recent Orders</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Order ID</th><th>Restaurant</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {data.orders.slice(0, 5).map(o => {
                  const rest = data.restaurants.find(r => r.restaurantId === o.restaurantId);
                  return (
                    <tr key={o.orderId}>
                      <td><span className="text-accent font-bold">#{o.orderId}</span></td>
                      <td>{rest?.name ?? "—"}</td>
                      <td>₹{o.totalAmount}</td>
                      <td><span className={`badge ${getStatusBadge(o.orderStatus)}`}>{o.orderStatus}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Recent Deliveries</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Order</th><th>Executive</th><th>Status</th></tr></thead>
              <tbody>
                {data.deliveries.slice(0, 5).map(d => (
                  <tr key={d.deliveryId}>
                    <td><span className="text-accent font-bold">#{d.deliveryId}</span></td>
                    <td>Order #{d.orderId}</td>
                    <td>Exec #{d.deliveryExecutiveId}</td>
                    <td><span className={`badge ${getStatusBadge(d.deliveryStatus)}`}>{d.deliveryStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
