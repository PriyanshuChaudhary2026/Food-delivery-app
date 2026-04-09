import { useState } from "react";
import Modal from "../common/Modal";
import { getStatusBadge } from "../../utils/helpers";
export default function Payments({ data, orders, onAdd, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ orderId: "", amount: "", paymentMethod: "UPI", paymentStatus: "PENDING" });

  function handleSubmit() {
    if (!form.orderId || !form.amount) return;
    onAdd({ ...form, orderId: parseInt(form.orderId), amount: parseFloat(form.amount) });
    setShowModal(false);
    setForm({ orderId: "", amount: "", paymentMethod: "UPI", paymentStatus: "PENDING" });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-muted text-sm">{data.filter(p => p.paymentStatus === "SUCCESS").length} successful / {data.length} total</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Payment</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Payment ID</th><th>Order</th><th>Amount</th><th>Method</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {data.map(p => (
                <tr key={p.paymentId}>
                  <td className="text-muted">#{p.paymentId}</td>
                  <td>Order #{p.orderId}</td>
                  <td><strong>₹{p.amount}</strong></td>
                  <td>
                    <span style={{ fontSize: 13 }}>
                      {p.paymentMethod === "UPI" ? "📱" : p.paymentMethod === "CARD" ? "💳" : "💵"} {p.paymentMethod}
                    </span>
                  </td>
                  <td><span className={`badge ${getStatusBadge(p.paymentStatus)}`}>{p.paymentStatus}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => onDelete("payments", p.paymentId)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Record Payment" onClose={() => setShowModal(false)}>
          <div className="form-grid">
            <div className="field">
              <label>Order</label>
              <select value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })}>
                <option value="">Select order…</option>
                {orders.map(o => <option key={o.orderId} value={o.orderId}>Order #{o.orderId} — ₹{o.totalAmount}</option>)}
              </select>
            </div>
            <div className="form-grid-2">
              <div className="field"><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></div>
              <div className="field">
                <label>Method</label>
                <select value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}>
                  {["UPI", "CARD", "CASH", "NET_BANKING"].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label>Status</label>
              <select value={form.paymentStatus} onChange={e => setForm({ ...form, paymentStatus: e.target.value })}>
                {["PENDING", "SUCCESS", "FAILED"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Record Payment</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
