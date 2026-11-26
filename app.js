/*Oiro Lab - 一覧・検索・詳細表示*/
(function () {
  "use strict";

  var WORKS = Array.isArray(window.OIRO_WORKS) ? window.OIRO_WORKS.slice() : [];

  /*---- 定義 ----*/
  var PLATFORMS = {
    android:   { label: "Androidアプリ", icon: "phone" },
    windows:   { label: "Windowsソフト", icon: "monitor" },
    extension: { label: "拡張機能",       icon: "package" }
  };
  var PLATFORM_ORDER = ["android", "windows", "extension"];

  var STATUS = {
    released:   { label: "公開中",   rank: 0 },
    developing: { label: "開発中",   rank: 1 },
    planned:    { label: "開発予定", rank: 2 }
  };
  var STATUS_ORDER = ["released", "developing", "planned"];

  var PENDING_TEXT = {
    developing: "現在開発中です。公開時期や詳細が決まりしだい、このページでお知らせします。",
    planned: "開発を予定しています。内容が決まりしだい、このページでお知らせします。"
  };

  /*---- アイコン ----*/
  function svg(body) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" focusable="false">' + body + "</svg>";
  }
  var ICONS = {
    search: svg('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>'),
    phone: svg('<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M11 18.5h2"/>'),
    monitor: svg('<rect x="3" y="4" width="18" height="12" rx="2.5"/><path d="M8 20h8M12 16v4"/>'),
    "package": svg('<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
    grid: svg('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),
    chevron: svg('<path d="M9 6l6 6-6 6"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    external: svg('<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>'),
    shield: svg('<path d="M12 3l8 3v5.5c0 4.7-3.2 8-8 9.5-4.8-1.5-8-4.8-8-9.5V6l8-3z"/>')
  };

  /*---- ユーティリティ ----*/
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function icon(name, cls) {
    var s = el("span", "ico" + (cls ? " " + cls : ""));
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[name] || "";
    return s;
  }
  function safeUrl(u) {
    return typeof u === "string" && /^https?:\/\//i.test(u) ? u : "";
  }
  /*Google Playの画像URLにはサイズ指定を付ける*/
  function sized(u, spec) {
    return /googleusercontent\.com\//.test(u) && u.indexOf("=") < 0 ? u + "=" + spec : u;
  }
  function fmtDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? m[1] + "年" + Number(m[2]) + "月" + Number(m[3]) + "日" : s || "";
  }
  function fmtShort(s) {
    return String(s || "").replace(/-/g, "/");
  }
  /*検索用の正規化: 全角/半角・大文字小文字・カタカナ/ひらがなの違いを吸収*/
  function fold(s) {
    return String(s || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[\u30a1-\u30f6]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); });
  }

  /*---- データ準備 ----*/
  var byId = {};
  WORKS.forEach(function (w, i) {
    w._i = i; /*同順位のときは works.js に書いた順で並べる*/
    w.tags = w.tags || [];
    w.features = w.features || [];
    w.description = w.description || [];
    w.notes = w.notes || [];
    w.links = w.links || [];
    w.history = w.history || [];
    w.screenshots = w.screenshots || [];
    if (!PLATFORMS[w.platform]) console.warn("[Oiro Lab] platform が不正です:", w.id, w.platform);
    if (!STATUS[w.status]) console.warn("[Oiro Lab] status が不正です:", w.id, w.status);
    byId[w.id] = w;
    w._hay = fold([
      w.name, w.summary, w.kind,
      PLATFORMS[w.platform] && PLATFORMS[w.platform].label,
      STATUS[w.status] && STATUS[w.status].label,
      w.tags.join(" "), w.features.join(" "), w.description.join(" ")
    ].join(" "));
  });

  /*---- 状態 ----*/
  var state = { q: "", platform: "all", status: "all" };
  var tokens = [];

  var listEl = document.getElementById("list");
  var countEl = document.getElementById("count");
  var qEl = document.getElementById("q");
  var boxEl = document.getElementById("searchbox");
  var dlg = document.getElementById("detail");
  var lastTrigger = null;
  var lastId = "";

  function matches(w) {
    if (state.platform !== "all" && w.platform !== state.platform) return false;
    if (state.status !== "all" && w.status !== state.status) return false;
    for (var i = 0; i < tokens.length; i++) {
      if (w._hay.indexOf(tokens[i]) < 0) return false;
    }
    return true;
  }
  function compare(a, b) {
    var ra = STATUS[a.status] ? STATUS[a.status].rank : 9;
    var rb = STATUS[b.status] ? STATUS[b.status].rank : 9;
    if (ra !== rb) return ra - rb;
    var ua = a.updated || "", ub = b.updated || "";
    if (ua !== ub) return ua < ub ? 1 : -1;
    return a._i - b._i;
  }

  /*---- 部品 ----*/
  function statusBadge(status) {
    var s = STATUS[status];
    return el("span", "badge s-" + status, s ? s.label : status);
  }

  function makeThumb(w, size) {
    var wrap = el("span", "thumb" + (size ? " " + size : ""));
    function fallback() {
      wrap.textContent = "";
      wrap.classList.add("is-tile");
      var p = PLATFORMS[w.platform];
      wrap.appendChild(icon(p ? p.icon : "package"));
    }
    if (w.icon && safeUrl(w.icon)) {
      var img = new Image();
      img.alt = "";
      img.decoding = "async";
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer";
      img.onerror = fallback;
      img.src = sized(w.icon, "s160");
      wrap.appendChild(img);
    } else {
      fallback();
    }
    return wrap;
  }

  function card(w) {
    var b = el("button", "item is-" + w.status);
    b.type = "button";
    b.setAttribute("data-id", w.id);
    b.appendChild(makeThumb(w));

    var body = el("span", "body");
    body.appendChild(el("span", "name", w.name));
    body.appendChild(el("span", "sum", w.summary || ""));
    var meta = el("span", "meta");
    meta.appendChild(statusBadge(w.status));
    if (w.kind) meta.appendChild(el("span", "kind", w.kind));
    body.appendChild(meta);
    b.appendChild(body);

    b.appendChild(icon("chevron", "go"));
    b.addEventListener("click", function () { openFromUser(w.id, b); });
    return b;
  }

  function emptyView() {
    var box = el("div", "empty");
    box.appendChild(icon("search"));
    box.appendChild(el("p", null, "条件に合う作品は見つかりませんでした。"));
    var btn = el("button", "linkbtn", "条件をリセット");
    btn.type = "button";
    btn.addEventListener("click", resetAll);
    box.appendChild(btn);
    return box;
  }

  /*---- 一覧の描画 ----*/
  function render() {
    tokens = fold(state.q).split(/\s+/).filter(Boolean);
    var list = WORKS.filter(matches).sort(compare);

    listEl.textContent = "";
    if (!list.length) {
      listEl.appendChild(emptyView());
    } else {
      PLATFORM_ORDER.forEach(function (key) {
        var items = list.filter(function (w) { return w.platform === key; });
        if (!items.length) return;
        var sec = el("section", "group");
        var h = el("h2", "group-title");
        h.appendChild(icon(PLATFORMS[key].icon));
        h.appendChild(document.createTextNode(PLATFORMS[key].label));
        h.appendChild(el("span", "n", String(items.length)));
        sec.appendChild(h);
        var grid = el("div", "grid");
        items.forEach(function (w) { grid.appendChild(card(w)); });
        sec.appendChild(grid);
        listEl.appendChild(sec);
      });
    }

    var filtered = tokens.length > 0 || state.platform !== "all" || state.status !== "all";
    countEl.textContent = filtered ? list.length + "件見つかりました" : WORKS.length + "件の作品";
    boxEl.classList.toggle("has-text", state.q.length > 0);
    syncChips();
  }

  /*---- 絞り込みチップ ----*/
  function addChip(parent, group, value, label, iconName, small) {
    var b = el("button", "chip" + (small ? " sm" : ""));
    b.type = "button";
    b.setAttribute("data-group", group);
    b.setAttribute("data-value", value);
    if (iconName) b.appendChild(icon(iconName));
    b.appendChild(document.createTextNode(label));
    b.addEventListener("click", function () {
      state[group] = value;
      render();
    });
    parent.appendChild(b);
  }
  function buildChips() {
    var pg = document.getElementById("f-platform");
    addChip(pg, "platform", "all", "すべて", "grid", false);
    PLATFORM_ORDER.forEach(function (k) {
      addChip(pg, "platform", k, PLATFORMS[k].label, PLATFORMS[k].icon, false);
    });
    var sg = document.getElementById("f-status");
    addChip(sg, "status", "all", "すべて", null, true);
    STATUS_ORDER.forEach(function (k) {
      addChip(sg, "status", k, STATUS[k].label, null, true);
    });
  }
  function syncChips() {
    var chips = document.querySelectorAll(".chip");
    for (var i = 0; i < chips.length; i++) {
      var c = chips[i];
      c.setAttribute("aria-pressed", String(state[c.getAttribute("data-group")] === c.getAttribute("data-value")));
    }
  }
  function resetAll() {
    state.q = "";
    state.platform = "all";
    state.status = "all";
    qEl.value = "";
    render();
  }

  /*---- 詳細ダイアログ ----*/
  function section(title, node) {
    var s = el("section", "d-sec");
    s.appendChild(el("h3", null, title));
    s.appendChild(node);
    return s;
  }
  function bulletList(items) {
    var ul = el("ul", "dots");
    items.forEach(function (t) { ul.appendChild(el("li", null, t)); });
    return ul;
  }

  function buildDetail(w) {
    var scroll = el("div", "d-scroll");

    /*見出し*/
    var head = el("div", "d-head");
    head.appendChild(makeThumb(w, "lg"));
    var ht = el("div");
    var h2 = el("h2", null, w.name);
    h2.id = "d-title";
    ht.appendChild(h2);
    var badges = el("div", "d-badges");
    badges.appendChild(statusBadge(w.status));
    if (PLATFORMS[w.platform]) badges.appendChild(el("span", "tagpill", PLATFORMS[w.platform].label));
    if (w.kind) badges.appendChild(el("span", "tagpill", w.kind));
    ht.appendChild(badges);
    head.appendChild(ht);
    scroll.appendChild(head);

    if (w.summary) scroll.appendChild(el("p", "d-summary", w.summary));

    /*基本情報*/
    var rows = [];
    if (w.price) rows.push(["料金", w.price]);
    if (w.released) rows.push(["リリース日", fmtDate(w.released)]);
    if (w.updated) rows.push(["最終更新", fmtDate(w.updated)]);
    if (rows.length) {
      var dl = el("dl", "info");
      rows.forEach(function (r) {
        dl.appendChild(el("dt", null, r[0]));
        dl.appendChild(el("dd", null, r[1]));
      });
      var infoSec = el("section", "d-sec");
      infoSec.appendChild(dl);
      scroll.appendChild(infoSec);
    }

    /*概要・特徴・ご案内*/
    if (w.description.length) {
      var box = el("div");
      w.description.forEach(function (t) { box.appendChild(el("p", null, t)); });
      scroll.appendChild(section("概要", box));
    }
    if (w.features.length) scroll.appendChild(section("主な特徴", bulletList(w.features)));
    if (w.notes.length) scroll.appendChild(section("ご案内", bulletList(w.notes)));

    /*スクリーンショット*/
    var shotUrls = w.screenshots.map(safeUrl).filter(Boolean);
    if (shotUrls.length) {
      var strip = el("div", "shots");
      var shotSec = section("スクリーンショット", strip);
      var remaining = shotUrls.length;
      shotUrls.forEach(function (u, i) {
        var img = new Image();
        img.alt = w.name + " のスクリーンショット " + (i + 1);
        img.loading = "lazy";
        img.decoding = "async";
        img.referrerPolicy = "no-referrer";
        img.onerror = function () {
          if (img.parentNode) img.parentNode.removeChild(img);
          remaining -= 1;
          if (remaining <= 0 && shotSec.parentNode) shotSec.parentNode.removeChild(shotSec);
        };
        img.src = sized(u, "h480");
        strip.appendChild(img);
      });
      scroll.appendChild(shotSec);
    }

    /*更新履歴*/
    if (w.history.length) {
      var ul = el("ul", "history");
      w.history.forEach(function (h) {
        var li = el("li");
        li.appendChild(el("time", null, fmtShort(h.date)));
        li.appendChild(el("span", null, h.text));
        ul.appendChild(li);
      });
      scroll.appendChild(section("更新履歴", ul));
    }

    /*リンク / 準備中の案内*/
    var links = w.links.filter(function (l) { return safeUrl(l.url); });
    if (links.length) {
      var actions = el("div", "actions");
      links.forEach(function (l, i) {
        var a = el("a", "btn " + (i === 0 ? "primary" : "ghost"));
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.appendChild(document.createTextNode(l.label));
        a.appendChild(icon(i === 0 ? "external" : l.kind === "privacy" ? "shield" : "external"));
        actions.appendChild(a);
      });
      scroll.appendChild(actions);
    } else if (PENDING_TEXT[w.status]) {
      var note = el("section", "d-sec");
      note.appendChild(el("p", "callout", PENDING_TEXT[w.status]));
      scroll.appendChild(note);
    }

    return scroll;
  }

  function showDetail(id) {
    var w = byId[id];
    if (!w) return;
    lastId = id;
    dlg.textContent = "";

    var close = el("button", "d-close");
    close.type = "button";
    close.setAttribute("aria-label", "閉じる");
    close.appendChild(icon("close"));
    close.addEventListener("click", requestClose);
    dlg.appendChild(close);
    dlg.appendChild(buildDetail(w));

    if (!dlg.open) {
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
    }
    document.documentElement.classList.add("modal-open");
    var sc = dlg.querySelector(".d-scroll");
    if (sc) sc.scrollTop = 0;
  }

  function hideDetail() {
    if (dlg.open) {
      if (typeof dlg.close === "function") dlg.close();
      else dlg.removeAttribute("open");
    }
    document.documentElement.classList.remove("modal-open");
    var t = lastTrigger && document.body.contains(lastTrigger) ? lastTrigger : null;
    if (!t && lastId) t = listEl.querySelector('[data-id="' + lastId + '"]');
    if (t && t.focus) t.focus({ preventScroll: true });
    lastTrigger = null;
  }

  /*URLのハッシュ(#/作品ID)で詳細を共有できるようにする*/
  function parseHash() {
    var m = /^#\/(.+)$/.exec(location.hash);
    if (!m) return "";
    try { return decodeURIComponent(m[1]); } catch (e) { return ""; }
  }
  function syncFromHash() {
    var id = parseHash();
    if (id && byId[id]) showDetail(id);
    else hideDetail();
  }
  function openFromUser(id, trigger) {
    lastTrigger = trigger || null;
    history.pushState({ modal: id }, "", "#/" + encodeURIComponent(id));
    showDetail(id);
  }
  function requestClose() {
    if (history.state && history.state.modal) {
      history.back();
    } else {
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      hideDetail();
    }
  }

  dlg.addEventListener("cancel", function (e) { e.preventDefault(); requestClose(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) requestClose(); });
  window.addEventListener("popstate", syncFromHash);

  /*---- 起動 ----*/
  buildChips();

  qEl.addEventListener("input", function () {
    state.q = qEl.value;
    render();
  });
  document.getElementById("qclear").addEventListener("click", function () {
    state.q = "";
    qEl.value = "";
    render();
    qEl.focus();
  });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  render();
  if (parseHash()) syncFromHash();
})();
