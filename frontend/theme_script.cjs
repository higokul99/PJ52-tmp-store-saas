const fs = require('fs');
let content = fs.readFileSync('src/pages/admin-dashboard.jsx', 'utf8');

// Global Backgrounds
content = content.replace(/background:\s*\"#040404\"/g, 'background: \"#f1f2f4\"');
content = content.replace(/background:\s*\"#050505\"/g, 'background: \"#f7f7f7\"');
content = content.replace(/background:\s*\"#161310\"/g, 'background: \"#ffffff\"');
content = content.replace(/background:\s*\"#0e0d0b\"/g, 'background: \"#ffffff\"');
content = content.replace(/background:\s*\"#222\"/g, 'background: \"#ebebeb\"');

// Global Colors
content = content.replace(/color:\s*\"#f6f1e4\"/g, 'color: \"#202223\"');
content = content.replace(/color:\s*\"#8a7a4d\"/g, 'color: \"#6d7175\"');
content = content.replace(/color:\s*\"#fff\"/g, 'color: \"#202223\"');

// Text color classes
content = content.replace(/text-white/g, 'text-dark');
content = content.replace(/text-muted/g, 'text-secondary');

// Borders
content = content.replace(/rgba\(212,175,55,0\.18\)/g, '#dfe3e8');
content = content.replace(/rgba\(212,175,55,0\.15\)/g, '#dfe3e8');
content = content.replace(/rgba\(212,175,55,0\.25\)/g, '#dfe3e8');
content = content.replace(/rgba\(212,175,55,0\.3\)/g, '#dfe3e8');
content = content.replace(/rgba\(212,175,55,0\.1\)/g, '#dfe3e8');

// Table dark -> Table light
content = content.replace(/table-dark/g, 'table-light');

// Cards (gold-panel, gold-stat-card)
content = content.replace(/className=\"gold-stat-card\"/g, 'style={{ background: \"#ffffff\", border: \"1px solid #dfe3e8\", borderRadius: \"8px\", padding: \"16px\", boxShadow: \"0 1px 2px rgba(0,0,0,0.05)\" }}');
content = content.replace(/className=\"gold-panel(.*?)\"/g, 'className=\"$1\" style={{ background: \"#ffffff\", border: \"1px solid #dfe3e8\", borderRadius: \"8px\", padding: \"20px\", boxShadow: \"0 1px 2px rgba(0,0,0,0.05)\" }}');
// Fix if className=\"\" ended up empty
content = content.replace(/className=\"\" /g, '');
content = content.replace(/className=\" \" /g, '');

// Badges
content = content.replace(/gold-badge-emerald/g, 'badge bg-success text-white');
content = content.replace(/gold-badge-amber/g, 'badge bg-warning text-dark');
content = content.replace(/gold-badge-red/g, 'badge bg-danger text-white');

// GOLD constants usage
content = content.replace(/\{GOLD\}/g, '\"#007f5f\"'); // replace gold with green
content = content.replace(/\{GOLD_LIGHT\}/g, '\"#202223\"');
content = content.replace(/\{GOLD_DEEP\}/g, '\"#007f5f\"');

// Input/Select fields
content = content.replace(/bg-dark/g, 'bg-white');
content = content.replace(/border-secondary/g, 'border-light');

fs.writeFileSync('src/pages/admin-dashboard.jsx', content);
console.log('Admin dashboard theme updated.');
