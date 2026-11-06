const assetRoot = "唐尉保作品集2_files";

const pad = (value) => String(value).padStart(2, "0");

const douyinSlides = Array.from({ length: 32 }, (_, index) => {
  const number = index + 4;
  const extension = [12, 13, 14, 33].includes(number) ? "jpg" : "png";
  const separator = extension === "jpg" ? "-" : " ";
  return {
    src: `${assetRoot}/${number}${separator}DY.${extension}`,
    thumb: `assets/slide-thumbs/douyin-${pad(index + 1)}.jpg`,
    alt: `抖音创作服务平台案例第 ${index + 1} 页`
  };
});

const jdSlides = Array.from({ length: 37 }, (_, index) => {
  const number = index + 1;
  const extension = [22, 33].includes(number) ? "jpg" : "png";
  return {
    src: `${assetRoot}/图片${number}.${extension}`,
    thumb: `assets/slide-thumbs/jd-${pad(number)}.jpg`,
    alt: `京东数坊案例第 ${number} 页`
  };
});

const kingsoftPages = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43];
const kingsoftSlides = kingsoftPages.map((number, index) => ({
  src: `${assetRoot}/C端${number}.${number === 39 ? "jpg" : "png"}`,
  thumb: `assets/slide-thumbs/kingsoft-${pad(index + 1)}.jpg`,
  alt: `金山词霸案例第 ${index + 1} 页`
}));

const experiences = {
  douyin: {
    id: "douyin",
    period: "2022 — NOW",
    company: "抖音",
    mark: "d",
    logo: "assets/marks/douyin.webp",
    accent: "#20c7d9",
    markBg: "#11151b",
    role: "平台产品设计专家 & AI 全栈",
    meta: "创作平台设计负责人 · 5人团队",
    caption: "项目主导与管理",
    projectNames: ["抖音创作服务平台", "抖音分成", "抖音精选"],
    projects: [
      {
        id: "douyin-platform",
        name: "抖音创作服务平台",
        type: "PLATFORM · WEB",
        description: "创作者与机构的一站式服务平台",
        cover: "assets/thumbs/douyin.jpg",
        slides: douyinSlides
      },
      { id: "douyin-revenue", name: "抖音分成", type: "CREATOR BUSINESS", description: "项目资料待补充", cover: "assets/slide-thumbs/douyin-12.jpg", disabled: true },
      { id: "douyin-featured", name: "抖音精选", type: "CONTENT PRODUCT", description: "项目资料待补充", cover: "assets/slide-thumbs/douyin-32.jpg", disabled: true }
    ]
  },
  jd: {
    id: "jd",
    period: "2020 — 2022",
    company: "京东零售",
    mark: "JD",
    logo: "assets/marks/jd.webp",
    accent: "#ed2630",
    markBg: "#ed2630",
    role: "资深体验设计师",
    meta: "数坊项目设计负责人 · 3人团队",
    caption: "项目主导与管理",
    projectNames: ["京东数坊平台 · 营销数据", "黄金眼数据平台 · 自营数据"],
    projects: [
      {
        id: "jd-shufang",
        name: "京东数坊平台 · 营销数据",
        type: "DATA PRODUCT · B2B",
        description: "融合营销数据产品与复杂信息体验",
        cover: "assets/thumbs/jd.jpg",
        slides: jdSlides
      },
      { id: "jd-golden-eye", name: "黄金眼数据平台 · 自营数据", type: "DATA PLATFORM", description: "项目资料待补充", cover: "assets/slide-thumbs/jd-37.jpg", disabled: true }
    ]
  },
  kingsoft: {
    id: "kingsoft",
    period: "2016 — 2020",
    company: "金山办公",
    mark: "W",
    logo: "assets/marks/kingsoft.webp",
    accent: "#ff5a52",
    markBg: "linear-gradient(145deg, #ff784e, #f33d5d)",
    role: "高级 UI 设计师",
    meta: "设计执行角色",
    caption: "项目主导",
    projectNames: ["金山词霸", "小米邮箱", "WPS Office"],
    projects: [
      {
        id: "kingsoft-powerword",
        name: "金山词霸",
        type: "MOBILE · CONSUMER",
        description: "学习、效率与增长场景的移动产品体验",
        cover: "assets/thumbs/mobile.jpg",
        slides: kingsoftSlides
      },
      { id: "xiaomi-mail", name: "小米邮箱", type: "MOBILE PRODUCT", description: "项目资料待补充", cover: "assets/slide-thumbs/kingsoft-07.jpg", disabled: true },
      { id: "wps-office", name: "WPS Office", type: "PRODUCTIVITY", description: "项目资料待补充", cover: "assets/slide-thumbs/kingsoft-11.jpg", disabled: true }
    ]
  }
};

