import { useState } from "react";
import Modal from "../common/Modal";
import { getStatusBadge } from "../../utils/helpers";
export default function Deliveries({ data, orders, onAdd, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ orderId: "", deliveryExecutiveId: "", deliveryStatus: "ASSIGNED", estimatedDeliveryTime: "" });

  function handleSubmit() {
    if (!form.orderId || !form.deliveryExecutiveId) return;
    onAdd({ ...form, orderId: parseInt(form.orderId), deliveryExecutiveId: parseInt(form.deliveryExecutiveId) });
    setShowModal(false);
    setForm({ orderId: "", deliveryExecutiveId: "", deliveryStatus: "ASSIGNED", estimatedDeliveryTime: "" });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-muted text-sm">{data.filter(d => d.deliveryStatus !== "DELIVERED").length} active deliveries</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Assign Delivery</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Delivery ID</th><th>Order</th><th>Executive ID</th><th>Est. Time</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {data.map(d => (
                <tr key={d.deliveryId}>
                  <td className="text-muted">#{d.deliveryId}</td>
                  <td>Order #{d.orderId}</td>
                  <td>🛵 Exec #{d.deliveryExecutiveId}</td>
                  <td className="text-muted text-sm">{d.estimatedDeliveryTime ? new Date(d.estimatedDeliveryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</td>
                  <td><span className={`badge ${getStatusBadge(d.deliveryStatus)}`}>{d.deliveryStatus}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => onDelete("deliveries", d.deliveryId)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Assign Delivery" onClose={() => setShowModal(false)}>
          <div className="form-grid">
            <div className="field">
              <label>Order</label>
              <select value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })}>
                <option value="">Select order…</option>
                {orders.map(o => <option key={o.orderId} value={o.orderId}>Order #{o.orderId}</option>)}
              </select>
            </div>
            <div className="form-grid-2">
              <div className="field"><label>Executive ID</label><input type="number" value={form.deliveryExecutiveId} onChange={e => setForm({ ...form, deliveryExecutiveId: e.target.value })} placeholder="e.g. 5" /></div>
              <div className="field">
                <label>Status</label>
                <select value={form.deliveryStatus} onChange={e => setForm({ ...form, deliveryStatus: e.target.value })}>
                  {["ASSIGNED", "PICKED_UP", "ON_THE_WAY", "DELIVERED"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="field"><label>Estimated Delivery Time</label><input type="datetime-local" value={form.estimatedDeliveryTime} onChange={e => setForm({ ...form, estimatedDeliveryTime: e.target.value })} /></div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Assign</button>
          </div>
        </Modal>
      )}
    </div>
  );
}