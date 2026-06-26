const translations = {
  zh: {
    brand: "楊喆鈞",
    navAbout: "關於",
    navStories: "事蹟",
    navContact: "聯絡",
    heroKicker: "個人電子名片 / 創作型工程師",
    heroName: "楊喆鈞",
    heroRole: "互動前端開發者、攝影愛好者、城市資料觀察者",
    heroIntro: "我把冰冷資料、品牌敘事與細膩動畫揉成讓人願意停留的數位體驗。",
    ctaContact: "開始聯絡",
    ctaCopy: "複製名片",
    statProjects: "個實驗專案",
    statAwards: "項創作獎項",
    statTalks: "場社群分享",
    statCities: "座城市田野",
    aboutKicker: "About",
    aboutTitle: "關於我",
    aboutCardTitle: "用設計感寫程式，用工程感做故事。",
    aboutBody: "楊喆鈞是一位虛構的台北創作者，專注於互動網站、資料視覺化與數位展演。他喜歡把日常觀察變成介面，例如捷運人流、夜市聲音、咖啡店光線，最後變成可以滑動、點擊、探索的作品。",
    interestLabel: "興趣",
    toolLabel: "工具箱",
    showcaseKicker: "Featured Works",
    showcaseTitle: "近期虛構作品",
    workOneTitle: "夜行資料儀表板",
    workOneBody: "用動態光軌呈現台北深夜交通資料，讓數字像城市霓虹一樣呼吸。",
    workTwoTitle: "聲音採集地圖",
    workTwoBody: "把市場叫賣、車站廣播與雨聲轉成互動聲譜，做成可探索的聲音名片。",
    workThreeTitle: "AI 影像實驗室",
    workThreeBody: "設計一套能即時預覽風格變化的創作工具，協助品牌快速測試視覺方向。",
    timelineKicker: "Milestones",
    timelineTitle: "關於我 - 事蹟",
    mOneTitle: "入選亞洲互動設計展",
    mOneBody: "以「城市脈搏」互動裝置入選，使用 Canvas 將即時資料轉化成沉浸式視覺。",
    mTwoTitle: "完成 100 天動畫挑戰",
    mTwoBody: "連續創作微互動、轉場、資料圖表與動態排版，累積成開源範例庫。",
    mThreeTitle: "發表前端工作坊",
    mThreeBody: "在社群活動分享「用原生 JavaScript 做出有質感的作品集」。",
    contactKicker: "Contact",
    contactTitle: "讓我們把下一個想法做成真的。",
    contactBody: "歡迎合作網站、互動裝置、品牌視覺、資料敘事與課程邀約。以下資料皆為範例。",
    copied: "名片資訊已複製",
    themeLight: "已切換淺色主題",
    themeDark: "已切換深色主題"
  },
  en: {
    brand: "Yang Zhejun",
    navAbout: "About",
    navStories: "Stories",
    navContact: "Contact",
    heroKicker: "Personal Digital Card / Creative Engineer",
    heroName: "Yang Zhejun",
    heroRole: "Interactive front-end developer, photographer, urban data observer",
    heroIntro: "I turn cold data, brand narratives, and refined motion into digital experiences worth staying for.",
    ctaContact: "Get in touch",
    ctaCopy: "Copy card",
    statProjects: "lab projects",
    statAwards: "creative awards",
    statTalks: "community talks",
    statCities: "city studies",
    aboutKicker: "About",
    aboutTitle: "About Me",
    aboutCardTitle: "I code with design instinct and tell stories with engineering discipline.",
    aboutBody: "Yang Zhejun is a fictional Taipei-based maker focused on interactive websites, data visualization, and digital installations. He turns everyday observations, such as metro flow, market sounds, and cafe light, into interfaces people can scroll, click, and explore.",
    interestLabel: "Interests",
    toolLabel: "Toolkit",
    showcaseKicker: "Featured Works",
    showcaseTitle: "Recent Fictional Work",
    workOneTitle: "Nocturnal Data Dashboard",
    workOneBody: "A living traffic dashboard where Taipei midnight data breathes like neon light trails.",
    workTwoTitle: "Sonic Field Map",
    workTwoBody: "A browsable sound signature made from market calls, station announcements, and rain recordings.",
    workThreeTitle: "AI Image Lab",
    workThreeBody: "A creative tool for previewing visual style shifts in real time and testing brand directions quickly.",
    timelineKicker: "Milestones",
    timelineTitle: "Milestones",
    mOneTitle: "Selected for Asia Interactive Design Expo",
    mOneBody: "The City Pulse installation translated live data into immersive Canvas-driven visuals.",
    mTwoTitle: "Completed a 100-Day Motion Challenge",
    mTwoBody: "A daily series of microinteractions, transitions, charts, and kinetic typography became an open example library.",
    mThreeTitle: "Hosted a Front-End Workshop",
    mThreeBody: "Shared how to build a polished portfolio with native JavaScript at a community event.",
    contactKicker: "Contact",
    contactTitle: "Let us make the next idea real.",
    contactBody: "Open to websites, installations, brand systems, data storytelling, and workshop invitations. All details here are sample data.",
    copied: "Card details copied",
    themeLight: "Light theme enabled",
    themeDark: "Dark theme enabled"
  }
};

