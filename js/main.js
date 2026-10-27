(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pageProgress = document.querySelector(".page-scroll-progress");
  const pageProgressFill = document.querySelector("#page-scroll-progress-fill");
  const sectionNavLinks = Array.from(document.querySelectorAll(".main-nav a[href^='#']"))
    .map((link) => ({ link, target: document.getElementById(link.hash.slice(1)) }))
    .filter((item) => item.target);
  let pageScrollFrame = null;

  function updatePageScrollUi() {
    pageScrollFrame = null;
    const scrollRange = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = scrollRange > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollRange) * 100)) : 0;
    if (pageProgressFill) pageProgressFill.style.width = `${progress}%`;
    if (pageProgress) pageProgress.setAttribute("aria-valuenow", String(Math.round(progress)));

    const activationLine = (document.querySelector(".site-header")?.getBoundingClientRect().height || 0) + 12;
    let current = sectionNavLinks[0];
    sectionNavLinks.forEach((item) => {
      if (item.target.getBoundingClientRect().top <= activationLine) current = item;
    });
    sectionNavLinks.forEach(({ link }) => {
      if (current && link === current.link) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function schedulePageScrollUi() {
    if (pageScrollFrame === null) pageScrollFrame = window.requestAnimationFrame(updatePageScrollUi);
  }

  window.addEventListener("scroll", schedulePageScrollUi, { passive: true });
  window.addEventListener("resize", schedulePageScrollUi);
  schedulePageScrollUi();
  document.querySelectorAll("[data-banner-slider]").forEach((slider) => {
    const heroWindow = slider.querySelector(".hero-window");
    const heroTrack = slider.querySelector(".hero-track");
    const heroSlides = Array.from(slider.querySelectorAll(".hero-slide"));
    const heroDots = Array.from(slider.querySelectorAll(".hero-dot"));
    const heroPrev = slider.querySelector(".hero-arrow--prev");
    const heroNext = slider.querySelector(".hero-arrow--next");
    const heroAutoplayDelay = 5600;
    let heroIndex = 0;
    let heroTimer = null;

    function showHero(nextIndex) {
      heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;
      heroTrack.style.transform = "translateX(-" + (heroIndex * 100) + "%)";
      heroSlides.forEach((slide, index) => {
        const isCurrent = index === heroIndex;
        slide.setAttribute("aria-hidden", String(!isCurrent));
        slide.inert = !isCurrent;
      });
      heroDots.forEach((dot, index) => {
        const isCurrent = index === heroIndex;
        dot.classList.toggle("is-active", isCurrent);
        if (isCurrent) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function stopHeroTimer() {
      if (heroTimer) {
        window.clearInterval(heroTimer);
        heroTimer = null;
      }
    }

    function startHeroTimer() {
      stopHeroTimer();
      if (heroSlides.length > 1 && !reduceMotion.matches && !document.hidden) {
        heroTimer = window.setTimeout(() => {
          showHero(heroIndex + 1);
          startHeroTimer();
        }, heroAutoplayDelay);
      }
    }

    function navigateHero(nextIndex) {
      showHero(nextIndex);
      startHeroTimer();
    }

    const canSlide = heroSlides.length > 1;
    heroPrev.disabled = !canSlide;
    heroNext.disabled = !canSlide;
    heroPrev.addEventListener("click", () => navigateHero(heroIndex - 1));
    heroNext.addEventListener("click", () => navigateHero(heroIndex + 1));
    heroDots.forEach((dot, index) => dot.addEventListener("click", () => navigateHero(index)));
    heroWindow.addEventListener("focusin", stopHeroTimer);
    heroWindow.addEventListener("focusout", (event) => {
      if (!heroWindow.contains(event.relatedTarget)) startHeroTimer();
    });
    reduceMotion.addEventListener?.("change", startHeroTimer);
    document.addEventListener("visibilitychange", startHeroTimer);
    showHero(0);
    startHeroTimer();
  });

  const goodsCarousel = document.querySelector(".goods-carousel");
  const goodsWindow = document.querySelector("#goods-window");
  const goodsCards = Array.from(document.querySelectorAll(".goods-card"));
  const goodsProgress = document.querySelector("#goods-progress");
  const goodsProgressFill = document.querySelector("#goods-progress-fill");
  const goodsProgressThumb = document.querySelector("#goods-progress-thumb");
  const goodsControls = document.querySelector(".goods-controls");
  const goodsCurrent = document.querySelector("#goods-current");
  const goodsTotal = document.querySelector("#goods-total");
  goodsTotal.textContent = String(goodsCards.length);
  let goodsIndex = 0;
  let goodsScrollFrame = null;

  function setGoodsState(index, progressRatio = null) {
    goodsIndex = Math.max(0, Math.min(goodsCards.length - 1, index));
    const ratio = progressRatio === null
      ? (goodsCards.length > 1 ? goodsIndex / (goodsCards.length - 1) : 0)
      : Math.max(0, Math.min(1, progressRatio));
    const progress = ratio * 100;
    goodsCurrent.textContent = String(goodsIndex + 1);
    goodsProgressFill.style.width = `${progress}%`;
    goodsProgressThumb.style.left = `${progress}%`;
    goodsProgress.setAttribute("aria-valuenow", String(goodsIndex + 1));
    goodsProgress.setAttribute("aria-valuemax", String(goodsCards.length));
    goodsProgress.setAttribute("aria-valuetext", `${goodsIndex + 1} / ${goodsCards.length}: ${goodsCards[goodsIndex].getAttribute("aria-label")}`);
    goodsCards.forEach((card, cardIndex) => {
      card.classList.toggle("is-current", cardIndex === goodsIndex);
    });
  }

  function syncGoodsStateFromScroll() {
    const maxScroll = Math.max(0, goodsWindow.scrollWidth - goodsWindow.clientWidth);
    const progressRatio = maxScroll > 0 ? goodsWindow.scrollLeft / maxScroll : 0;
    const progressIndex = Math.round(progressRatio * Math.max(0, goodsCards.length - 1));
    setGoodsState(progressIndex, progressRatio);
  }

  function moveToGoods(index) {
    const nextIndex = Math.max(0, Math.min(goodsCards.length - 1, index));
    const card = goodsCards[nextIndex];
    const target = card.offsetLeft - (goodsWindow.clientWidth - card.clientWidth) / 2;
    goodsWindow.scrollTo({ left: Math.max(0, target), behavior: reduceMotion.matches ? "auto" : "smooth" });
  }

  function updateGoodsLayout() {
    const hasOverflow = goodsWindow.scrollWidth > goodsWindow.clientWidth + 1;
    goodsCarousel.classList.toggle("is-static", !hasOverflow);
    goodsControls.classList.toggle("is-hidden", !hasOverflow);

    const card = goodsCards[goodsIndex];
    const target = hasOverflow
      ? Math.max(0, card.offsetLeft - (goodsWindow.clientWidth - card.clientWidth) / 2)
      : 0;
    goodsWindow.style.scrollBehavior = "auto";
    goodsWindow.scrollLeft = target;
    goodsWindow.style.scrollBehavior = "";
    syncGoodsStateFromScroll();
  }

  let goodsProgressDragging = false;
  function moveGoodsFromProgress(event) {
    const bounds = goodsProgress.getBoundingClientRect();
    const usableWidth = Math.max(1, bounds.width - 14);
    const progress = Math.max(0, Math.min(1, (event.clientX - bounds.left - 7) / usableWidth));
    const maxScroll = Math.max(0, goodsWindow.scrollWidth - goodsWindow.clientWidth);
    goodsWindow.scrollLeft = progress * maxScroll;
    syncGoodsStateFromScroll();
  }

  goodsProgress.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    goodsProgressDragging = true;
    goodsProgress.classList.add("is-dragging");
    goodsWindow.classList.add("is-progress-dragging");
    goodsProgress.setPointerCapture(event.pointerId);
    moveGoodsFromProgress(event);
    event.preventDefault();
  });
  goodsProgress.addEventListener("pointermove", (event) => {
    if (goodsProgressDragging) moveGoodsFromProgress(event);
  });
  function stopGoodsProgressDrag(event) {
    goodsProgressDragging = false;
    goodsProgress.classList.remove("is-dragging");
    goodsWindow.classList.remove("is-progress-dragging");
    if (goodsProgress.hasPointerCapture(event.pointerId)) goodsProgress.releasePointerCapture(event.pointerId);
  }
  goodsProgress.addEventListener("pointerup", stopGoodsProgressDrag);
  goodsProgress.addEventListener("pointercancel", stopGoodsProgressDrag);
  goodsProgress.addEventListener("keydown", (event) => {
    let nextIndex = goodsIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") nextIndex += 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextIndex -= 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = goodsCards.length - 1;
    else return;
    event.preventDefault();
    moveToGoods(nextIndex);
  });

  goodsWindow.addEventListener("scroll", () => {
    if (goodsScrollFrame) window.cancelAnimationFrame(goodsScrollFrame);
    goodsScrollFrame = window.requestAnimationFrame(syncGoodsStateFromScroll);
  });
  updateGoodsLayout();
  window.addEventListener("resize", updateGoodsLayout, { passive: true });

  document.querySelectorAll("[data-menu-carousel]").forEach((carousel) => {
    const menuWindow = carousel.querySelector("[data-menu-window]");
    const cards = Array.from(carousel.querySelectorAll(".menu-card"));
    const progress = carousel.querySelector(".menu-progress");
    const progressFill = carousel.querySelector(".menu-progress-fill");
    const progressThumb = carousel.querySelector(".menu-progress-thumb");
    const currentLabel = carousel.querySelector("[data-menu-current]");
    const totalLabel = carousel.querySelector("[data-menu-total]");
    let scrollFrame = null;
    let progressDragging = false;

    totalLabel.textContent = String(cards.length);

    function visibleCount() {
      return Math.max(1, Number.parseInt(getComputedStyle(carousel).getPropertyValue("--menu-visible-count"), 10) || 3);
    }

    function scrollStep() {
      if (cards.length < 2) return 1;
      const gap = Number.parseFloat(getComputedStyle(menuWindow.querySelector(".menu-track")).columnGap) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    }

    function maxStartIndex() {
      return Math.max(0, cards.length - visibleCount());
    }

    function syncMenuState() {
      const maxScroll = Math.max(0, menuWindow.scrollWidth - menuWindow.clientWidth);
      const maxIndex = maxStartIndex();
      const ratio = maxScroll > 0 ? menuWindow.scrollLeft / maxScroll : 0;
      const index = Math.max(0, Math.min(maxIndex, Math.round(menuWindow.scrollLeft / scrollStep())));
      const endIndex = Math.min(cards.length, index + visibleCount());
      const displayIndex = index === maxIndex && maxIndex > 0 ? cards.length : index + 1;
      const percent = ratio * 100;

      carousel.classList.toggle("is-static", maxScroll <= 1);
      progress.setAttribute("aria-disabled", String(maxScroll <= 1));
      progress.tabIndex = maxScroll > 1 ? 0 : -1;
      progress.setAttribute("aria-valuemax", String(cards.length));
      progress.setAttribute("aria-valuenow", String(displayIndex));
      progress.setAttribute("aria-valuetext", `${index + 1}–${endIndex} / ${cards.length}`);
      progressFill.style.width = `${percent}%`;
      progressThumb.style.left = `${percent}%`;
      currentLabel.textContent = String(displayIndex);
    }

    function moveToIndex(index) {
      const nextIndex = Math.max(0, Math.min(maxStartIndex(), index));
      menuWindow.scrollTo({ left: nextIndex * scrollStep(), behavior: reduceMotion.matches ? "auto" : "smooth" });
    }

    function moveFromProgress(event) {
      const maxScroll = Math.max(0, menuWindow.scrollWidth - menuWindow.clientWidth);
      if (maxScroll <= 1) return;
      const bounds = progress.getBoundingClientRect();
      const usableWidth = Math.max(1, bounds.width - 14);
      const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left - 7) / usableWidth));
      menuWindow.scrollLeft = ratio * maxScroll;
      syncMenuState();
    }

    progress.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      if (menuWindow.scrollWidth <= menuWindow.clientWidth + 1) return;
      progressDragging = true;
      progress.classList.add("is-dragging");
      menuWindow.classList.add("is-progress-dragging");
      progress.setPointerCapture(event.pointerId);
      moveFromProgress(event);
      event.preventDefault();
    });

    progress.addEventListener("pointermove", (event) => {
      if (progressDragging) moveFromProgress(event);
    });

    function stopProgressDrag(event) {
      progressDragging = false;
      progress.classList.remove("is-dragging");
      menuWindow.classList.remove("is-progress-dragging");
      if (progress.hasPointerCapture(event.pointerId)) progress.releasePointerCapture(event.pointerId);
    }

    progress.addEventListener("pointerup", stopProgressDrag);
    progress.addEventListener("pointercancel", stopProgressDrag);
    progress.addEventListener("keydown", (event) => {
      const currentIndex = Math.max(0, Math.min(maxStartIndex(), Math.round(menuWindow.scrollLeft / scrollStep())));
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowUp") nextIndex += 1;
      else if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextIndex -= 1;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = maxStartIndex();
      else return;
      event.preventDefault();
      moveToIndex(nextIndex);
    });

    menuWindow.addEventListener("scroll", () => {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(syncMenuState);
    }, { passive: true });

    function updateMenuLayout() {
      const currentIndex = Math.max(0, Math.min(maxStartIndex(), Math.round(menuWindow.scrollLeft / scrollStep())));
      menuWindow.scrollLeft = currentIndex * scrollStep();
      syncMenuState();
    }

    updateMenuLayout();
    window.addEventListener("resize", updateMenuLayout, { passive: true });
  });

  const fairyExperience = document.querySelector("[data-fairy-experience]");
  if (fairyExperience) {
    const fairyStage = fairyExperience.querySelector("[data-fairy-stage]");
    const fairyImage = fairyExperience.querySelector("[data-fairy-image]");
    const fairySelectors = Array.from(fairyExperience.querySelectorAll("[data-fairy-select]"));
    const fairyCurrent = fairyExperience.querySelector("[data-fairy-current]");
    const fairyProgressCurrent = fairyExperience.querySelector("[data-fairy-progress-current]");
    const fairyProgressFill = fairyExperience.querySelector("[data-fairy-progress-fill]");
    const fairyScene = fairyExperience.querySelector("[data-fairy-scene]");
    const fairyRole = fairyExperience.querySelector("[data-fairy-role]");
    const fairyNameEn = fairyExperience.querySelector("[data-fairy-name-en]");
    const fairyNameKo = fairyExperience.querySelector("[data-fairy-name-ko]");
    const fairyDescription = fairyExperience.querySelector("[data-fairy-description]");
    const fairySignature = fairyExperience.querySelector("[data-fairy-signature]");
    const fairyData = [
      {
        key: "momo",
        name: "모모",
        nameEn: "MOMO",
        title: "장난꾸러기 멜론 요정",
        role: "첫째 · 장난꾸러기",
        scene: "호기심 많은 멜론 숲의 맏이",
        image: "main/Fairy_Momo_Waving_Scene.png",
        alt: "멜론 숲 벤치에서 손을 흔드는 장난꾸러기 모모",
        descriptionIntro: "멜론 숲의 장난꾸러기 맏이, 모모. 네 요정 중 첫째로,",
        descriptionLead: "밝고 활발한 에너지가 가득해요.",
        description: [
          "호기심이 많아 새로운 것에 관심이 많고, 재미있는 일이 생기면 누구보다 먼저 나선답니다. 장난을 좋아하지만 동생들을 잘 챙기는 든든한 맏이이기도 해요."
        ],
        signature: "A little sweetness, a lot of smiles."
      },
      {
        key: "nyami",
        name: "냠이",
        nameEn: "NYAMI",
        title: "먹보 멜론 요정",
        role: "둘째 · 먹보",
        scene: "좋아하는 멜론과 함께하는 피크닉",
        image: "main/Fairy_Nyami_Picnic.png",
        alt: "멜론 피크닉에서 한 입 베어 문 냠이",
        descriptionIntro: "멜론 숲의 작은 먹보, 냠이. 네 요정 중 둘째로,",
        descriptionLead: "달콤한 멜론 간식을 누구보다 좋아해요.",
        description: [
          "맛있는 냄새가 나면 가장 먼저 달려가 한입 맛보고, 좋아하는 간식은 친구들과 나눠 먹어요. 함께 먹는 즐거움을 아는 다정한 둘째랍니다."
        ],
        signature: "A little bite, a lot of joy."
      },
      {
        key: "lulu",
        name: "루루",
        nameEn: "LULU",
        title: "책 속 여행자 루루",
        role: "셋째 · 수줍은 척척박사",
        scene: "좋아하는 책에 푹 빠진 조용한 오후",
        image: "main/Fairy_Lulu_Reading.png",
        alt: "멜론 숲 벤치에서 책을 읽는 루루",
        descriptionLead: "좋아하는 책과 함께 잠시 쉬어가는 루루.",
        description: [
          "책장을 넘기면 멜론 숲의 이야기가 펼쳐져요.",
          "조용한 오후를 좋아하는 루루는 상상력이 풍부해 책 속에서 누구보다 멀리 여행해요."
        ],
        signature: "A quiet moment in the melon grove."
      },
      {
        key: "meli",
        name: "멜리",
        nameEn: "MELI",
        title: "작은 벌에게 쫓기는 멜리",
        role: "막내 · 울보",
        scene: "꽃향기를 따라온 작은 벌과 마주친 순간",
        image: "main/Fairy_Meli_Bee_Chase.png",
        alt: "작은 벌에게 놀라 눈물을 흘리며 달리는 멜리",
        descriptionLead: "꽃향기를 따라온 작은 벌에 깜짝 놀란 멜리.",
        description: [
          "눈물은 또르르, 발걸음은 바빠도 숲길을 열심히 달려요.",
          "작은 소동도 멜리에게는 큰 모험! 한바탕 달리고 나면 친구들과 금세 다시 웃는답니다."
        ],
        signature: "A tiny chase through the melon grove."
      }
    ];
    let fairyIndex = 0;
    let fairyChangeTimer = null;

    fairyData.slice(1).forEach((fairy) => {
      const preload = new Image();
      preload.src = fairy.image;
    });

    function showFairy(nextIndex) {
      const nextFairyIndex = (nextIndex + fairyData.length) % fairyData.length;
      if (nextFairyIndex === fairyIndex) return;
      fairyIndex = nextFairyIndex;
      const fairy = fairyData[fairyIndex];
      const number = String(fairyIndex + 1).padStart(2, "0");

      fairyStage.classList.add("is-changing");
      fairySelectors.forEach((selector, index) => {
        const isActive = index === fairyIndex;
        selector.classList.toggle("is-active", isActive);
        selector.setAttribute("aria-pressed", String(isActive));
      });
      fairyStage.dataset.character = fairy.key;

      if (fairyChangeTimer) window.clearTimeout(fairyChangeTimer);
      fairyChangeTimer = window.setTimeout(() => {
        fairyImage.src = fairy.image;
        fairyImage.alt = fairy.alt;
        fairyScene.textContent = fairy.scene;
        fairyCurrent.textContent = number;
        fairyProgressCurrent.textContent = number;
        fairyProgressFill.style.width = `${((fairyIndex + 1) / fairyData.length) * 100}%`;
        fairyRole.textContent = fairy.role;
        fairyNameEn.textContent = fairy.nameEn;
        fairyNameKo.textContent = fairy.title;
        const fairyCopy = [];
        if (fairy.descriptionIntro) {
          const intro = document.createElement("p");
          intro.classList.add("fairy-description-intro");
          intro.textContent = fairy.descriptionIntro;
          fairyCopy.push(intro);
        }
        if (fairy.descriptionLead) {
          const lead = document.createElement("p");
          lead.classList.add("fairy-description-lead");
          lead.textContent = fairy.descriptionLead;
          fairyCopy.push(lead);
        }
        fairyDescription.replaceChildren(...fairyCopy, ...fairy.description.map((copy) => {
          const paragraph = document.createElement("p");
          paragraph.textContent = copy;
          return paragraph;
        }));
        fairySignature.textContent = fairy.signature;
        window.requestAnimationFrame(() => fairyStage.classList.remove("is-changing"));
      }, reduceMotion.matches ? 0 : 180);
    }

    fairyExperience.querySelector("[data-fairy-prev]").addEventListener("click", () => showFairy(fairyIndex - 1));
    fairyExperience.querySelector("[data-fairy-next]").addEventListener("click", () => showFairy(fairyIndex + 1));
    fairySelectors.forEach((selector) => {
      selector.addEventListener("click", () => showFairy(Number(selector.dataset.fairySelect)));
    });
    fairyExperience.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showFairy(fairyIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showFairy(fairyIndex + 1);
      }
    });

    const fairyArt = fairyExperience.querySelector(".fairy-stage-art");
    let swipeStart = null;
    fairyArt.addEventListener("pointerdown", (event) => {
      swipeStart = { x: event.clientX, y: event.clientY };
    }, { passive: true });
    fairyArt.addEventListener("pointerup", (event) => {
      if (!swipeStart) return;
      const deltaX = event.clientX - swipeStart.x;
      const deltaY = event.clientY - swipeStart.y;
      if (Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
        showFairy(fairyIndex + (deltaX < 0 ? 1 : -1));
      }
      swipeStart = null;
    }, { passive: true });
    fairyArt.addEventListener("pointercancel", () => { swipeStart = null; }, { passive: true });
    fairyProgressFill.style.width = `${100 / fairyData.length}%`;
  }
})();
