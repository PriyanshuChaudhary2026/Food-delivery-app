import { useState } from "react";
import Modal from "../common/Modal";
export default function Items({ data, orders, onAdd, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ orderId: "", name: "", quantity: "", price: "" });

  function handleSubmit() {
    if (!form.orderId || !form.name || !form.price) return;
    onAdd({ ...form, orderId: parseInt(form.orderId), quantity: parseInt(form.quantity) || 1, price: parseFloat(form.price) });
    setShowModal(false);
    setForm({ orderId: "", name: "", quantity: "", price: "" });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-muted text-sm">{data.length} items across all orders</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Item</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Item ID</th><th>Name</th><th>Order</th><th>Qty</th><th>Price</th><th>Subtotal</th><th></th></tr></thead>
            <tbody>
              {data.map(i => (
                <tr key={i.itemId}>
                  <td className="text-muted">#{i.itemId}</td>
                  <td><strong>{i.name}</strong></td>
                  <td className="text-muted">Order #{i.orderId}</td>
                  <td>{i.quantity}×</td>
                  <td>₹{i.price}</td>
                  <td><strong>₹{(i.quantity * i.price).toFixed(2)}</strong></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => onDelete("items", i.itemId)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Add Order Item" onClose={() => setShowModal(false)}>
          <div className="form-grid">
            <div className="field">
              <label>Order</label>
              <select value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })}>
                <option value="">Select order…</option>
                {orders.map(o => <option key={o.orderId} value={o.orderId}>Order #{o.orderId} — ₹{o.totalAmount}</option>)}
              </select>
            </div>
            <div className="field"><label>Item Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Butter Chicken" /></div>
            <div className="form-grid-2">
              <div className="field"><label>Quantity</label><input type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="1" /></div>
              <div className="field"><label>Price (₹)</label><input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" /></div>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Add Item</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
