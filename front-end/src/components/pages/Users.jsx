import { useState } from "react";
import Modal from "../common/Modal";
export default function Users({ data, onAdd, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", phoneNumber: "", address: "", password: "" });

  function handleSubmit() {
    if (!form.username || !form.email) return;
    onAdd(form);
    setShowModal(false);
    setForm({ username: "", email: "", phoneNumber: "", address: "", password: "" });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-muted text-sm">{data.length} users registered</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add User</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th></th></tr></thead>
            <tbody>
              {data.map(u => (
                <tr key={u.userId}>
                  <td><span className="text-muted">#{u.userId}</span></td>
                  <td><strong>{u.username}</strong></td>
                  <td className="text-muted">{u.email}</td>
                  <td className="text-muted">{u.phoneNumber}</td>
                  <td className="text-muted" style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.address}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => onDelete("users", u.userId)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Register User" onClose={() => setShowModal(false)}>
          <div className="form-grid">
            <div className="form-grid-2">
              <div className="field"><label>Username</label><input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Full name" /></div>
              <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
            </div>
            <div className="form-grid-2">
              <div className="field"><label>Phone</label><input value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} placeholder="+91 99999 99999" /></div>
              <div className="field"><label>Password</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" /></div>
            </div>
            <div className="field"><label>Address</label><input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Full delivery address" /></div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
