import { useState } from "react";
import Modal from "../common/Modal";
import { getStatusBadge, getOrderSteps } from "../../utils/helpers";
export default function Orders({ data, restaurants, users, onAdd, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ userId: "", restaurantId: "", totalAmount: "", orderStatus: "PENDING" });

  function handleSubmit() {
    if (!form.userId || !form.restaurantId || !form.totalAmount) return;
    onAdd({ ...form, userId: parseInt(form.userId), restaurantId: parseInt(form.restaurantId), totalAmount: parseFloat(form.totalAmount), orderDate: new Date().toISOString() });
    setShowModal(false);
    setForm({ userId: "", restaurantId: "", totalAmount: "", orderStatus: "PENDING" });
  }

  const steps = selected ? getOrderSteps(selected.orderStatus) : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-muted text-sm">{data.length} total orders</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Place Order</button>
      </div>

      {selected && (
        <div className="card mb-4" style={{ marginBottom: 24 }}>
          <div className="flex items-center justify-between mb-3">
            <div><span className="text-accent font-bold font-syne" style={{ fontSize: 16 }}>Order #{selected.orderId}</span> — Tracking</div>
            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Close</button>
          </div>
          <div className="tracker">
            {steps.map((s, i) => (
              <div key={i} className={`step ${s.done ? "done" : ""} ${s.active ? "active" : ""}`}>
                <div className="step-dot">{s.done ? "✓" : i + 1}</div>
                <div className="step-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>User</th><th>Restaurant</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {data.map(o => {
                const user = users.find(u => u.userId === o.userId);
                const rest = restaurants.find(r => r.restaurantId === o.restaurantId);
                return (
                  <tr key={o.orderId} style={{ cursor: "pointer" }}>
                    <td onClick={() => setSelected(o)}><span className="text-accent font-bold">#{o.orderId}</span></td>
                    <td>{user?.username ?? `User #${o.userId}`}</td>
                    <td>{rest?.name ?? `Rest #${o.restaurantId}`}</td>
                    <td><strong>₹{o.totalAmount}</strong></td>
                    <td><span className={`badge ${getStatusBadge(o.orderStatus)}`}>{o.orderStatus}</span></td>
                    <td className="text-muted text-sm">{o.orderDate ? new Date(o.orderDate).toLocaleDateString() : "—"}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => onDelete("orders", o.orderId)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Place New Order" onClose={() => setShowModal(false)}>
          <div className="form-grid">
            <div className="field">
              <label>User</label>
              <select value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })}>
                <option value="">Select user…</option>
                {users.map(u => <option key={u.userId} value={u.userId}>{u.username}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Restaurant</label>
              <select value={form.restaurantId} onChange={e => setForm({ ...form, restaurantId: e.target.value })}>
                <option value="">Select restaurant…</option>
                {restaurants.map(r => <option key={r.restaurantId} value={r.restaurantId}>{r.name}</option>)}
              </select>
            </div>
            <div className="form-grid-2">
              <div className="field"><label>Total Amount (₹)</label><input type="number" value={form.totalAmount} onChange={e => setForm({ ...form, totalAmount: e.target.value })} placeholder="0.00" /></div>
              <div className="field">
                <label>Order Status</label>
                <select value={form.orderStatus} onChange={e => setForm({ ...form, orderStatus: e.target.value })}>
                  {["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Place Order</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