const state = {
  screen: "home",
  experienceId: null,
  projectId: null,
  slideIndex: 0,
  viewerOrigin: "home"
};

const elements = {
  screens: [...document.querySelectorAll("[data-screen]")],
  timeline: document.querySelector("[data-timeline]"),
  projectGrid: document.querySelector("[data-project-grid]"),
  projectsMark: document.querySelector("[data-projects-mark]"),
  projectsPeriod: document.querySelector("[data-projects-period]"),
  projectsCompany: document.querySelector("[data-projects-company]"),
  projectsRole: document.querySelector("[data-projects-role]"),
  projectsMeta: document.querySelector("[data-projects-meta]"),
  viewerCompany: document.querySelector("[data-viewer-company]"),
  viewerTitle: document.querySelector("[data-viewer-title]"),
  currentCount: document.querySelector("[data-current-count]"),
  totalCount: document.querySelector("[data-total-count]"),
  artwork: document.querySelector("[data-main-artwork]"),
  loader: document.querySelector("[data-image-loader]"),
  thumbnailRail: document.querySelector("[data-thumbnail-rail]"),
  artworkFrame: document.querySelector("[data-artwork-frame]"),
  streamShell: document.querySelector("[data-stream-shell]"),
  streamProgress: document.querySelector("[data-stream-progress]"),
  viewerBackLabel: document.querySelector("[data-viewer-back-label]")
};

const currentExperience = () => experiences[state.experienceId];

function updateRailMask() {
  const rail = elements.thumbnailRail;
  if (!rail.offsetHeight) return;
  const max = rail.scrollHeight - rail.clientHeight;
  rail.classList.toggle("is-at-top", rail.scrollTop <= 2);
  rail.classList.toggle("is-at-bottom", rail.scrollTop >= max - 2);
}

elements.thumbnailRail.addEventListener("scroll", updateRailMask, { passive: true });

const contactToggle = document.querySelector("[data-contact-toggle]");
const contactCard = document.querySelector("[data-contact-card]");

function contactFocusable() {
  return [...contactCard.querySelectorAll("a, button")].filter((element) => element.offsetParent !== null);
}

function setContactCard(open, restoreFocus = false) {
  if (!contactToggle || !contactCard) return;
  const isOpen = contactCard.classList.contains("is-open");
  if (open === isOpen) return;
  contactCard.classList.toggle("is-open", open);
  contactToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    // the card fades in from visibility:hidden, so focus has to wait for the
    // next task or the browser refuses it
    window.setTimeout(() => contactFocusable()[0]?.focus({ preventScroll: true }), 0);
  } else if (restoreFocus) {
    contactToggle.focus({ preventScroll: true });
  }
}

contactToggle.addEventListener("click", () => {
  setContactCard(!contactCard.classList.contains("is-open"));
});

contactCard.addEventListener("click", (event) => {
  if (event.target.closest("[data-contact-close]")) setContactCard(false, true);
});

contactCard.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const focusable = contactFocusable();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!contactCard.classList.contains("is-open")) return;
  if (contactCard.contains(event.target) || contactToggle.contains(event.target)) return;
  setContactCard(false);
});
const currentProject = () => currentExperience()?.projects.find((project) => project.id === state.projectId);

