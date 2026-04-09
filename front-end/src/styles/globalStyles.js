export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0f;
    --surface: #161619;
    --surface2: #1e1e23;
    --border: #2a2a32;
    --accent: #ff5c35;
    --accent2: #ffb547;
    --text: #f0ede8;
    --muted: #7a7888;
    --success: #34d399;
    --warning: #fbbf24;
    --info: #60a5fa;
    --radius: 16px;
    --radius-sm: 10px;
  }

  html, body, #root { height: 100%; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* Sidebar */
  .sidebar {
    width: 240px; flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 0;
    z-index: 10;
    overflow-y: auto;
  }
  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid var(--border);
  }
  .logo-mark {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 22px;
    color: var(--accent);
    letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 8px;
  }
  .logo-mark span { color: var(--text); }
  .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 2px; }
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all 0.15s;
    font-size: 14px; font-weight: 500;
    color: var(--muted);
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: rgba(255,92,53,0.12); color: var(--accent); }
  .nav-icon { font-size: 18px; width: 22px; text-align: center; }
  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px; color: var(--muted);
    text-align: center;
  }
  .api-status {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 500;
  }
  .api-status.live { background: rgba(52,211,153,0.1); color: var(--success); }
  .api-status.mock { background: rgba(251,191,36,0.1); color: var(--warning); }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* Main Content */
  .main { flex: 1; overflow-y: auto; background: var(--bg); }
  .page-header {
    padding: 32px 36px 24px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 5;
    background: var(--bg);
    backdrop-filter: blur(10px);
  }
  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 700;
    letter-spacing: -0.5px;
  }
  .page-content { padding: 32px 36px; }

  /* Cards */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: #3a3a44; }
  .card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 600; font-size: 15px;
    margin-bottom: 20px;
    color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.5px;
  }

  /* Grid */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

  /* Restaurant Card */
  .restaurant-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;
  }
  .restaurant-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .restaurant-banner {
    height: 100px;
    display: flex; align-items: center; justify-content: center;
    font-size: 40px;
    position: relative;
  }
  .restaurant-info { padding: 16px; }
  .restaurant-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 16px;
    margin-bottom: 4px;
  }
  .restaurant-meta { font-size: 13px; color: var(--muted); display: flex; gap: 8px; align-items: center; }
  .rating {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(52,211,153,0.12); color: var(--success);
    padding: 2px 8px; border-radius: 20px; font-size: 12px; font-weight: 600;
  }

  /* Badge */
  .badge {
    display: inline-flex; align-items: center;
    padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
  }
  .badge-delivered { background: rgba(52,211,153,0.1); color: var(--success); }
  .badge-pending { background: rgba(251,191,36,0.1); color: var(--warning); }
  .badge-preparing { background: rgba(96,165,250,0.1); color: var(--info); }
  .badge-out { background: rgba(255,92,53,0.1); color: var(--accent); }
  .badge-success { background: rgba(52,211,153,0.1); color: var(--success); }
  .badge-failed { background: rgba(239,68,68,0.1); color: #f87171; }

  /* Table */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th {
    text-align: left; padding: 10px 14px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.6px;
    text-transform: uppercase; color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  td { padding: 12px 14px; border-bottom: 1px solid var(--border); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface2); }

  /* Button */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    border: none; text-decoration: none;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #ff4520; }
  .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--surface2); color: var(--text); }
  .btn-danger { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
  .btn-danger:hover { background: rgba(239,68,68,0.2); }
  .btn-sm { padding: 6px 14px; font-size: 13px; }

  /* Form */
  .form-grid { display: grid; gap: 16px; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field label {
    display: block; font-size: 12px; font-weight: 500;
    color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.4px;
  }
  .field input, .field select, .field textarea {
    width: 100%; padding: 10px 14px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    transition: border-color 0.15s; outline: none;
  }
  .field input:focus, .field select:focus, .field textarea:focus {
    border-color: var(--accent);
  }
  .field select option { background: var(--surface2); }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 32px;
    width: 100%; max-width: 520px;
    max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.2s ease;
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px; font-weight: 700;
    margin-bottom: 24px;
  }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }

  /* Stats */
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .stat-label { font-size: 12px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.4px; }
  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 36px; font-weight: 800; letter-spacing: -1px;
  }
  .stat-sub { font-size: 13px; color: var(--muted); }
  .stat-icon { font-size: 28px; margin-bottom: 4px; }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 14px 20px;
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: toastIn 0.3s ease;
    max-width: 360px;
  }
  @keyframes toastIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Tabs */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
  .tab {
    padding: 10px 18px; font-size: 14px; font-weight: 500;
    cursor: pointer; color: var(--muted); transition: all 0.15s;
    border: none; background: none; border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .tab:hover { color: var(--text); }

  /* Delivery tracker */
  .tracker { display: flex; align-items: center; gap: 0; margin: 20px 0; }
  .step {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    flex: 1; position: relative;
  }
  .step:not(:last-child)::after {
    content: ''; position: absolute;
    top: 15px; left: calc(50% + 16px);
    width: calc(100% - 32px); height: 2px;
    background: var(--border);
  }
  .step.done:not(:last-child)::after { background: var(--success); }
  .step-dot {
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; background: var(--surface2); border: 2px solid var(--border);
    position: relative; z-index: 1;
  }
  .step.done .step-dot { background: var(--success); border-color: var(--success); }
  .step.active .step-dot { background: var(--accent); border-color: var(--accent); animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,92,53,0.4); } 50% { box-shadow: 0 0 0 8px rgba(255,92,53,0); } }
  .step-label { font-size: 11px; color: var(--muted); text-align: center; }
  .step.done .step-label, .step.active .step-label { color: var(--text); }

  /* Empty state */
  .empty { text-align: center; padding: 60px 20px; color: var(--muted); }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 8px; }

  /* Search */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 8px 14px;
    min-width: 240px;
  }
  .search-bar input {
    background: none; border: none; outline: none;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
    width: 100%;
  }

  /* Cuisine chip */
  .chip {
    display: inline-flex; align-items: center;
    padding: 4px 12px; border-radius: 20px;
    font-size: 12px; font-weight: 500;
    background: var(--surface2); color: var(--muted);
    border: 1px solid var(--border);
    cursor: pointer; transition: all 0.15s;
  }
  .chip.active, .chip:hover { background: rgba(255,92,53,0.1); color: var(--accent); border-color: rgba(255,92,53,0.3); }

  .section-gap { margin-bottom: 32px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .mb-1 { margin-bottom: 4px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-3 { margin-bottom: 16px; }
  .mb-4 { margin-bottom: 24px; }
  .text-sm { font-size: 13px; }
  .text-muted { color: var(--muted); }
  .text-accent { color: var(--accent); }
  .font-bold { font-weight: 700; }
  .font-syne { font-family: 'Syne', sans-serif; }
`;