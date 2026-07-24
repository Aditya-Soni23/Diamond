/**
 * Diamond Products Section — data layer + rendering
 * --------------------------------------------------
 * Reads every child under /projects in Firebase Realtime Database,
 * sorts newest-first, and renders animated cards. Works with any number
 * of projects and re-renders automatically whenever the data changes
 * (via onValue), so newly added projects show up with no code changes.
 *
 * Load this as a module:
 *   <script type="module" src="products.js"></script>
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* ------------------------------------------------------------------ */
/* 1. Firebase configuration — PASTE YOUR CONFIG HERE                  */
/* ------------------------------------------------------------------ */
const diamondproductsFirebaseConfig = {
  apiKey: "AIzaSyBvS4HJ07d7Umyb89dCsn2bLALvcqnpoSs",
  authDomain: "diamond-c21dc.firebaseapp.com",
  databaseURL: "https://diamond-c21dc-default-rtdb.firebaseio.com",
  projectId: "diamond-c21dc",
  storageBucket: "diamond-c21dc.firebasestorage.app",
  messagingSenderId: "1035207428852",
  appId: "1:1035207428852:web:ce2faa86d058b75a56eca1"
};

const diamondproductsApp = initializeApp(diamondproductsFirebaseConfig);
const diamondproductsDb = getDatabase(diamondproductsApp);
const diamondproductsProjectsRef = ref(diamondproductsDb, "projects");

/* ------------------------------------------------------------------ */
/* 2. Config / constants                                               */
/* ------------------------------------------------------------------ */

// A project counts as "NEW" if it was uploaded within this many ms.
const DIAMONDPRODUCTS_NEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/* ------------------------------------------------------------------ */
/* 3. DOM references                                                   */
/* ------------------------------------------------------------------ */

const diamondproductsLoadingEl = document.getElementById("diamondproducts-loading");
const diamondproductsErrorEl = document.getElementById("diamondproducts-error");
const diamondproductsErrorDetailEl = document.getElementById("diamondproducts-error-detail");
const diamondproductsEmptyEl = document.getElementById("diamondproducts-empty");
const diamondproductsNoResultsEl = document.getElementById("diamondproducts-no-results");
const diamondproductsGridEl = document.getElementById("diamondproducts-grid");
const diamondproductsRetryBtn = document.getElementById("diamondproducts-retry-btn");
const diamondproductsSearchInput = document.getElementById("diamondproducts-search-input");
const diamondproductsSearchClearBtn = document.getElementById("diamondproducts-search-clear");
let diamondproductsProjects = {};

/* ------------------------------------------------------------------ */
/* 4. IntersectionObserver — reveal cards as they enter the viewport   */
/* ------------------------------------------------------------------ */

const diamondproductsRevealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("diamondproducts-card--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

/* ------------------------------------------------------------------ */
/* 5. UI state helpers                                                 */
/* ------------------------------------------------------------------ */

function diamondproductsShowState(state, errorMessage) {
  diamondproductsLoadingEl.hidden = state !== "loading";
  diamondproductsErrorEl.hidden = state !== "error";
  diamondproductsEmptyEl.hidden = state !== "empty";
  diamondproductsNoResultsEl.hidden = state !== "no-results";
  diamondproductsGridEl.hidden = state !== "ready";

  if (state === "error" && errorMessage) {
    diamondproductsErrorDetailEl.textContent = errorMessage;
  }
}

/* ------------------------------------------------------------------ */
/* 6. Card construction (DOM APIs, not innerHTML, so title/description  */
/*    from the database can never be interpreted as markup)            */
/* ------------------------------------------------------------------ */

function diamondproductsCreateImageBlock(imageLink, title) {
  const media = document.createElement("div");
  media.className = "diamondproducts-media";

  const img = document.createElement("img");
  img.className = "diamondproducts-image";
  img.loading = "lazy";
  img.decoding = "async";
  img.alt = title ? `${title} preview` : "Project preview";

  const fallback = document.createElement("div");
  fallback.className = "diamondproducts-image-fallback";
  fallback.hidden = true;
  fallback.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 17-5-5-4 4-3-3-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  if (imageLink) {
    img.src = imageLink;
    img.addEventListener("error", () => {
      img.hidden = true;
      fallback.hidden = false;
    });
  } else {
    img.hidden = true;
    fallback.hidden = false;
  }

  media.append(img, fallback);
  return media;
}

function diamondproductsCreateBadge() {
  const badge = document.createElement("span");
  badge.className = "diamondproducts-badge";
  badge.textContent = "NEW";
  return badge;
}

function diamondproductsCreateVisitButton(websiteLink) {
  const btn = document.createElement("a");
  btn.className = "diamondproducts-button";
  btn.href = websiteLink || "#";
  btn.target = "_blank";
  btn.rel = "noopener noreferrer";
  btn.setAttribute("aria-label", "Visit website, opens in a new tab");

  const label = document.createElement("span");
  label.textContent = "Visit website";

  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  btn.append(label, icon);

  // Ripple effect on click, purely visual, doesn't block navigation
  btn.addEventListener("click", (event) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 1.6;
    ripple.className = "diamondproducts-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });

  if (!websiteLink) {
    btn.setAttribute("aria-disabled", "true");
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";
  }

  return btn;
}

function diamondproductsCreateCard(project) {
  const { title, description, imageLink, websiteLink, timestamp } = project;

  const card = document.createElement("article");
  card.className = "diamondproducts-card";

  const media = diamondproductsCreateImageBlock(imageLink, title);

  const isNew =
    typeof timestamp === "number" &&
    Date.now() - timestamp < DIAMONDPRODUCTS_NEW_WINDOW_MS;
  if (isNew) {
    media.appendChild(diamondproductsCreateBadge());
  }

  const body = document.createElement("div");
  body.className = "diamondproducts-body";

  const titleEl = document.createElement("h3");
  titleEl.className = "diamondproducts-card-title";
  titleEl.textContent = title || "Untitled project";

  const descEl = document.createElement("p");
  descEl.className = "diamondproducts-card-desc";
  descEl.textContent = description || "No description provided yet.";

  const button = diamondproductsCreateVisitButton(websiteLink);

  body.append(titleEl, descEl, button);
  card.append(media, body);

  return card;
}

/* ------------------------------------------------------------------ */
/* 7. Render                                                            */
/* ------------------------------------------------------------------ */

function diamondproductsRender(projectsObject) {
  const entries = Object.entries(projectsObject || {});

  if (entries.length === 0) {
    diamondproductsGridEl.replaceChildren();
    diamondproductsShowState("empty");
    return;
  }

  // Newest first. Missing timestamps sort to the back rather than
  // throwing, so one malformed record can't break the whole feed.
  entries.sort(([, a], [, b]) => (b?.timestamp || 0) - (a?.timestamp || 0));

  const query = diamondproductsSearchInput?.value.trim().toLocaleLowerCase() || "";
  const matchingEntries = entries.filter(([, project]) =>
    String(project?.title || "").toLocaleLowerCase().includes(query)
  );

  if (matchingEntries.length === 0) {
    diamondproductsGridEl.replaceChildren();
    diamondproductsShowState("no-results");
    return;
  }

  const fragment = document.createDocumentFragment();

  matchingEntries.forEach(([id, project], index) => {
    if (!project) return;
    const card = diamondproductsCreateCard(project);
    card.dataset.id = id;
    // Stagger: small incremental delay so cards cascade in rather than
    // popping together, capped so a long list doesn't feel sluggish.
    card.style.transitionDelay = `${Math.min(index * 60, 480)}ms`;
    fragment.appendChild(card);
  });

  diamondproductsGridEl.replaceChildren(fragment);
  diamondproductsShowState("ready");

  // Observe each card for scroll-triggered reveal.
  diamondproductsGridEl
    .querySelectorAll(".diamondproducts-card")
    .forEach((card) => diamondproductsRevealObserver.observe(card));
}

/* ------------------------------------------------------------------ */
/* 8. Fetch — live subscription, so new projects appear automatically  */
/* ------------------------------------------------------------------ */

function diamondproductsFetchProjects() {
  diamondproductsShowState("loading");

  onValue(
    diamondproductsProjectsRef,
    (snapshot) => {
      diamondproductsProjects = snapshot.val() || {};
      diamondproductsRender(diamondproductsProjects);
    },
    (error) => {
      console.error("[diamondproducts] Firebase read failed:", error);
      diamondproductsShowState(
        "error",
        "The database didn't respond. Check your connection and try again."
      );
    }
  );
}

diamondproductsRetryBtn?.addEventListener("click", diamondproductsFetchProjects);

diamondproductsSearchInput?.addEventListener("input", () => {
  diamondproductsSearchClearBtn.hidden = !diamondproductsSearchInput.value;
  diamondproductsRender(diamondproductsProjects);
});

diamondproductsSearchClearBtn?.addEventListener("click", () => {
  diamondproductsSearchInput.value = "";
  diamondproductsSearchClearBtn.hidden = true;
  diamondproductsSearchInput.focus();
  diamondproductsRender(diamondproductsProjects);
});

diamondproductsFetchProjects();