function renderTimeline() {
  elements.timeline.innerHTML = Object.values(experiences).map((experience) => `
    <section class="experience-group" style="--accent:${experience.accent};--mark-bg:${experience.markBg}">
      <header class="group-meta">
        <span class="group-index">${experience.period}</span>
        <span class="group-mark${experience.logo ? " has-logo" : ""}" aria-hidden="true">${experience.logo ? `<img src="${experience.logo}" alt="" loading="lazy" decoding="async">` : experience.mark}</span>
        <b class="group-company">${experience.company}</b>
        <span class="group-copy">
          <strong>${experience.role}</strong>
          <small>${experience.meta}</small>
        </span>
      </header>
      <div class="group-projects">
        ${experience.projects.map((project, projectIndex) => `
          <button class="stream-project${project.disabled ? " is-pending" : ""}" type="button" data-home-project="${project.id}" data-home-experience="${experience.id}" aria-label="查看 ${project.name}">
            <img src="${project.cover}" alt="" loading="lazy">
            <span class="stream-project-top"><i>${pad(projectIndex + 1)}</i><em>${project.type}</em></span>
            <span class="stream-project-info">
              <b>${project.name}</b>
              <small>${project.disabled ? "项目资料整理中" : `${project.slides.length} PAGES · EXPLORE`}</small>
            </span>
          </button>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function renderProjects() {
  const experience = currentExperience();
  if (!experience) return;

  elements.projectsMark.classList.toggle("has-logo", Boolean(experience.logo));
  elements.projectsMark.innerHTML = experience.logo
    ? `<img src="${experience.logo}" alt="" decoding="async">`
    : experience.mark;
  elements.projectsMark.style.setProperty("--accent", experience.accent);
  elements.projectsMark.style.setProperty("--mark-bg", experience.markBg);
  elements.projectsPeriod.textContent = experience.period;
  elements.projectsCompany.textContent = experience.company;
  elements.projectsRole.textContent = experience.role;
  elements.projectsMeta.textContent = experience.meta;

  elements.projectGrid.innerHTML = experience.projects.map((project, index) => `
    <button class="project-card${project.disabled ? " is-disabled" : ""}" type="button" ${project.disabled ? "disabled" : `data-project="${project.id}"`}>
      <img src="${project.cover}" alt="" loading="lazy">
      <span class="project-card-number">${pad(index + 1)}</span>
      <span class="project-card-content">
        <span>${project.type}</span>
        <h3>${project.name}</h3>
        <p>${project.description}${project.slides ? ` · ${project.slides.length} PAGES` : ""}</p>
      </span>
    </button>
  `).join("");
}

function renderViewer() {
  const experience = currentExperience();
  const project = currentProject();
  if (!experience || !project?.slides) return;

  elements.viewerCompany.textContent = `${experience.company} · ${experience.period}`;
  elements.viewerTitle.textContent = project.name;
  elements.totalCount.textContent = pad(project.slides.length);
  elements.thumbnailRail.innerHTML = project.slides.map((slide, index) => `
    <button class="thumbnail${index === state.slideIndex ? " is-current" : ""}" type="button" data-slide-index="${index}" role="option" aria-selected="${index === state.slideIndex}" tabindex="${index === state.slideIndex ? 0 : -1}" aria-label="查看第 ${index + 1} 页">
      <img src="${slide.thumb}" alt="" loading="lazy">
      <b>${pad(index + 1)}</b>
    </button>
  `).join("");
  showSlide(state.slideIndex, false);
  window.requestAnimationFrame(updateRailMask);
}

function showSlide(index, scrollThumbnail = true) {
  const project = currentProject();
  if (!project?.slides?.length) return;

  const direction = index === state.slideIndex ? 0 : (index > state.slideIndex ? 1 : -1);
  state.slideIndex = (index + project.slides.length) % project.slides.length;
  const slide = project.slides[state.slideIndex];
  elements.currentCount.textContent = pad(state.slideIndex + 1);
  elements.artwork.classList.add("is-loading");
  elements.loader.classList.add("is-active");

  const onLoaded = () => {
    elements.artwork.classList.remove("is-loading");
    elements.loader.classList.remove("is-active");
  };
  elements.artwork.onload = onLoaded;
  elements.artwork.onerror = onLoaded;
  elements.artwork.src = slide.src;
  elements.artwork.alt = slide.alt;
  if (elements.artwork.complete) onLoaded();

  elements.artwork.classList.remove("is-enter-next", "is-enter-prev");
  if (direction) {
    void elements.artwork.offsetWidth;
    elements.artwork.classList.add(direction > 0 ? "is-enter-next" : "is-enter-prev");
  }

  const thumbnails = [...elements.thumbnailRail.querySelectorAll(".thumbnail")];
  thumbnails.forEach((thumbnail, thumbnailIndex) => {
    const isCurrent = thumbnailIndex === state.slideIndex;
    thumbnail.classList.toggle("is-current", isCurrent);
    thumbnail.setAttribute("aria-selected", String(isCurrent));
    thumbnail.tabIndex = isCurrent ? 0 : -1;
  });

  const activeThumbnail = thumbnails[state.slideIndex];
  if (scrollThumbnail && activeThumbnail) activeThumbnail.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  if (document.activeElement?.closest(".thumbnail-rail") && activeThumbnail) activeThumbnail.focus({ preventScroll: true });

  [-1, 1].forEach((offset) => {
    const preloadIndex = (state.slideIndex + offset + project.slides.length) % project.slides.length;
    const preload = new Image();
    preload.src = project.slides[preloadIndex].src;
  });
}

const screenHeadings = {
  home: "#home-title",
  projects: "#projects-title",
  viewer: "#viewer-title"
};
let routeHydrated = false;

function focusScreenHeading(screenName) {
  const heading = document.querySelector(screenHeadings[screenName] || "");
  if (heading) heading.focus({ preventScroll: true });
}

function setActiveScreen(screenName) {
  const changed = state.screen !== screenName;
  if (changed) setContactCard(false);
  state.screen = screenName;
  if (changed && routeHydrated) window.requestAnimationFrame(() => focusScreenHeading(screenName));
  elements.screens.forEach((screen) => {
    const active = screen.dataset.screen === screenName;
    if (active) {
      screen.hidden = false;
      screen.scrollTop = 0;
    }
    screen.classList.toggle("is-active", active);
    if (!active) window.setTimeout(() => { if (!screen.classList.contains("is-active")) screen.hidden = true; }, 430);
  });
}

function pushRoute(hash) {
  if (location.hash === hash) return;
  history.pushState(null, "", hash);
}

function updateViewerBackLabel() {
  if (!elements.viewerBackLabel) return;
  elements.viewerBackLabel.textContent = state.viewerOrigin === "projects" ? "返回项目" : "返回首页";
}

function goHome(updateHash = true) {
  state.experienceId = null;
  state.projectId = null;
  state.slideIndex = 0;
  state.viewerOrigin = "home";
  setActiveScreen("home");
  scheduleStreamMeasure(520);
  if (updateHash) pushRoute("#home");
}

function leaveViewer() {
  if (state.viewerOrigin === "projects" && state.experienceId && state.screen === "viewer") {
    history.back();
    return;
  }
  goHome(false);
  history.replaceState(null, "", "#home");
}

function openExperience(experienceId, updateHash = true) {
  if (!experiences[experienceId]) return;
  state.experienceId = experienceId;
  state.projectId = null;
  state.slideIndex = 0;
  renderProjects();
  setActiveScreen("projects");
  if (updateHash) pushRoute(`#experience/${experienceId}`);
}

function openProject(projectId, updateHash = true) {
  const project = currentExperience()?.projects.find((item) => item.id === projectId);
  if (!project || project.disabled) return;
  state.viewerOrigin = state.screen === "projects" ? "projects" : "home";
  state.projectId = projectId;
  state.slideIndex = 0;
  renderViewer();
  updateViewerBackLabel();
  setActiveScreen("viewer");
  if (updateHash) pushRoute(`#project/${state.experienceId}/${projectId}`);
}

function openHomeProject(experienceId, projectId) {
  const experience = experiences[experienceId];
  const project = experience?.projects.find((item) => item.id === projectId);
  if (!experience || !project) return;
  if (project.disabled) {
    openExperience(experienceId);
    return;
  }
  state.experienceId = experienceId;
  openProject(projectId);
}

function handleRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts[0] === "project" && parts[1] && parts[2]) {
    const experience = experiences[parts[1]];
    const project = experience?.projects.find((item) => item.id === parts[2]);
    if (!experience || !project || project.disabled) {
      if (experience) {
        openExperience(parts[1], false);
        history.replaceState(null, "", `#experience/${parts[1]}`);
      } else {
        goHome(false);
        history.replaceState(null, "", "#home");
      }
      return;
    }
    state.experienceId = parts[1];
    openProject(parts[2], false);
  } else if (parts[0] === "experience" && parts[1] && experiences[parts[1]]) {
    openExperience(parts[1], false);
  } else {
    goHome(false);
    if (location.hash && location.hash !== "#home") history.replaceState(null, "", "#home");
  }
}

