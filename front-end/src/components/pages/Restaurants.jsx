import { useState } from "react";
import Modal from "../common/Modal";
import { getCuisineConfig } from "../../utils/helpers";

export default function Restaurants({ data, onAdd, onDelete }) {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", cuisineType: "", rating: "" });

  const cuisines = ["All", ...new Set(data.map(r => r.cuisineType))];
  const filtered = data.filter(r =>
    (cuisine === "All" || r.cuisineType === cuisine) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit() {
    if (!form.name || !form.location || !form.cuisineType) return;
    onAdd({ ...form, rating: parseFloat(form.rating) || 0 });
    setShowModal(false);
    setForm({ name: "", location: "", cuisineType: "", rating: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
          {cuisines.map(c => (
            <span key={c} className={`chip ${cuisine === c ? "active" : ""}`} onClick={() => setCuisine(c)}>{c}</span>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <div className="search-bar">
            🔍 <input placeholder="Search restaurants…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Restaurant</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><div className="empty-icon">🍽️</div><div className="empty-title">No restaurants found</div></div>
      ) : (
        <div className="grid-auto">
          {filtered.map(r => {
            const cfg = getCuisineConfig(r.cuisineType);
            return (
              <div className="restaurant-card" key={r.restaurantId}>
                <div className="restaurant-banner" style={{ background: cfg.bg }}>
                  <span style={{ fontSize: 44 }}>{cfg.emoji}</span>
                </div>
                <div className="restaurant-info">
                  <div className="restaurant-name">{r.name}</div>
                  <div className="restaurant-meta">
                    <span>📍 {r.location}</span>
                  </div>
                  <div className="flex items-center justify-between" style={{ marginTop: 10 }}>
                    <div className="flex gap-2 items-center">
                      <span className="chip" style={{ cursor: "default" }}>{r.cuisineType}</span>
                      <span className="rating">⭐ {r.rating}</span>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete("restaurants", r.restaurantId)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <Modal title="Add Restaurant" onClose={() => setShowModal(false)}>
          <div className="form-grid">
            <div className="form-grid-2">
              <div className="field"><label>Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Restaurant name" /></div>
              <div className="field"><label>Cuisine Type</label><input value={form.cuisineType} onChange={e => setForm({ ...form, cuisineType: e.target.value })} placeholder="e.g. Indian" /></div>
            </div>
            <div className="field"><label>Location</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Area" /></div>
            <div className="field"><label>Rating (0-5)</label><input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} /></div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Create Restaurant</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
