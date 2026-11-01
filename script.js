(() => {
  "use strict";

  /* ── Helpers ─────────────────────────────────────────────── */
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Year + Pakistan clock ────────────────────────────────── */
  $("#year").textContent = new Date().getFullYear();
  const clockEl = $("#clock");
  const tickClock = () => {
    clockEl.textContent = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Karachi"
    }).format(new Date());
  };
  tickClock();
  setInterval(tickClock, 30000);

  /* ── Intersection observer – reveal ──────────────────────── */
  const revealEls = $$(".reveal");
  revealEls.forEach((el, i) => {
    if (!el.style.getPropertyValue("--d")) {
      el.style.setProperty("--d", `${(i % 6) * 0.07}s`);
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

  revealEls.forEach(el => io.observe(el));
  $$(".reveal-float").forEach(el => io.observe(el));

  /* ── Skill meter bars ─────────────────────────────────────── */
  const meterIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const row = e.target;
        const val = row.dataset.val || "0";
        const fill = row.querySelector(".fill");
        if (fill) fill.style.width = val + "%";
        meterIo.unobserve(row);
      }
    });
  }, { threshold: 0.5 });
  $$(".meter-row").forEach(el => meterIo.observe(el));

  /* ── Text scramble ────────────────────────────────────────── */
  const chars = "!<>-_\\/[]{}=+*^?#01";
  const scramble = (el) => {
    const final = el.dataset.text || el.textContent;
    let frame = 0;
    const total = 26;
    const run = () => {
      el.textContent = final.split("").map((ch, i) => {
        if (ch === " ") return " ";
        return frame > i * 2 + 5
          ? ch
          : chars[Math.floor(Math.random() * chars.length)];
      }).join("");
      if (frame++ < total + final.length * 2) {
        requestAnimationFrame(run);
      } else {
        el.textContent = final;
      }
    };
    run();
  };

  if (!reduced) {
    setTimeout(() => $$(".scramble").forEach(scramble), 300);
  }
  $$(".scramble").forEach(el =>
    el.addEventListener("mouseenter", () => !reduced && scramble(el))
  );

  /* ── Typed rotator ────────────────────────────────────────── */
  const words = [
    "web applications",
    "Flutter mobile apps",
    "Laravel back-ends",
    "clean, scalable systems",
    "full-stack products",
  ];
  const rotEl = $("#rotator");
  let wi = 0, ci = 0, deleting = false;

  const typeNext = () => {
    const word = words[wi];
    rotEl.textContent = word.slice(0, ci);
    if (!deleting && ci === word.length) {
      deleting = true;
      return setTimeout(typeNext, 1800);
    }
    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    ci += deleting ? -1 : 1;
    setTimeout(typeNext, deleting ? 30 : 62);
  };

  if (!reduced) {
    ci = words[0].length; deleting = true;
    setTimeout(typeNext, 2400);
  } else {
    rotEl.textContent = words[0];
  }

  /* ── Cursor glow ──────────────────────────────────────────── */
  const glowEl = $("#glow");
  let gx = innerWidth / 2, gy = innerHeight / 3;
  let tx = gx, ty = gy;

  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; });

  const followGlow = () => {
    gx += (tx - gx) * 0.07;
    gy += (ty - gy) * 0.07;
    glowEl.style.transform = `translate(${gx - 300}px, ${gy - 300}px)`;
    requestAnimationFrame(followGlow);
  };
  if (!reduced && glowEl) followGlow();

  /* ── Card tilt + spotlight ────────────────────────────────── */
  $$(".tilt").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      if (!reduced) {
        const rx = ((y / r.height) - 0.5) * -7;
        const ry = ((x / r.width) - 0.5) *  7;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "-20%");
    });
  });

  /* ── Progress bar + nav active links ─────────────────────── */
  const nav   = $(".nav");
  const bar   = $("#progress");
  const links = $$("nav a[data-n]");
  const secs  = links.map(a => $("#" + a.dataset.n)).filter(Boolean);

  const onScroll = () => {
    const doc = document.documentElement;
    const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
    bar.style.width = pct + "%";
    nav.classList.toggle("scrolled", doc.scrollTop > 30);

    let current = null;
    secs.forEach(s => {
      if (s.getBoundingClientRect().top < innerHeight * 0.45) current = s.id;
    });
    links.forEach(a => a.classList.toggle("active", a.dataset.n === current));
  };

  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile burger ────────────────────────────────────────── */
  const burger = $("#burger");
  const mMenu  = $("#mobileMenu");

  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    mMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  $$(".mm-link").forEach(a => {
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      mMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ── Smooth scroll for anchor buttons ────────────────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = $(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }
    });
  });

  /* ── Stagger project rows on load ────────────────────────── */
  $$(".project").forEach((p, i) => {
    if (!p.style.getPropertyValue("--d")) p.style.setProperty("--d", `${i * 0.08}s`);
  });
})();
