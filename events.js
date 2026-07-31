import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBvS4HJ07d7Umyb89dCsn2bLALvcqnpoSs',
  authDomain: 'diamond-c21dc.firebaseapp.com',
  databaseURL: 'https://diamond-c21dc-default-rtdb.firebaseio.com',
  projectId: 'diamond-c21dc',
  storageBucket: 'diamond-c21dc.firebasestorage.app',
  messagingSenderId: '1035207428852',
  appId: '1:1035207428852:web:ce2faa86d058b75a56eca1'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const grid = document.getElementById('diamond-events-grid');
const empty = document.getElementById('diamond-events-empty');
const notice = document.getElementById('event-notice');
const noticeTitle = document.getElementById('event-notice-title');
const noticeLink = document.getElementById('event-notice-link');
const closeNotice = document.getElementById('event-notice-close');
const progress = document.getElementById('event-notice-progress');
let noticeTimer;

const colors = ['#72e5ff', '#a88cff', '#ff9bd6', '#7dffc0'];
const iconFallback = '<i class="fa-solid fa-sparkles" aria-hidden="true"></i>';

function safeUrl(value) {
  try {
    const url = new URL(value, window.location.origin);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function displayDate(event) {
  const date = event.startsAt ? new Date(event.startsAt) : null;
  if (!date || Number.isNaN(date.getTime())) return 'ONGOING EXPERIENCE';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

function isExpired(event) {
  return Boolean(event.endsAt) && new Date(event.endsAt).getTime() < Date.now();
}

function render(events) {
  grid.replaceChildren();
  empty.hidden = events.length !== 0;
  events.forEach((event, index) => {
    const card = document.createElement('article');
    const expired = isExpired(event);
    card.className = `diamond-event-card${index === 0 ? ' featured' : ''}${expired ? ' is-expired' : ''}`;
    card.style.setProperty('--event-color', colors[index % colors.length]);
    const iconUrl = safeUrl(event.iconLink);
    const linkUrl = safeUrl(event.link);
    card.innerHTML = `
      <div class="diamond-event-top">
        <span class="diamond-event-icon">${iconUrl ? '' : iconFallback}</span>
        <span class="diamond-event-status">${expired ? 'EXPIRED' : 'LIVE NOW'}</span>
      </div>
      <h3></h3><p></p>
      <div class="diamond-event-bottom"><span class="diamond-event-date">${displayDate(event)}</span>${linkUrl ? `<a class="diamond-event-link" href="${linkUrl}">Explore <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}</div>`;
    card.querySelector('h3').textContent = event.title || 'DIAMOND event';
    card.querySelector('p').textContent = event.description || 'A new DIAMOND experience is waiting for you.';
    if (iconUrl) {
      const image = document.createElement('img');
      image.src = iconUrl;
      image.alt = '';
      image.addEventListener('error', () => { image.replaceWith(document.createRange().createContextualFragment(iconFallback)); }, { once: true });
      card.querySelector('.diamond-event-icon').append(image);
    }
    grid.append(card);
  });
}

function hideNotice() {
  clearTimeout(noticeTimer);
  notice.classList.remove('is-visible');
  notice.setAttribute('aria-hidden', 'true');
}

function showNotice(event) {
  noticeTitle.textContent = event.title || 'A new DIAMOND experience is live';
  noticeLink.href = '#events';
  notice.classList.add('is-visible');
  notice.setAttribute('aria-hidden', 'false');
  progress.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: 10000, easing: 'linear', fill: 'forwards' });
  noticeTimer = setTimeout(hideNotice, 10000);
}

closeNotice.addEventListener('click', hideNotice);
noticeLink.addEventListener('click', () => { hideNotice(); document.getElementById('events').scrollIntoView({ behavior: 'smooth', block: 'start' }); });

onValue(ref(db, 'events'), (snapshot) => {
  const events = Object.entries(snapshot.val() || {})
    .map(([id, event]) => ({ id, ...event }))
    .filter(event => event.active !== false)
    .sort((a, b) => {
      const expiryOrder = Number(isExpired(a)) - Number(isExpired(b));
      return expiryOrder || (b.createdAt || 0) - (a.createdAt || 0);
    });
  render(events);
  const currentEvent = events.find(event => !isExpired(event));
  if (currentEvent) showNotice(currentEvent);
}, () => {
  grid.replaceChildren();
  empty.hidden = false;
});
