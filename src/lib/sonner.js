// Exported function: sonner(header, message, buttonText = "OK", onClick?, options?)
// options: { duration?: number, containerId?: string }
export function sonner(
  header,
  message,
  buttonText = "OK",
  onClick,
  options = {}
) {
  const duration = Math.max(800, Number(options.duration || 5000));
  const containerId = options.containerId || "sonner-wrap";

  // Ensure container exists (top center)
  let wrap = document.getElementById(containerId);
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = containerId;
    wrap.className = "sonner-wrap";
    document.body.appendChild(wrap);
  }

  const el = document.createElement("div");
  el.className = "sonner";
  el.setAttribute("role", "alert");
  el.setAttribute("aria-live", "polite");
  el.innerHTML = `
    <div class="sonner__content">
      <div class="sonner__hdr"></div>
      <div class="sonner__msg"></div>
    </div>
    <div class="sonner__actions"></div>
    <div class="sonner__progress"></div>
  `;
  el.querySelector(".sonner__hdr").textContent = String(header ?? "");
  el.querySelector(".sonner__msg").textContent = String(message ?? "");

  // Button
  const btn = document.createElement("button");
  btn.className = "sonner__btn";
  btn.textContent = String(buttonText ?? "OK");

  // Close logic
  let closed = false;
  let timer = null;
  const close = () => {
    if (closed) return;
    closed = true;
    el.classList.remove("show");
    // remove after transition
    setTimeout(() => {
      el.remove();
      if (!wrap.children.length) wrap.remove();
    }, 280);
    if (timer) clearTimeout(timer);
  };

  btn.addEventListener("click", () => {
    try {
      if (typeof onClick === "function") onClick(close);
      else close(); // default: button closes
    } catch {
      close();
    }
  });

  el.querySelector(".sonner__actions").appendChild(btn);

  // Progress bar countdown
  const bar = el.querySelector(".sonner__progress");
  bar.style.setProperty("--sonner-duration", duration + "ms");

  // Insert newest first
  wrap.insertBefore(el, wrap.firstChild || null);

  // Animate in next frame
  requestAnimationFrame(() => {
    el.classList.add("show");
    bar.classList.add("anim");
  });

  // Auto-close
  timer = setTimeout(close, duration);

  // Click outside to dismiss (optional—comment out if undesired)
  // el.addEventListener("click", (e) => {
  //   if (e.target === el) close();
  // });

  return { close, el };
}
