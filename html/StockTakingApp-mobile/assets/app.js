/* Stock Take handheld app — clickable hi-fi prototype.
   createApp(rootEl, { screen, preset })  renders one phone; screens.html renders ten of them. */
(function () {
  var D = window.APPDATA;
  var I = {
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>', chevD: '<path d="m6 9 6 6 6-6"/>', back: '<path d="m15 18-6-6 6-6"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8v8M10 8v8M13 8v8M17 8v8"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    sync: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    one: '<path d="M6 12h12"/>', many: '<path d="M4 8h16M4 12h16M4 16h16"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><path d="M12 9v4M12 17h.01"/>'
  };
  function ic(n, s, w) { s = s || 20; return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 2.2) + '" stroke-linecap="round" stroke-linejoin="round">' + I[n] + '</svg>'; }
  var esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var fmt = function (n) { return Number(n).toLocaleString('en-GB'); };
  var COLORS = { pav: '#2563eb', str: '#7c3aed', crn: '#059669' };
  /* Area location ranges as set in the admin panel — the handheld resolves the area from the scanned location */
  var AREAS = { pav: [['Area 1 - Shop Floor', 2001, 2074], ['Area 2 - Store Room', 2075, 2087]], str: [['Store 9104', 9104, 9104]], crn: [['Shop Floor', 1, 11]] };
  var LAPTOP = { name: 'STOCKTAKE-LAPTOP-01', wifi: 'STOCKTAKE', ip: '192.168.0.10' };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };

  function sbar() {
    return '<div class="sb"><span>14:32</span><span class="r">' + ic('wifi', 15, 2.4) +
      '<svg width="26" height="13" viewBox="0 0 26 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".55"/><rect x="2" y="2" width="15" height="9" rx="2" fill="currentColor"/><rect x="23.5" y="4" width="2" height="5" rx="1" fill="currentColor" opacity=".55"/></svg></span></div>';
  }
  function hero(title, sub, o) {
    o = o || {};
    return '<div class="hero">' + sbar() + '<div class="hd"><div class="row">' +
      (o.back ? '<button class="iconbtn" data-a="' + o.back + '" aria-label="Back">' + ic('back', 20, 2.6) + '</button>' : '') +
      '<div style="flex:1;min-width:0"><h1>' + title + '</h1>' + (sub ? '<div class="sub">' + sub + '</div>' : '') + '</div>' + (o.right || '') +
      '</div>' + (o.extra || '') + '</div></div>';
  }

  function createApp(root, opts) {
    opts = opts || {};
    var S = {
      screen: opts.screen || 'login', user: 'UMAIR', client: null, area: null, loc: '', locVal: '', mode: 'single',
      items: [], drafts: {}, hist: null, done: [], extra: { locs: 0, recs: 0 }, open: {}, toast: '', flash: null, modal: null,
      codeVal: '', qtyVal: '', demoIdx: 0, syncState: 'idle', addArea: false, areaName: '', areasExtra: [], nextLoc: 0
    };
    if (opts.preset) applyPreset(S, opts.preset);
    var timer = null;

    function cl() { return D.clients.find(function (c) { return c.id === S.client; }); }
    function lookup(code) { var c = cl(); var f = c && c.demo.find(function (d) { return d[0] === code; }); return f ? f[1] : ''; }
    function total(items) { return items.reduce(function (a, i) { return a + i.qty; }, 0); }
    function pending() { return S.done.filter(function (d) { return !d.synced; }); }
    function toast(m) { S.toast = m; clearTimeout(timer); timer = setTimeout(function () { S.toast = ''; render(); }, 2400); }
    function go(s) { S.screen = s; S.flash = null; S.modal = null; render(); }

    /* ───────────── screens ───────────── */
    var V = {};
    V.login = function () {
      return { html:
        '<div class="hero login-hero">' + sbar().replace('padding', 'padding') +
        '<div class="logo"><img src="assets/logo-icon.png" alt=""></div><h1>STOCKTAKE</h1><p>Handheld counter</p></div>' +
        '<div class="bd" style="padding-top:0;overflow:visible"><div class="card login-card">' +
        '<div><p class="label">Username</p><label class="field">' + ic('user', 20) + '<input data-f="user" value="' + esc(S.user) + '" placeholder="e.g. UMAIR" autocapitalize="characters" autocomplete="off"></label></div>' +
        '<button class="btn primary" data-a="login" style="flex:none;width:100%">LOGIN</button></div>' +
        '<div class="devinfo"><span>Device<br><b class="mono">' + D.device + '</b></span><span style="text-align:right">Battery <b>78%</b><br>App <b>v1.0</b></span></div></div>' +
        '<div style="padding:0 0 8px"><div class="homebar"></div></div>', cls: 'login' };
    };

    V.list = function () {
      var cards = D.clients.map(function (c) {
        return '<button class="card client" data-a="pick" data-id="' + c.id + '"><div class="avatar" style="background:' + COLORS[c.id] + '">' + esc(c.name[0]) + '</div>' +
          '<div><div class="nm">' + esc(c.name) + '</div><div class="mt">' + esc(c.sub) + ' · ' + c.date + '</div></div>' +
          '<span class="end">' + ic('chevR', 22) + '</span></button>';
      }).join('');
      return { head: hero('Stock Takes', 'Select a client to continue', { right: '<button class="iconbtn" data-a="logout" aria-label="Log out">' + ic('logout', 19) + '</button>' }),
        body: '<div class="listwrap"><div><p class="label">Clients</p>' + cards + '<p class="hint">Tap a client → opens stock take history &amp; data</p></div>' +
          '<div class="netnote"><span class="dot"></span><div><b>Connected to laptop ' + esc(LAPTOP.name) + '</b><span>Wi-Fi ' + esc(LAPTOP.wifi) + ' · ' + esc(LAPTOP.ip) + ' — clients &amp; data on this network only</span></div></div></div>' };
    };

    function histBlock() {
      var c = cl(), H = S.hist;
      var doneN = H.filter(function (h) { return h.status === 'DONE'; }).length;
      var units = H.filter(function (h) { return h.status === 'DONE'; }).reduce(function (a, h) { return a + h.qty; }, 0);
      var openN = H.length - doneN;
      var stats = '<div class="stats"><div class="card stat"><b style="color:var(--ok)">' + doneN + '</b><span>Done</span></div><div class="card stat"><b>' + fmt(units) + '</b><span>Units</span></div><div class="card stat"><b style="color:var(--warn)">' + openN + '</b><span>Open</span></div></div>';
      var acc = H.map(function (h) {
        var ok = h.status === 'DONE', op = !!S.open[h.loc];
        var rows = h.lines.map(function (l, i) {
          return '<tr><td><span class="code mono">' + esc(l[0]) + '</span>' + (l[2] ? '<span class="desc">' + esc(l[2]) + '</span>' : '<span class="nod">no description on file</span>') + '</td>' +
            '<td class="mono">' + h.loc + '</td><td class="r"><span class="qty">' + l[1] + '</span></td>' +
            '<td class="r"><button class="rm" data-a="rmhist" data-loc="' + h.loc + '" data-i="' + i + '" aria-label="Remove line">' + ic('trash', 15) + '</button></td></tr>';
        }).join('');
        var body = ok ? '<table class="tbl"><thead><tr><th>Barcode</th><th>Loc</th><th class="r">Qty</th><th class="r">Action</th></tr></thead><tbody>' + rows + '</tbody></table>' +
          (h.count > h.lines.length ? '<div class="more">+ ' + (h.count - h.lines.length) + ' more lines on the laptop</div>' : '')
          : '<div class="more" style="border:0;padding:14px">Not completed yet — tap CONTINUE to keep counting this location.</div>';
        return '<div class="card acc' + (op ? ' open' : '') + '"><button class="acc-h" data-a="acc" data-loc="' + h.loc + '">' +
          '<span class="avatar" style="width:38px;height:38px;border-radius:12px;font-size:13px;background:' + (ok ? 'var(--ok-bg)' : 'var(--warn-bg)') + ';color:' + (ok ? 'var(--ok)' : 'var(--warn)') + '">' + (ok ? ic('check', 18, 3) : ic('pin', 18)) + '</span>' +
          '<div><div class="t">Location ' + h.loc + '</div><div class="s">' + esc(h.area.replace(/^Area \d+ - /, '')) + ' · ' + fmt(h.qty) + (h.qty === 1 ? ' unit' : ' units') + '</div></div>' +
          '<span class="pill ' + (ok ? 'ok' : 'warn') + '" style="margin-left:auto">' + h.status + '</span><span class="chev" style="margin-left:6px">' + ic('chevD', 18) + '</span></button><div class="acc-b">' + body + '</div></div>';
      }).join('');
      return stats + acc + '<p class="hint">Locations scanned by you</p>';
    }
    V.history = function () {
      var c = cl();
      return { head: hero(esc(c.name), esc(c.sub), { back: 'toList', right: '<button data-a="cont" class="chip" style="height:38px;background:#fff;color:var(--primary-dark);font-weight:800;padding:0 14px">CONTINUE ' + ic('chevR', 16, 3) + '</button>' }),
        body: histBlock(),
        foot: '<button class="btn ghost" data-a="download"' + (S.dl === 'busy' ? ' disabled' : '') + '>' + (S.dl === 'busy' ? '<span class="spin">' + ic('sync', 18) + '</span> DOWNLOADING…' : ic('download', 19) + ' DOWNLOAD FILE') + '</button><button class="btn primary" data-a="goSync">' + ic('sync', 20) + ' SYNC</button>',
        hintFoot: 'DOWNLOAD FILE gets the lookup file from the laptop · SYNC sends all local scans to it' };
    };

    function areaFor(v) {
      var n = parseInt(v, 10); if (!v || isNaN(n)) return null;
      var r = (AREAS[S.client] || []).find(function (x) { return n >= x[1] && n <= x[2]; });
      return r ? r[0] : null;
    }
    V.loc = function () {
      var c = cl(), ar = areaFor(S.locVal);
      var dup = S.hist && S.hist.find(function (h) { return h.loc === S.locVal && h.status === 'DONE'; });
      var warn = dup ? '<div class="flash warn" style="margin-top:12px">' + ic('alert', 22) + '<div><b>Location ' + S.locVal + ' is already synced</b><small>Opening it again creates a duplicate that must be resolved on the laptop.</small></div></div>' : '';
      var area = !S.locVal ? '<div class="areabox idle">' + ic('layers', 18) + '<span>The area is picked up automatically from the location</span></div>'
        : (ar ? '<div class="areabox ok">' + ic('layers', 18) + '<div><small>Area</small><b>' + esc(ar) + '</b></div><span class="pill ok" style="margin-left:auto">' + ic('check', 12, 3.4) + ' Found</span></div>'
          : '<div class="areabox bad">' + ic('alert', 18) + '<div><b>Location ' + esc(S.locVal) + ' is not in this stock take</b><small>Check the code, or ask the supervisor to add it in the admin panel.</small></div></div>');
      return { head: hero('Enter Location', esc(c.name) + ' · ' + esc(c.sub), { back: 'toHist', right: '<button class="iconbtn" data-a="goSync" aria-label="Sync">' + ic('sync', 19) + '</button>' }),
        body: '<button class="scanbtn compact" data-a="scanLoc">' + ic('scan', 34, 1.8) + '<span class="t">SCAN</span></button>' +
          '<div class="or">or enter the code</div><p class="label">Location code</p><label class="field">' + ic('pin', 20) + '<input data-f="locVal" inputmode="numeric" value="' + esc(S.locVal) + '" placeholder="location code…"></label>' + area + warn +
          '<p class="hint">Scan a location barcode, or type its code</p>',
        foot: '<button class="btn ghost" data-a="toHist">BACK</button><button class="btn primary"' + (ar ? '' : ' disabled') + ' data-a="locNext">NEXT</button>' };
    };

    V.mode = function () {
      var m = function (id, t, p, col, bg, sym) {
        return '<button class="card mode-card' + (S.mode === id ? ' sel' : '') + '" data-a="mode" data-m="' + id + '"><div class="big"><span class="mi" style="background:' + bg + ';color:' + col + '">' + sym + '</span><div><h3>' + t + '</h3><p>' + p + '</p></div></div></button>';
      };
      return { head: hero('Scan Type', 'Location ' + esc(S.loc) + ' · ' + esc(S.area), { back: 'toLoc' }),
        body: '<p class="label">Choose how this location is counted</p>' +
          m('single', 'SINGLE SCAN', 'Same item, scan again → qty +1 automatically', 'var(--primary)', '#dbeafe', '+1') +
          m('multi', 'MULTI SCAN', 'Asks you to enter a quantity each time', 'var(--violet)', 'var(--violet-bg)', '×N') +
          '<p class="hint">Pick once per location — the switch on the scan screen changes it later</p>',
        foot: '<button class="btn ghost" data-a="toLoc">BACK</button>' };
    };

    V.main = function () {
      var single = S.mode === 'single', it = S.items;
      var extra = '<div style="display:flex;align-items:center;gap:10px;margin-top:12px"><div class="seg"><button data-a="setmode" data-m="single" class="' + (single ? 'on' : '') + '">Single</button><button data-a="setmode" data-m="multi" class="' + (!single ? 'on' : '') + '">Multi</button></div><span class="chip" style="margin-left:auto">' + ic('pin', 14) + ' ' + esc(S.loc) + '</span></div>';
      var flash = S.flash ? '<div class="flash' + (S.flash.warn ? ' warn' : '') + '">' + ic(S.flash.warn ? 'alert' : 'check', 22, 2.8) + '<div><b>' + esc(S.flash.t) + '</b>' + (S.flash.s ? '<small>' + esc(S.flash.s) + '</small>' : '') + '</div></div>' : '';
      var rows = it.map(function (x, i) {
        return '<tr><td class="mono" style="color:var(--faint)">' + (i + 1) + '</td><td><span class="code mono">' + esc(x.code) + '</span>' + (x.desc ? '<span class="desc">' + esc(x.desc) + '</span>' : '') + '</td><td class="r"><span class="qty">' + x.qty + '</span></td><td class="r"><button class="rm" data-a="rm" data-i="' + i + '" aria-label="Remove">' + ic('trash', 15) + '</button></td></tr>';
      }).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--faint);padding:22px">Nothing scanned yet</td></tr>';
      return { head: hero('Scan Items', '', { back: 'toMode', extra: extra }),
        body: flash + '<button class="scanbtn compact" data-a="scan">' + ic('scan', 34, 1.8) + '<span class="t">SCAN</span></button>' +
          '<p class="label" style="margin-top:12px">Enter code</p><label class="field">' + ic('scan', 20) + '<input data-f="codeVal" inputmode="numeric" value="' + esc(S.codeVal) + '" placeholder="scan or type barcode…"></label>' +
          '<div class="qtyrow" style="margin-top:8px"><div><p class="label">Enter qty</p><label class="field"><input data-f="qtyVal" inputmode="numeric" value="' + (single ? '1' : esc(S.qtyVal)) + '"' + (single ? ' disabled' : '') + ' placeholder="qty"></label></div><button class="btn primary" data-a="save" style="height:52px">' + ic('save', 19) + ' SAVE</button></div>' +
          '<div style="display:flex;justify-content:space-between;align-items:baseline;margin:14px 2px 6px"><p class="label" style="margin:0">Scanned items</p><span style="font-size:12px;color:var(--muted);font-weight:600">' + it.length + ' lines · <b style="color:var(--ink)">' + total(it) + '</b> units</span></div>' +
          '<div class="card" style="overflow:hidden"><table class="tbl"><thead><tr><th style="width:26px">No.</th><th>Barcode</th><th class="r">Qty</th><th class="r">Action</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<p class="hint">' + (single ? 'Single scan = auto +1' : 'Multi scan = asks qty each time') + ' · tap the bin to remove a line</p>',
        foot: '<button class="btn ghost" data-a="chg">CHANGE LOCATION</button><button class="btn ok"' + (it.length ? '' : ' disabled') + ' data-a="toComplete">COMPLETE</button>' };
    };

    V.complete = function () {
      var c = cl();
      return { head: hero('Complete Location', 'Check the totals before you finish', { back: 'toMain' }),
        body: '<div class="card"><div class="bignum"><b>' + fmt(total(S.items)) + '</b><span>Units counted</span></div>' +
          '<div class="sumrow"><span>Stock take</span><b>' + esc(c.name) + '</b></div><div class="sumrow"><span>Area</span><b>' + esc(S.area) + '</b></div>' +
          '<div class="sumrow"><span>Location</span><b class="mono">' + esc(S.loc) + '</b></div><div class="sumrow"><span>Products</span><b>' + S.items.length + '</b></div>' +
          '<div class="sumrow"><span>Scan type</span><b>' + (S.mode === 'single' ? 'Single' : 'Multi') + '</b></div></div>' +
          '<p class="hint">Complete → back to location selection. The scans stay saved on this device until you sync.</p>',
        foot: '<button class="btn ghost" data-a="toMain">BACK</button><button class="btn ok" data-a="complete">' + ic('check', 20, 3) + ' COMPLETE</button>' };
    };

    V.sync = function () {
      var p = pending(), recs = p.reduce(function (a, d) { return a + d.lines.length; }, 0) + S.extra.recs, locs = p.length + S.extra.locs;
      var st = S.syncState, ring = st === 'busy' ? ' busy' : (st === 'done' ? ' done' : '');
      var pill = st === 'busy' ? '<span class="pill blue">Syncing…</span>' : (st === 'done' ? '<span class="pill ok">Synced</span>' : '<span class="pill ' + (locs ? 'warn' : 'ok') + '">' + (locs ? 'Pending' : 'Nothing to sync') + '</span>');
      var chips = p.map(function (d) { return '<span class="pill blue mono">' + d.loc + '</span>'; }).join(' ');
      return { head: hero('Sync Data', 'Send this device’s scans to the laptop', { back: 'toBack' }),
        body: '<div class="syncring' + ring + '">' + (st === 'done' ? ic('check', 56, 2.6) : ic('sync', 56, 2)) + '</div><div style="text-align:center;margin:6px 0 16px">' + pill + '</div>' +
          '<div class="stats" style="grid-template-columns:1fr 1fr"><div class="card stat" style="padding:16px"><b style="font-size:30px">' + locs + '</b><span>Pending locations</span></div><div class="card stat" style="padding:16px"><b style="font-size:30px">' + fmt(recs) + '</b><span>Pending records</span></div></div>' +
          (chips ? '<p class="label" style="margin-top:6px">Waiting to sync</p><div style="display:flex;flex-wrap:wrap;gap:6px">' + chips + '</div>' : '') +
          '<p class="hint">Sync is always manual — never automatic.<br>Saved scans are never lost if the Wi-Fi drops.</p>',
        foot: '<button class="btn primary"' + ((locs || st === 'busy') && st !== 'busy' ? '' : ' disabled') + ' data-a="doSync">' + ic('sync', 20) + ' SYNC TO PC</button>' };
    };

    /* ───────────── render ───────────── */
    function render() {
      var f = document.activeElement, fid = f && root.contains(f) && f.dataset ? f.dataset.f : null, pos = fid ? f.selectionStart : 0;
      var v = V[S.screen]();
      var inner = v.html ? v.html : v.head + '<div class="bd">' + v.body + '</div>' +
        (v.foot ? '<div class="ft" style="flex-wrap:wrap">' + (v.hintFoot ? '<div style="width:100%;text-align:center;font-size:11.5px;color:var(--muted);margin:-2px 0 2px">' + v.hintFoot + '</div>' : '') + v.foot + '</div>' : '');
      var modal = '';
      if (S.modal) modal = '<div class="scrim"><div class="sheet"><div class="grab"></div><h2>Save this scan?</h2><div class="kv"><div><span>Barcode</span><b class="mono">' + esc(S.modal.code) + '</b></div>' + (S.modal.desc ? '<div><span>Product</span><b style="font-size:13px;text-align:right">' + esc(S.modal.desc) + '</b></div>' : '') + '<div><span>Qty</span><b style="color:var(--primary);font-size:20px">' + S.modal.qty + '</b></div></div><div class="actions"><button class="btn ghost" data-a="no">NO</button><button class="btn primary" data-a="yes">YES</button></div></div></div>';
      var t = S.toast ? '<div class="toast">' + ic('check', 20, 3) + esc(S.toast) + '</div>' : '';
      root.classList.add('device');
      var NAV = '<div class="nav"><button data-a="hwback" aria-label="Back"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4v16L5 12z"/></svg></button><button data-a="hwhome" aria-label="Home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="7"/></svg></button><button data-a="hwrecent" aria-label="Recent apps"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="5" width="14" height="14" rx="2"/></svg></button></div>';
      root.innerHTML = '<span class="hw-btn hw-vol" style="top:150px"></span><span class="hw-btn hw-vol" style="top:208px"></span>' +
        '<button class="hw-btn hw-scan l" data-a="hwscan" aria-label="Scan trigger (left)" title="Scan trigger"></button><button class="hw-btn hw-scan r" data-a="hwscan" aria-label="Scan trigger (right)" title="Scan trigger"></button>' +
        '<div class="hw-top"><span class="hw-speaker"></span><div class="scanwin"></div><span class="hw-led"></span></div>' +
        '<div class="screen">' + inner + modal + t + NAV + '</div><span class="hw-mic"></span>';
      if (fid) { var n = root.querySelector('[data-f="' + fid + '"]'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) { } } }
    }

    /* ───────────── actions ───────────── */
    function addItem(code, qty) {
      var e = S.items.find(function (x) { return x.code === code; });
      if (e) e.qty += qty; else S.items.push({ code: code, qty: qty, desc: lookup(code) });
      return e ? e.qty : qty;
    }
    function fire() { root.classList.add('firing'); clearTimeout(fire.t); fire.t = setTimeout(function () { root.classList.remove('firing'); }, 420); }
    var BACK = { history: 'toList', loc: 'toHist', mode: 'toLoc', main: 'toMode', complete: 'toMain', sync: 'toBack' };
    var A = {
      hwscan: function () { fire(); if (S.screen === 'main') A.scan(); else if (S.screen === 'loc') A.scanLoc(); else toast('Open a scan screen to use the trigger'); },
      hwback: function () { if (BACK[S.screen]) A[BACK[S.screen]](); },
      hwhome: function () { if (S.screen !== 'login') go(S.client ? 'list' : 'list'); },
      hwrecent: function () { },
      login: function () { go('list'); },
      logout: function () { go('login'); },
      pick: function (el) { S.client = el.dataset.id; S.hist = clone(cl().history); S.area = null; S.areasExtra = []; S.open = {}; S.nextLoc = parseInt(cl().nextLoc, 10); S.locVal = ''; S.items = []; S.drafts = {}; go('history'); },
      toList: function () { go('list'); }, toHist: function () { go('history'); }, cont: function () { go('loc'); },
      acc: function (el) { S.open[el.dataset.loc] = !S.open[el.dataset.loc]; render(); },
      rmhist: function (el) { var h = S.hist.find(function (x) { return x.loc === el.dataset.loc; }); var l = h.lines.splice(+el.dataset.i, 1)[0]; h.qty -= l[1]; h.count -= 1; toast('Line removed — will re-sync'); },
      scanLoc: function () { fire(); S.locVal = String(S.nextLoc).padStart(cl().nextLoc.length, '0'); S.nextLoc++; render(); },
      locNext: function () { S.area = areaFor(S.locVal); if (!S.area) return; S.loc = S.locVal; go('mode'); }, toLoc: function () { go('loc'); },
      mode: function (el) { S.mode = el.dataset.m; S.items = S.drafts[S.loc] || []; S.codeVal = ''; S.qtyVal = ''; go('main'); },
      setmode: function (el) { S.mode = el.dataset.m; S.flash = null; render(); }, toMode: function () { go('mode'); },
      scan: function () {
        fire(); var c = cl(), d = c.demo[S.demoIdx++ % c.demo.length];
        if (S.mode === 'single') { var q = addItem(d[0], 1); S.flash = { t: '+1 · ' + d[0], s: (d[1] || 'No description on file') + ' — now ' + q }; S.codeVal = ''; }
        else { S.codeVal = d[0]; S.flash = { t: 'Scanned ' + d[0], s: (d[1] || 'No description on file') + ' — enter the quantity' }; S.qtyVal = ''; }
        render();
        if (S.mode === 'multi') { var n = root.querySelector('[data-f="qtyVal"]'); if (n) n.focus(); }
      },
      save: function () {
        var code = S.codeVal.trim(); if (!code) { S.flash = { t: 'Enter or scan a barcode first', warn: true }; return render(); }
        if (S.mode === 'single') { var q = addItem(code, 1); S.flash = { t: '+1 · ' + code, s: 'now ' + q }; S.codeVal = ''; return render(); }
        var qty = parseInt(S.qtyVal, 10); if (!(qty > 0)) { S.flash = { t: 'Enter a quantity', warn: true }; return render(); }
        S.modal = { code: code, qty: qty, desc: lookup(code) }; render();
      },
      yes: function () { var m = S.modal; S.modal = null; var q = addItem(m.code, m.qty); S.flash = { t: 'Saved · ' + m.code, s: m.qty + ' added — line total ' + q }; S.codeVal = ''; S.qtyVal = ''; render(); },
      no: function () { S.modal = null; render(); },
      rm: function (el) { S.items.splice(+el.dataset.i, 1); render(); },
      chg: function () { if (S.items.length) { S.drafts[S.loc] = S.items; toast('Location ' + S.loc + ' left open — saved on device'); } S.locVal = ''; S.items = []; go('loc'); },
      toComplete: function () { go('complete'); }, toMain: function () { go('main'); },
      complete: function () {
        S.done.push({ loc: S.loc, area: S.area, qty: total(S.items), lines: S.items.map(function (x) { return [x.code, x.qty, x.desc]; }), synced: false });
        delete S.drafts[S.loc]; var l = S.loc; S.items = []; S.locVal = ''; S.nextLoc = Math.max(S.nextLoc, parseInt(l, 10) + 1); S.screen = 'loc'; toast('Location ' + l + ' completed — saved on device'); render();
      },
      goSync: function () { S.syncBack = S.screen; S.syncState = 'idle'; go('sync'); },
      toBack: function () { go(S.syncBack || 'history'); },
      doSync: function () {
        S.syncState = 'busy'; render();
        setTimeout(function () {
          var n = pending().length + S.extra.locs;
          pending().forEach(function (d) { d.synced = true; if (S.hist) S.hist.push({ loc: d.loc, area: d.area, status: 'DONE', qty: d.qty, count: d.lines.length, lines: d.lines.slice(0, 5) }); });
          S.extra = { locs: 0, recs: 0 }; S.syncState = 'done'; toast(n + ' location' + (n === 1 ? '' : 's') + ' synced to the laptop'); render();
        }, 1500);
      }
    };

    root.addEventListener('click', function (e) { var el = e.target.closest('[data-a]'); if (el && root.contains(el) && A[el.dataset.a]) A[el.dataset.a](el); });
    root.addEventListener('input', function (e) { var f = e.target.dataset && e.target.dataset.f; if (!f) return; S[f] = e.target.value; if (f === 'locVal') render(); });
    root.addEventListener('keydown', function (e) { if (e.key !== 'Enter') return; var f = e.target.dataset && e.target.dataset.f; if (f === 'user') A.login(); else if (f === 'locVal' && areaFor(S.locVal)) A.locNext(); else if (f === 'codeVal' || f === 'qtyVal') A.save(); });
    render();
    return { state: S, go: go };
  }

  /* screens.html presets: each phone starts in a realistic mid-flow state */
  function applyPreset(S, p) {
    var c = D.clients[0];
    S.client = 'pav'; S.hist = clone(c.history); S.area = c.areas[0]; S.loc = c.nextLoc; S.locVal = (p === 'loc') ? '2004' : ''; S.nextLoc = parseInt(c.nextLoc, 10);
    var mk = function (n, qs) { return c.demo.slice(0, n).map(function (d, i) { return { code: d[0], qty: qs[i], desc: '' }; }); };
    if (p === 'history') S.open = { '2003': true };
    if (p === 'loc') S.locVal = '2004';
    if (p === 'main-single') { S.mode = 'single'; S.items = mk(3, [1, 2, 1]); S.flash = { t: '+1 · ' + c.demo[2][0], s: 'No description on file — now 1' }; }
    if (p === 'main-multi') { S.mode = 'multi'; S.items = mk(3, [3, 5, 6]); S.codeVal = c.demo[3][0]; S.qtyVal = '3'; S.modal = { code: c.demo[3][0], qty: 3, desc: '' }; }
    if (p === 'complete') { S.mode = 'multi'; S.items = mk(6, [3, 5, 6, 2, 8, 4]); }
    if (p === 'sync') { S.extra = { locs: 8, recs: 42 }; }
  }
  window.createApp = createApp;
})();
