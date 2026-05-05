document.addEventListener("DOMContentLoaded", () => {
  const delay = 400; // ← 最初の0を見せたい時間(ms)
  const dur = 3000; // ← カウントアップにかかる時間(ms)

  const countUp = (el) => {
    const to = +el.dataset.to || 0;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = Math.floor(to * (1 - Math.pow(1 - p, 3))); // easeOut
      el.textContent = v.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const els = document.querySelectorAll("[data-countup]");
  const running = new WeakMap(); // 要素ごとに「今動いてるか」管理

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const el = e.target;

      if (e.isIntersecting) {
        if (running.get(el)) return; // 画面内で連打しない
        running.set(el, true);
        setTimeout(() => countUp(el), delay);
      } else {
        running.set(el, false);      // 画面外に出たら次回また動かす
        el.textContent = "0";        // 戻したくないなら消す
      }
    });
  }, { threshold: 0.3 });

  els.forEach(el => io.observe(el));
});
