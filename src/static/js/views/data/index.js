import CONFIG from './config.js';

import { getRandomItem, paginate, randomArray } from '../../utils.js';

const users = [];
const repos = [];

function generate() {
  for (let i = 0; i < CONFIG.REPOS_AMOUNT; i++) {
    const name = getRandomItem(CONFIG.REPONAMES);
    repos.push({
      id: i + 1,
      name: name,
      info:
        'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. Th',
      link: `https://${name}.com/`,
    });
  }

  for (let i = 0; i < CONFIG.USER_AMOUNT; i++) {
    users.push({
      id: i + 1,
      username: getRandomItem(CONFIG.USERNAMES),
      avatar: '/static/images/' + getRandomItem(CONFIG.AVATARS),
      info:
        'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. Th',
      repositories: randomArray(1, repos.length, CONFIG.MAX_USER_REPOS),
    });
  }
}
generate();

export const getUsers = (criteria = '', pageNumber = 1, pageSize = 20) => {
  return paginate(
    users.filter((u) => u.username.toLowerCase().includes(criteria)),
    pageSize,
    pageNumber
  );
};

export const getRepos = (criteria = '', pageNumber = 1, pageSize = 20) => {
  return paginate(
    repos.filter((u) => u.name.toLowerCase().includes(criteria)),
    pageSize,
    pageNumber
  );
};

export const getReposFromIds = (ids = [], pageNumber = 1, pageSize = 20) => {
  return paginate(
    repos.filter((u) => ids.includes(u.id)),
    pageSize,
    pageNumber
  );
};

export const getUserById = (userId) => {
  return users.find((u) => u.id == userId);
};