document.addEventListener("click", (event) => {
  const homeTrigger = event.target.closest('[data-route="home"]');
  const homeProjectTrigger = event.target.closest("[data-home-project]");
  const projectTrigger = event.target.closest("[data-project]");
  const thumbnailTrigger = event.target.closest("[data-slide-index]");
  const viewerBack = event.target.closest("[data-viewer-back]");

  if (homeTrigger) goHome();
  else if (homeProjectTrigger) openHomeProject(homeProjectTrigger.dataset.homeExperience, homeProjectTrigger.dataset.homeProject);
  else if (projectTrigger) openProject(projectTrigger.dataset.project);
  else if (thumbnailTrigger) showSlide(Number(thumbnailTrigger.dataset.slideIndex));
  else if (viewerBack) leaveViewer();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactCard.classList.contains("is-open")) {
    setContactCard(false, true);
    return;
  }
  if (contactCard.classList.contains("is-open")) return;
  if (state.screen === "home") {
    if (event.key === "ArrowRight" || event.key === "PageDown") nudgeStream(1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") nudgeStream(-1);
    if (event.key === "Home") jumpStream(0);
    if (event.key === "End") jumpStream(1);
  }
  if (state.screen === "viewer") {
    if (event.key === "ArrowDown" || event.key === "PageDown") showSlide(state.slideIndex + 1);
    if (event.key === "ArrowUp" || event.key === "PageUp") showSlide(state.slideIndex - 1);
    if (event.key === "Escape") leaveViewer();
  }
});