const html = document.documentElement;
const canvas = document.querySelector("#orbitalCanvas");
const ctx = canvas.getContext("2d");
const langToggle = document.querySelector("#langToggle");
const themeToggle = document.querySelector("#themeToggle");
const copyProfile = document.querySelector("#copyProfile");
const toast = document.querySelector("#toast");
const heroVisual = document.querySelector("#heroVisual");

let currentLang = localStorage.getItem("profile-lang") || "zh";
let currentTheme = localStorage.getItem("profile-theme") || "dark";
let width = 0;
let height = 0;
let stars = [];
let rafId = 0;

function applyLanguage(lang) {
  currentLang = lang;
  html.lang = lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = translations[lang][key];
  });
  langToggle.textContent = lang === "zh" ? "EN" : "中";
  localStorage.setItem("profile-lang", lang);
  animateTextSwap();
}

function applyTheme(theme, announce = false) {
  currentTheme = theme;
  html.dataset.theme = theme;
  localStorage.setItem("profile-theme", theme);
  if (announce) {
    showToast(translations[currentLang][theme === "light" ? "themeLight" : "themeDark"]);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function copyCard() {
  const text = currentLang === "zh"
    ? "楊喆鈞 | 互動前端開發者\nyang.zhejun@example.com\n+886 912 345 678\nTaipei, Taiwan"
    : "Yang Zhejun | Interactive Front-End Developer\nyang.zhejun@example.com\n+886 912 345 678\nTaipei, Taiwan";

  if (!navigator.clipboard) {
    showToast(text);
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => showToast(translations[currentLang].copied))
    .catch(() => showToast(text));
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(90, Math.floor((width * height) / 7600));
  stars = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 0.9 + 0.1,
    r: Math.random() * 2.2 + 0.4,
    speed: Math.random() * 0.65 + 0.2,
    phase: index * 0.33
  }));
}

function drawCanvas(time = 0) {
  ctx.clearRect(0, 0, width, height);
  const isLight = currentTheme === "light";

  stars.forEach((star) => {
    star.y += star.speed * star.z;
    star.x += Math.sin(time * 0.001 + star.phase) * 0.22;

    if (star.y > height + 20) {
      star.y = -20;
      star.x = Math.random() * width;
    }

    const alpha = isLight ? 0.13 : 0.36;
    const color = star.phase % 2 > 1 ? "0, 113, 227" : "255, 255, 255";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${alpha})`;
    ctx.fill();
  });

  rafId = requestAnimationFrame(drawCanvas);
}

function animateTextSwap() {
  if (!window.gsap) return;
  gsap.fromTo("[data-i18n]", { y: 10, opacity: 0.45 }, {
    y: 0,
    opacity: 1,
    duration: 0.42,
    stagger: 0.008,
    ease: "power2.out"
  });
}

function initAnimations() {
  if (!window.gsap) {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
    return;
  }

  if (!window.ScrollTrigger) {
    gsap.to(".reveal", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.out"
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-header", {
    y: -28,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  gsap.fromTo(".reveal", {
    y: 54,
    opacity: 0,
    filter: "blur(12px)"
  }, {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 0.95,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "body",
      start: "top 85%"
    }
  });

  document.querySelectorAll(".section").forEach((section) => {
    gsap.fromTo(section, { scale: 0.985 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  gsap.to(".metric-ring", {
    rotate: 360,
    duration: 12,
    repeat: -1,
    ease: "none",
    stagger: 1.2
  });

  gsap.to(".floating-chip", {
    y: -16,
    rotate: 8,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.24
  });

  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    gsap.to(node, {
      textContent: target,
      duration: 1.6,
      ease: "power2.out",
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: node,
        start: "top 88%",
        once: true
      }
    });
  });
}

function initParallax() {
  window.addEventListener("pointermove", (event) => {
    if (!heroVisual || window.innerWidth < 760) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 24;
    const y = (event.clientY / window.innerHeight - 0.5) * 24;
    heroVisual.style.transform = `rotateX(${y * -0.45}deg) rotateY(${x * 0.45}deg) translate3d(${x}px, ${y}px, 0)`;
  });
}

langToggle.addEventListener("click", () => applyLanguage(currentLang === "zh" ? "en" : "zh"));
themeToggle.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark", true));
copyProfile.addEventListener("click", copyCard);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("beforeunload", () => cancelAnimationFrame(rafId));

applyTheme(currentTheme);
applyLanguage(currentLang);
resizeCanvas();
drawCanvas();
initAnimations();
initParallax();
