(() => {
  const products = [
    {
      id: "melon-fairy-keycaps",
      title: "멜론 요정 키캡 5종 세트",
      image: "images/goods-page/products/keycaps.jpg",
      thumbnail: "images/goods-page/products/keycaps-thumb.jpg",
      alt: "네 요정 얼굴과 MOLLY 로고가 담긴 멜론 요정 키캡 5종 세트",
      category: "DESK · FAIRY KEYCAPS",
      lead: "✨ 키보드 위에 네 요정들을 하나씩 ✨",
      description: "네 요정과 MOLLY 로고를 담은 키캡 5종 세트예요.",
      storyTitle: "키보드 위 작은 친구들",
      story: "모모·냠이·루루·멜리와 MOLLY 로고를 담은 키캡 세트예요.",
      points: ["요정 4명 + MOLLY 로고", "키캡 5종 구성", "키보드 위 포인트"],
      cardDescription: "요정 얼굴과 로고를 담은 키캡 5종",
      price: "30,000원"
    },
    {
      id: "fairy-pen-sticker-set",
      title: "꾸미기 펜&스티커 세트",
      image: "images/goods-page/products/pen-sticker.jpg",
      thumbnail: "images/goods-page/products/pen-sticker-thumb.jpg",
      alt: "네 멜론 요정 캐릭터 펜과 스티커 세트",
      category: "STATIONERY · FAIRIES",
      lead: "좋아하는 요정들과 함께하는 기록 시간.",
      description: "네 요정을 담은 펜과 스티커로 소지품을 꾸며 보세요.",
      cardDescription: "기록을 꾸미는 펜과 스티커",
      storyTitle: "기록 곁에 함께하는 네 요정",
      story: "네 요정을 담은 펜과 스티커로 노트와 소지품을 꾸며 보세요.",
      points: ["요정 캐릭터 펜", "스티커 포함", "노트·소지품 꾸미기"],
      price: "12,000원"
    },
    {
      id: "nyami-mug",
      title: "냠이 멜론 머그컵",
      image: "images/goods-page/products/nyami-mug.jpg",
      thumbnail: "images/goods-page/products/nyami-mug-thumb.jpg",
      alt: "냠이 캐릭터가 그려진 멜론빛 머그컵",
      category: "CAFE DAILY · MUG",
      lead: "멜론빛 포인트와 냠이를 담은 데일리 머그컵.",
      description: "냠이와 멜론빛 포인트를 담은 데일리 머그컵이에요.",
      cardDescription: "냠이와 함께하는 데일리 머그",
      storyTitle: "매일의 음료 친구, 냠이",
      story: "냠이와 멜론빛 포인트를 담아 음료 시간을 귀엽게 채워요.",
      points: ["냠이 캐릭터 디자인", "멜론빛 포인트", "매일 쓰는 머그컵"],
      price: "15,000원"
    },
    {
      id: "lulu-pouch",
      title: "루루 멜론 파우치",
      image: "images/goods-page/products/lulu-pouch.jpg",
      thumbnail: "images/goods-page/products/lulu-pouch-thumb.jpg",
      alt: "루루 멜론 캐릭터 파우치",
      category: "DAILY · POUCH",
      lead: "작은 소지품을 담아 가볍게 챙겨요.",
      description: "똑똑한 루루를 담은 데일리 파우치예요.",
      cardDescription: "작은 소지품을 담는 루루 파우치",
      storyTitle: "가방 속 루루의 작은 포인트",
      story: "루루를 담은 파우치로 작은 소지품을 가볍게 챙겨 보세요.",
      points: ["루루 캐릭터 디자인", "작은 소지품 수납", "가방 속 데일리 파우치"],
      price: "15,000원"
    },
    {
      id: "molly-hoodie",
      title: "MOLLY 데일리 후드 집업",
      image: "images/goods-page/products/molly-zip-up.jpg",
      thumbnail: "images/goods-page/products/molly-zip-up-thumb.jpg",
      alt: "MOLLY 로고가 들어간 데일리 후드 집업",
      category: "APPAREL · ZIP-UP",
      lead: "MOLLY 로고를 담은 포근한 데일리 집업.",
      description: "부드러운 기모 안감과 MOLLY 로고를 더한 후드 집업이에요.",
      cardDescription: "기모 안감의 MOLLY 데일리 집업",
      storyTitle: "따뜻한 일상으로",
      story: "기모 안감과 MOLLY 로고를 더해 쌀쌀한 날 포근하게 입어요.",
      points: ["MOLLY 로고 디자인", "부드러운 기모 안감", "쌀쌀한 날 포근하게"],
      price: "49,000원"
    },
    {
      id: "meli-acrylic-stand",
      title: "멜리 아크릴 스탠드",
      image: "images/goods-page/products/meli-acrylic-stand.jpg",
      thumbnail: "images/goods-page/products/meli-acrylic-stand-thumb.jpg",
      alt: "멜리 캐릭터 아크릴 스탠드",
      category: "DESK · CHARACTER",
      lead: "책상 위에 작은 멜론 요정을 놓아 보세요.",
      description: "멜리 아크릴 스탠드로 공간에 포인트를 더해요.",
      cardDescription: "책상 위 멜리 아크릴 스탠드",
      storyTitle: "책상 위 작은 요정",
      story: "멜리 아크릴 스탠드로 책상이나 선반을 꾸며 보세요.",
      points: ["멜리 캐릭터 디자인", "세워 두는 아크릴", "책상·선반 포인트"],
      price: "12,000원"
    },
    {
      id: "momo-plush",
      title: "모모 봉제 인형",
      image: "images/goods-page/products/momo-plush.jpg",
      thumbnail: "images/goods-page/products/momo-plush-thumb.jpg",
      alt: "모모 멜론 요정 봉제 인형",
      category: "CHARACTER · DOLL",
      lead: "포근하게 안아 주고 싶은 멜론 요정.",
      description: "모모의 모습을 담은 포근한 봉제 인형이에요.",
      cardDescription: "포근한 모모 봉제 인형",
      storyTitle: "이제 잠들 때까지 함께하는 모모",
      story: "모모 봉제 인형을 곁에 두고 포근한 시간을 보내 보세요.",
      points: ["모모 캐릭터 디자인", "포근한 인형 소재", "공간에 두는 친구"],
      price: "29,000원"
    },
    {
      id: "momo-phone-strap",
      title: "모모 멜론 폰 스트랩",
      image: "images/goods-page/products/momo-phone-strap.jpg",
      thumbnail: "images/goods-page/products/momo-phone-strap-thumb.jpg",
      alt: "연두색과 크림색 비즈, 모모 캐릭터 장식이 달린 폰 스트랩",
      category: "PHONE ACCESSORY · MOMO",
      lead: "연두빛 비즈와 모모를 담은 폰 스트랩.",
      description: "손목에 가볍게 걸어 쓰는 모모 멜론 폰 스트랩이에요.",
      cardDescription: "모모 장식의 비즈 폰 스트랩",
      storyTitle: "손끝에 매달린 모모",
      story: "모모 장식과 연두빛 비즈를 더한 스트랩으로 휴대폰을 꾸며 보세요.",
      points: ["모모 캐릭터 장식", "연두빛 비즈", "손목에 거는 폰 스트랩"],
      price: "8,000원"
    },
    {
      id: "lulu-foldable-bag",
      title: "루루 접이식 장바구니",
      image: "images/goods-page/products/lulu-shopping-bag.jpg",
      thumbnail: "images/goods-page/products/lulu-shopping-bag-thumb.jpg",
      alt: "루루 캐릭터가 담긴 연두색 장바구니와 전용 파우치",
      category: "DAILY · FOLDABLE BAG",
      lead: "장 볼 때 꺼내 쓰고 파우치에 쏙 보관해요.",
      description: "루루 캐릭터를 담은 장바구니와 전용 파우치 구성입니다.",
      cardDescription: "루루 장바구니와 전용 파우치",
      storyTitle: "어디를 가든 함께하는 루루",
      story: "루루 장바구니와 파우치로 장 볼 때도 가볍게 함께해요.",
      points: ["루루 캐릭터 디자인", "장바구니·파우치 구성", "사용 후 파우치 보관"],
      price: "9,000원"
    },
    {
      id: "melon-forest-mousepad",
      title: "멜론 숲 피크닉 장패드",
      image: "images/goods-page/products/melon-forest-mousepad.jpg",
      thumbnail: "images/goods-page/products/melon-forest-mousepad-thumb.jpg",
      alt: "네 멜론 요정이 멜론 숲에서 함께 뛰노는 장패드",
      category: "DESK · EXTENDED MOUSEPAD",
      lead: "네 멜론 요정과 함께하는 멜론 숲의 하루.",
      description: "네 요정이 멜론 숲에서 함께 노는 장면을 담은 장패드예요.",
      cardDescription: "네 요정과 멜론 숲을 담은 장패드",
      storyTitle: "책상 위에 펼친 멜론 숲",
      story: "모모·냠이·루루·멜리와 멜론 숲 풍경을 책상 위에 펼쳐 보세요.",
      points: ["네 요정 단체 디자인", "멜론 숲 풍경", "넓게 펼쳐 쓰는 장패드"],
      price: "22,000원"
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("item");
  const currentIndex = Math.max(0, products.findIndex((product) => product.id === requestedId));
  const product = products[currentIndex];
  const byId = (selector) => document.querySelector(selector);
  const setText = (selector, value) => {
    const element = byId(selector);
    if (element) element.textContent = value;
  };

  document.title = `${product.title} | MOLLY GOODS`;
  setText("[data-product-number]", String(currentIndex + 1).padStart(2, "0"));
  setText("[data-product-category]", product.category);
  setText("[data-product-kicker]", product.category);
  setText("[data-product-title]", product.title);
  setText("[data-product-lead]", product.lead);
  const productLead = byId("[data-product-lead]");
  productLead?.classList.toggle("goods-product-lead--decorated", product.id !== "melon-fairy-keycaps");
  setText("[data-product-description]", product.description);
  setText("[data-product-note]", "작은 일상에 귀여움을 더하는 MOLLY 굿즈");
  setText("[data-product-story-title]", product.storyTitle);
  const storyTitle = byId("[data-product-story-title]");
  if (storyTitle) {
    storyTitle.classList.toggle("goods-story-title--keycaps", product.id === "melon-fairy-keycaps");
    storyTitle.classList.toggle("goods-story-title--pouch", product.id === "lulu-pouch");
  }
  const storyLayout = byId(".goods-story-layout");
  if (storyLayout) {
    storyLayout.classList.toggle("goods-story-layout--keycaps", product.id === "melon-fairy-keycaps");
    storyLayout.classList.toggle("goods-story-layout--pens", product.id === "fairy-pen-sticker-set");
    storyLayout.classList.toggle("goods-story-layout--mug", product.id === "nyami-mug");
  }
  setText("[data-product-story]", product.story);
  const image = byId("[data-product-image]");
  if (image) {
    image.alt = product.alt;
    const visual = image.closest(".goods-product-visual");
    visual?.classList.toggle("goods-product-visual--keycaps", product.id === "melon-fairy-keycaps");
    image.style.objectFit = "contain";

    const matchVisualToImage = () => {
      if (visual && image.naturalWidth && image.naturalHeight) {
        visual.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
      }
    };
    image.addEventListener("load", matchVisualToImage, { once: true });
    image.src = product.image;
    if (image.complete) matchVisualToImage();
  }

  const priceRow = byId("[data-product-price-row]");
  if (priceRow && product.price) {
    setText("[data-product-price]", product.price);
    priceRow.hidden = false;
  }

  const points = byId("[data-product-points]");
  if (points) {
    points.replaceChildren(...product.points.map((point, index) => {
      const item = document.createElement("li");
      item.innerHTML = `<span>0${index + 1}</span><strong>${point}</strong>`;
      return item;
    }));
  }

  setText("[data-product-step]", `${String(currentIndex + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`);
  const previous = products[(currentIndex - 1 + products.length) % products.length];
  const next = products[(currentIndex + 1) % products.length];
  const previousLink = byId("[data-product-prev]");
  const nextLink = byId("[data-product-next]");
  if (previousLink) previousLink.href = `./goods-detail.html?item=${previous.id}`;
  if (nextLink) nextLink.href = `./goods-detail.html?item=${next.id}`;

  const buyButton = byId("[data-buy-button]");
  const purchaseFeedback = byId("[data-purchase-feedback]");
  if (buyButton && purchaseFeedback) {
    buyButton.addEventListener("click", () => {
      purchaseFeedback.hidden = false;
      buyButton.setAttribute("aria-expanded", "true");
    });
  }

  const relatedContainer = byId("[data-related-products]");
  if (relatedContainer) {
    const related = [1, 2, 3].map((offset) => products[(currentIndex + offset) % products.length]);
    relatedContainer.replaceChildren(...related.map((item) => {
      const link = document.createElement("a");
      link.className = "goods-related-card";
      link.href = `./goods-detail.html?item=${item.id}`;
      link.innerHTML = `<img src="${item.thumbnail}" alt="${item.alt}"><span class="goods-related-card-copy"><span>${item.category}</span><h3>${item.title}</h3><p>${item.cardDescription}</p></span>`;
      return link;
    }));
  }

  const progress = document.querySelector(".page-scroll-progress");
  const fill = document.getElementById("page-scroll-progress-fill");
  let frame = null;
  const updateProgress = () => {
    frame = null;
    const range = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const value = range ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0;
    if (fill) fill.style.width = `${value}%`;
    if (progress) progress.setAttribute("aria-valuenow", String(Math.round(value)));
  };
  const scheduleProgress = () => {
    if (frame === null) frame = window.requestAnimationFrame(updateProgress);
  };
  window.addEventListener("scroll", scheduleProgress, { passive: true });
  window.addEventListener("resize", scheduleProgress);
  scheduleProgress();
})();