let swipeStartY = 0;
elements.artworkFrame.addEventListener("pointerdown", (event) => { swipeStartY = event.clientY; });
elements.artworkFrame.addEventListener("pointerup", (event) => {
  const distance = swipeStartY - event.clientY;
  if (Math.abs(distance) > 60) showSlide(state.slideIndex + (distance > 0 ? 1 : -1));
});

const viewerElement = elements.screens.find((screen) => screen.dataset.screen === "viewer");
let viewerWheelDelta = 0;
let viewerWheelLock = 0;
let viewerWheelTimer = 0;
viewerElement.addEventListener("wheel", (event) => {
  if (state.screen !== "viewer") return;
  if (event.ctrlKey || event.metaKey) return;
  if (event.target.closest(".thumbnail-rail")) return;
  event.preventDefault();
  const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;
  viewerWheelDelta += delta;
  window.clearTimeout(viewerWheelTimer);
  viewerWheelTimer = window.setTimeout(() => { viewerWheelDelta = 0; }, 200);
  const now = performance.now();
  if (now < viewerWheelLock || Math.abs(viewerWheelDelta) < 24) return;
  const direction = Math.sign(viewerWheelDelta);
  viewerWheelDelta = 0;
  viewerWheelLock = now + 230;
  showSlide(state.slideIndex + direction);
}, { passive: false });

window.addEventListener("popstate", handleRoute);
window.addEventListener("hashchange", handleRoute);

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    const shift = ((event.clientX / window.innerWidth) - 0.5) * 14;
    document.documentElement.style.setProperty("--pointer-shift", `${shift}px`);
  });
}

/* ── Horizontal work stream ─────────────────────────────────────────────
   Wheel and drag write to a virtual offset that is damped toward its target
   on every frame (the interaction model used by motion-led portfolios),
   instead of scrolling the element natively. Native scroll has no inertia:
   the page jumps by the exact wheel delta and drag is a rigid 1:1 mapping.
   ─────────────────────────────────────────────────────────────────────── */
const stream = {
  target: 0,
  current: 0,
  max: 0,
  viewport: 1,
  cards: [],
  raf: 0,
  lastFrame: 0,
  dirty: true,
  dragging: false
};

const STREAM_LERP = 0.085;
const STREAM_DRAG_SENSITIVITY = 1.15;
const STREAM_DRAG_THRESHOLD = 5;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const clampStream = (value) => Math.min(Math.max(value, 0), stream.max);

function measureStream() {
  const shell = elements.streamShell;
  if (!shell.offsetWidth) {
    stream.dirty = true;
    return;
  }
  const trackRect = elements.timeline.getBoundingClientRect();
  stream.viewport = shell.clientWidth || window.innerWidth || 1;
  stream.max = Math.max(0, shell.scrollWidth - shell.clientWidth);
  stream.cards = [...elements.timeline.querySelectorAll(".stream-project")].map((element) => {
    const rect = element.getBoundingClientRect();
    return { element, center: rect.left + rect.width / 2 - trackRect.left, width: rect.width };
  });
  stream.dirty = false;
}

function applyStream() {
  elements.timeline.style.transform = `translate3d(${-stream.current.toFixed(2)}px, 0, 0)`;
  const progress = stream.max > 0 ? stream.current / stream.max : 0;
  elements.streamProgress.style.transform = `scaleX(${Math.max(0.08, progress).toFixed(4)})`;
}

