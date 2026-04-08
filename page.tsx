* {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f6f8;
  color: #111827;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select, textarea {
  font: inherit;
}

.page {
  min-height: 100vh;
}

.topbar {
  background: #0f172a;
  color: white;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 18px;
  font-weight: 700;
}

.topbar-sub {
  font-size: 13px;
  color: #cbd5e1;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px;
}

.login-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.login-grid {
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
}

.hero-card {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  padding: 36px;
}

.hero-badge, .badge {
  display: inline-block;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
}

.hero-badge {
  background: rgba(255,255,255,0.08);
  color: white;
}

.hero-title {
  font-size: 42px;
  line-height: 1.05;
  margin: 18px 0 12px;
}

.hero-copy {
  max-width: 700px;
  line-height: 1.65;
  color: #dbe4ee;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 22px;
}

.stat {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 16px;
}

.stat-label {
  font-size: 12px;
  text-transform: uppercase;
  color: #cbd5e1;
  letter-spacing: 0.04em;
}

.stat-value {
  margin-top: 8px;
  font-size: 22px;
  font-weight: 700;
}

.hero-note {
  margin-top: 18px;
  border-radius: 18px;
  padding: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  line-height: 1.6;
  color: #dbe4ee;
}

.login-card {
  padding: 28px;
}

.login-title {
  font-size: 30px;
  margin: 0 0 18px;
}

.field {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.input, .select {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  padding: 13px 14px;
  background: white;
}

.button {
  display: inline-block;
  border: none;
  border-radius: 14px;
  padding: 13px 18px;
  font-weight: 700;
  cursor: pointer;
}

.button-primary {
  width: 100%;
  background: #0f172a;
  color: white;
}

.button-secondary {
  background: white;
  color: #0f172a;
  border: 1px solid #cbd5e1;
}

.helper {
  margin-top: 14px;
  padding: 14px;
  font-size: 12px;
  line-height: 1.6;
  color: #6b7280;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.header-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 20px;
  margin-bottom: 20px;
}

.padded {
  padding: 22px;
}

.h1 {
  margin: 0;
  font-size: 36px;
}

.subtle {
  color: #6b7280;
  line-height: 1.65;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 14px;
}

.mini-box {
  background: #f8fafc;
  padding: 14px;
  border-radius: 16px;
}

.mini-value {
  font-size: 28px;
  font-weight: 700;
  margin-top: 8px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  font-weight: 600;
}

.tab-active {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

.content-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 20px;
}

.filter-card, .list-card, .detail-card {
  padding: 20px;
}

.section-title {
  font-size: 22px;
  margin: 0 0 14px;
}

.alert {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  color: #9a3412;
  border-radius: 16px;
  padding: 14px;
  line-height: 1.6;
  font-size: 14px;
}

.company-list {
  display: grid;
  gap: 14px;
}

.company-item {
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 18px;
  cursor: pointer;
  background: white;
}

.company-item.active {
  border-color: #0f172a;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);
}

.company-title {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.badge {
  background: #e2e8f0;
  color: #0f172a;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.tag {
  font-size: 12px;
  padding: 7px 10px;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: white;
}

.score-box {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.score-mini {
  background: #f8fafc;
  border-radius: 14px;
  padding: 12px;
}

.score-number {
  font-size: 26px;
  font-weight: 700;
  margin-top: 6px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel {
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
}

.kv {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: #6b7280;
}

.pre {
  white-space: pre-wrap;
  line-height: 1.65;
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
}

.list-plain {
  margin: 12px 0 0;
  padding-left: 18px;
  line-height: 1.8;
}

.query-box {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 12px;
  background: white;
}

@media (max-width: 980px) {
  .login-grid,
  .header-grid,
  .content-grid,
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .hero-stats,
  .mini-grid,
  .score-box {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 16px;
  }

  .hero-title {
    font-size: 34px;
  }
}