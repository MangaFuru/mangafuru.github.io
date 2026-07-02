/* MangaFuru bilingual switch — first-party, no third-party scripts.
   Without JS the static markup keeps lang="zh-Hant" and CSS hides the
   English blocks, so the site still renders correctly. */
(function () {
  "use strict";
  var KEY = "gm-lang";
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function resolveInitial() {
    var saved = read();
    if (saved === "en" || saved === "zh-Hant") return saved;
    var nav = (navigator.language || "").toLowerCase();
    if (nav.indexOf("zh") === 0) return "zh-Hant";
    if (nav.indexOf("en") === 0) return "en";
    return "zh-Hant"; // Traditional Chinese is the controlling default
  }

  function apply(lang, persist) {
    if (lang !== "en") lang = "zh-Hant";
    root.setAttribute("lang", lang);

    var title = lang === "en" ? root.getAttribute("data-title-en") : root.getAttribute("data-title-zh");
    if (title) document.title = title;

    var desc = lang === "en" ? root.getAttribute("data-desc-en") : root.getAttribute("data-desc-zh");
    if (desc) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", desc);
    }

    var phNodes = document.querySelectorAll("[data-ph-zh],[data-ph-en]");
    for (var p = 0; p < phNodes.length; p++) {
      var ph = lang === "en" ? phNodes[p].getAttribute("data-ph-en") : phNodes[p].getAttribute("data-ph-zh");
      if (ph != null) phNodes[p].setAttribute("placeholder", ph);
    }

    var key = lang === "en" ? "en" : "zh";
    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-lang-btn") === key ? "true" : "false");
    }
    if (persist) write(lang);
  }

  apply(resolveInitial(), false);

  document.addEventListener("click", function (e) {
    var t = e.target;
    var btn = t && t.closest ? t.closest("[data-lang-btn]") : null;
    if (!btn) return;
    e.preventDefault();
    apply(btn.getAttribute("data-lang-btn") === "en" ? "en" : "zh-Hant", true);
  });
})();