function streamFrame(time) {
  if (stream.dirty) measureStream();
  if (!stream.lastFrame) stream.lastFrame = time;
  const delta = Math.min(64, time - stream.lastFrame);
  stream.lastFrame = time;
  const factor = reduceMotionQuery.matches ? 1 : 1 - Math.exp(Math.log(1 - STREAM_LERP) * (delta / (1000 / 60)));
  stream.current += (stream.target - stream.current) * factor;
  if (Math.abs(stream.target - stream.current) < 0.1) stream.current = stream.target;
  applyStream();
  if (stream.current === stream.target && !stream.dragging) {
    stream.raf = 0;
    stream.lastFrame = 0;
    return;
  }
  stream.raf = requestAnimationFrame(streamFrame);
}

function runStream() {
  if (stream.raf) return;
  stream.lastFrame = 0;
  stream.raf = requestAnimationFrame(streamFrame);
}

elements.streamShell.addEventListener("wheel", (event) => {
  if (event.ctrlKey || event.metaKey || state.screen !== "home") return;
  event.preventDefault();
  if (stream.dirty) measureStream();
  const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
  let delta = horizontal ? event.deltaX : event.deltaY;
  if (event.deltaMode === 1) delta *= 16;
  else if (event.deltaMode === 2) delta *= stream.viewport;
  stream.target = clampStream(stream.target + delta);
  runStream();
}, { passive: false });

let streamDrag = null;
let suppressStreamClick = false;

elements.streamShell.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (stream.dirty) measureStream();
  streamDrag = { id: event.pointerId, x: event.clientX, target: stream.target, moved: false };
  stream.dragging = true;
});

window.addEventListener("pointermove", (event) => {
  if (!streamDrag || event.pointerId !== streamDrag.id) return;
  const distance = event.clientX - streamDrag.x;
  if (!streamDrag.moved && Math.abs(distance) > STREAM_DRAG_THRESHOLD) {
    streamDrag.moved = true;
    elements.streamShell.classList.add("is-dragging");
  }
  if (!streamDrag.moved || !stream.max) return;
  stream.target = clampStream(streamDrag.target - distance * STREAM_DRAG_SENSITIVITY);
  runStream();
});

function endStreamDrag(event) {
  if (!streamDrag || (event && event.pointerId !== streamDrag.id)) return;
  if (streamDrag.moved) {
    suppressStreamClick = true;
    window.setTimeout(() => { suppressStreamClick = false; }, 400);
  }
  streamDrag = null;
  stream.dragging = false;
  elements.streamShell.classList.remove("is-dragging");
  runStream();
}

window.addEventListener("pointerup", endStreamDrag);
window.addEventListener("pointercancel", endStreamDrag);

elements.streamShell.addEventListener("click", (event) => {
  if (!suppressStreamClick) return;
  suppressStreamClick = false;
  event.preventDefault();
  event.stopPropagation();
}, true);

elements.streamShell.addEventListener("dragstart", (event) => event.preventDefault());

elements.timeline.addEventListener("focusin", (event) => {
  const card = event.target.closest(".stream-project");
  if (!card) return;
  if (stream.dirty) measureStream();
  const item = stream.cards.find((entry) => entry.element === card);
  if (!item) return;
  const margin = 48;
  const left = item.center - item.width / 2;
  const right = item.center + item.width / 2;
  if (left < stream.current + margin) stream.target = clampStream(left - margin);
  else if (right > stream.current + stream.viewport - margin) stream.target = clampStream(right - stream.viewport + margin);
  else return;
  runStream();
});

function nudgeStream(direction) {
  if (state.screen !== "home") return;
  if (stream.dirty) measureStream();
  stream.target = clampStream(stream.target + direction * stream.viewport * 0.45);
  runStream();
}

function jumpStream(ratio) {
  if (state.screen !== "home") return;
  if (stream.dirty) measureStream();
  stream.target = clampStream(stream.max * ratio);
  runStream();
}

function scheduleStreamMeasure(delay = 0) {
  stream.dirty = true;
  window.clearTimeout(scheduleStreamMeasure.timer);
  scheduleStreamMeasure.timer = window.setTimeout(() => {
    stream.dirty = true;
    runStream();
  }, delay);
}

window.addEventListener("resize", () => { scheduleStreamMeasure(120); updateRailMask(); });

renderTimeline();
runStream();
handleRoute();
routeHydrated = true;
if (document.fonts?.ready) document.fonts.ready.then(() => scheduleStreamMeasure(60));
