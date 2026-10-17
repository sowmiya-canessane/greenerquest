const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));

const audienceTabs = [...document.querySelectorAll('[role="tab"][aria-controls]')];
const audiencePanels = audienceTabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

function selectAudienceTab(index, focusTab = false) {
  audienceTabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
    audiencePanels[tabIndex].hidden = !selected;
  });
}

audienceTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectAudienceTab(index));
  tab.addEventListener('keydown', (event) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % audienceTabs.length
      : event.key === 'ArrowLeft' ? (index - 1 + audienceTabs.length) % audienceTabs.length
        : event.key === 'Home' ? 0
          : event.key === 'End' ? audienceTabs.length - 1
            : -1;
    if (next < 0) return;
    event.preventDefault();
    selectAudienceTab(next, true);
  });
});

document.querySelectorAll('.how-card').forEach((card) => {
  card.addEventListener('click', () => {
    const isFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-expanded', String(isFlipped));
    card.setAttribute('aria-label', isFlipped ? card.dataset.backLabel : card.dataset.frontLabel);
    card.querySelector('.how-card-front').setAttribute('aria-hidden', String(isFlipped));
    card.querySelector('.how-card-back').setAttribute('aria-hidden', String(!isFlipped));
  });
});
