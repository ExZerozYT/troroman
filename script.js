document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".topbar");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = [...document.querySelectorAll(".nav a")];
  const statusPanel = document.querySelector("[data-business-status]");
  const statusText = document.querySelector("[data-status-text]");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;
    document.body.classList.toggle("menu-open", isOpen);
    header?.classList.toggle("menu-ready", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
      document.body.classList.remove("menu-open");
      header?.classList.remove("menu-ready");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  if (statusPanel && statusText) {
    const now = new Date();
    const minutesNow = now.getHours() * 60 + now.getMinutes();
    const open = 8 * 60;
    const close = 17 * 60;
    const isOpen = minutesNow >= open && minutesNow < close;

    statusPanel.dataset.open = String(isOpen);
    statusText.textContent = isOpen ? "เปิดให้บริการตอนนี้" : "ปิดทำการอยู่ตอนนี้";
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.14, 0.32, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const heroPhotos = [...document.querySelectorAll(".hero-photo")];

  if (heroPhotos.length > 1) {
    let activeIndex = heroPhotos.findIndex((photo) => photo.classList.contains("is-active"));
    if (activeIndex === -1) activeIndex = 0;

    setInterval(() => {
      const nextIndex = (activeIndex + 1) % heroPhotos.length;
      heroPhotos[activeIndex].classList.remove("is-active");
      heroPhotos[nextIndex].classList.add("is-active");
      activeIndex = nextIndex;
    }, 4000);
  }
});
