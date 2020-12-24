import { pathToRegex, getParams } from './utils.js';

//Views
import Users from './views/Users.js';
import UserDetails from './views/UserDetails.js';
import Repositories from './views/Repositories.js';

const router = async () => {
  const routes = [
    { path: '/users', view: Users },
    { path: '/users/:id', view: UserDetails },
    { path: '/repositories', view: Repositories },
  ];
  const potentialMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));
  document.querySelector('#app').innerHTML = view.getHtml();
  view.init();

  document.querySelectorAll('a.nav-link').forEach((link) => {
    if (match.route.path.includes(link.getAttribute('href')))
      link.classList.add('active');
    else link.classList.remove('active');
  });
};

export default router;
