(() => {
  const progress = document.querySelector(".page-scroll-progress");
  const progressFill = document.getElementById("page-scroll-progress-fill");

  function updateProgress() {
    const range = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const value = range ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0;
    if (progressFill) progressFill.style.width = value + "%";
    if (progress) progress.setAttribute("aria-valuenow", String(Math.round(value)));
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const profiles = {
    momo: {
      name: "모모",
      image: "./images/Introducing_Friends/badge2.png",
      intro: "“숲으로 돌아갈 방법, 같이 찾아보자!”",
      role: "숲을 되살릴 방법을 찾으러 지구로 떠나는 맏이",
      moment: "친구들과 카페를 열자는 생각을 가장 먼저 꺼내요"
    },
    nyami: {
      name: "냠이",
      image: "./images/Introducing_Friends/badge4.png",
      intro: "“내가 키운 멜론으로 디저트를 만들어볼래!”",
      role: "직접 키운 멜론으로 새로운 디저트를 만드는 친구",
      moment: "첫 디저트를 친구들과 나누며 카페의 시작을 열어요"
    },
    lulu: {
      name: "루루",
      image: "./images/Introducing_Friends/badge3.png",
      intro: "“잊지 않게 내가 전부 적어둘게!”",
      role: "여행의 기록과 카페의 레시피를 맡은 친구",
      moment: "새로 배운 레시피를 책에 적어 다음 메뉴로 이어가요"
    },
    meli: {
      name: "멜리",
      image: "./images/Introducing_Friends/badge1.png",
      intro: "“우리 카페에 와줘서 고마워요!”",
      role: "손님과 친구들에게 마음을 전하는 막내",
      moment: "첫 손님 앞에서 용기 내어 먼저 인사해요"
    }
  };

  const dialog = document.getElementById("friend-profile-dialog");
  const closeButton = dialog?.querySelector(".profile-dialog-close");
  let lastTrigger = null;

  function closeDialog() {
    if (dialog?.open) dialog.close();
  }

  document.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = profiles[button.dataset.profile];
      if (!profile || !dialog) return;
      lastTrigger = button;
      dialog.querySelector(".profile-dialog-badge").src = profile.image;
      dialog.querySelector(".profile-dialog-badge").alt = profile.name + " 배지";
      dialog.querySelector("#profile-name").textContent = profile.name;
      dialog.querySelector(".profile-dialog-intro").textContent = profile.intro;
      dialog.querySelector("[data-profile-role]").textContent = profile.role;
      dialog.querySelector("[data-profile-moment]").textContent = profile.moment;
      dialog.showModal();
    });
  });

  closeButton?.addEventListener("click", closeDialog);
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog?.addEventListener("close", () => lastTrigger?.focus());
})();
