document.addEventListener("DOMContentLoaded", () => {
  const delay = 400;
  const dur = 3000;

  const countUp = (el) => {
    const to = +el.dataset.to || 0;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.floor(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const els = document.querySelectorAll("[data-countup]");
  const running = new WeakMap();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const el = e.target;

      if (e.isIntersecting) {
        if (running.get(el)) return;
        running.set(el, true);
        setTimeout(() => countUp(el), delay);
      } else {
        running.set(el, false);
        el.textContent = "0";
      }
    });
  }, { threshold: 0.3 });

  els.forEach(el => io.observe(el));
});
