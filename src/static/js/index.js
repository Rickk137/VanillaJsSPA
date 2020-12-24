import router from './router.js';

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

window.addEventListener('popstate', router);
