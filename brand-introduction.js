(() => {
  const progress = document.querySelector(".page-scroll-progress");
  const progressFill = document.getElementById("page-scroll-progress-fill");
  const dialog = document.getElementById("promise-letter");
  const trigger = document.querySelector(".letter-trigger");
  const closeButton = document.querySelector(".letter-close");

  function updateProgress() {
    const range = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const value = range ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0;
    if (progressFill) progressFill.style.width = `${value}%`;
    if (progress) progress.setAttribute("aria-valuenow", String(Math.round(value)));
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  if (!dialog || !trigger || !closeButton) return;

  trigger.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    trigger.focus();
  });
})();
