import { useState, useEffect, useCallback } from "react";

import { api } from "./api/api";
import { MOCK } from "./data/mockData";
import { styles } from "./styles/globalStyles";

import Dashboard from "./components/pages/Dashboard";
import Restaurants from "./components/pages/Restaurants";
import Users from "./components/pages/Users";
import Orders from "./components/pages/Orders";
import Items from "./components/pages/Items";
import Payments from "./components/pages/Payments";
import Deliveries from "./components/pages/Deliveries";

import Toast from "./components/common/Toast";

const PAGES = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "restaurants", label: "Restaurants", icon: "🏪" },
  { id: "users", label: "Users", icon: "👤" },
  { id: "orders", label: "Orders", icon: "📦" },
  { id: "items", label: "Items", icon: "🍽️" },
  { id: "payments", label: "Payments", icon: "💳" },
  { id: "deliveries", label: "Deliveries", icon: "🛵" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [isLive, setIsLive] = useState(false);
  const [toast, setToast] = useState(null);

  const [data, setData] = useState({
    restaurants: MOCK.restaurants,
    users: MOCK.users,
    orders: MOCK.orders,
    items: MOCK.items,
    payments: MOCK.payments,
    deliveries: MOCK.deliveries,
  });

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
  }, []);

  // Try to connect to real API on mount
  useEffect(() => {
    Promise.all([
      api.get("/restaurants"),
      api.get("/users"),
      api.get("/orders"),
      api.get("/items"),
      api.get("/payments"),
      api.get("/deliveries"),
    ]).then(([restaurants, users, orders, items, payments, deliveries]) => {
      setData({ restaurants, users, orders, items, payments, deliveries });
      setIsLive(true);
      showToast("Connected to backend API!", "success");
    }).catch(() => {
      setIsLive(false);
    });
  }, [showToast]);

  async function handleAdd(entity, payload) {
    try {
      if (isLive) {
        const result = await api.post(`/${entity}`, payload);
        setData(d => ({ ...d, [entity]: [...d[entity], result] }));
        showToast(`${entity.slice(0, -1)} created!`);
      } else {
        // Mock: generate fake ID
        const idKey = Object.keys(payload).find(k => k.endsWith("Id")) || `${entity.slice(0, -1)}Id`;
        const maxId = data[entity].reduce((m, item) => Math.max(m, item[idKey] || 0), 0);
        const newItem = { ...payload, [idKey]: maxId + 1 };
        setData(d => ({ ...d, [entity]: [...d[entity], newItem] }));
        showToast(`${entity.slice(0, -1)} created (mock)!`);
      }
    } catch {
      showToast("Failed to create record", "error");
    }
  }

  async function handleDelete(entity, id) {
    const idKey = `${entity.slice(0, -1)}Id`;
    try {
      if (isLive) await api.del(`/${entity}/${id}`);
      setData(d => ({ ...d, [entity]: d[entity].filter(item => item[idKey] !== id) }));
      showToast(`Deleted successfully`);
    } catch {
      showToast("Failed to delete", "error");
    }
  }

  const pageTitle = PAGES.find(p => p.id === page)?.label ?? "";

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">🔥 Swig<span>go</span></div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Food Delivery Platform</div>
          </div>
          <nav className="sidebar-nav">
            {PAGES.map(p => (
              <button key={p.id} className={`nav-item ${page === p.id ? "active" : ""}`} onClick={() => setPage(p.id)}>
                <span className="nav-icon">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className={`api-status ${isLive ? "live" : "mock"}`}>
              <div className="dot" />
              {isLive ? "Live API" : "Mock Data"}
            </div>
            <div style={{ marginTop: 6, fontSize: 11 }}>:8080</div>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <div className="page-header">
            <div className="page-title">{pageTitle}</div>
            <div className="flex gap-2 items-center">
              <span className="text-muted text-sm">Base URL: <code style={{ color: "var(--accent)", fontSize: 12 }}>http://localhost:8080</code></span>
            </div>
          </div>

          <div className="page-content">
            {page === "dashboard" && <Dashboard data={data} />}
            {page === "restaurants" && <Restaurants data={data.restaurants} onAdd={p => handleAdd("restaurants", p)} onDelete={handleDelete} />}
            {page === "users" && <Users data={data.users} onAdd={p => handleAdd("users", p)} onDelete={handleDelete} />}
            {page === "orders" && <Orders data={data.orders} restaurants={data.restaurants} users={data.users} onAdd={p => handleAdd("orders", p)} onDelete={handleDelete} />}
            {page === "items" && <Items data={data.items} orders={data.orders} onAdd={p => handleAdd("items", p)} onDelete={handleDelete} />}
            {page === "payments" && <Payments data={data.payments} orders={data.orders} onAdd={p => handleAdd("payments", p)} onDelete={handleDelete} />}
            {page === "deliveries" && <Deliveries data={data.deliveries} orders={data.orders} onAdd={p => handleAdd("deliveries", p)} onDelete={handleDelete} />}
          </div>
        </main>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
