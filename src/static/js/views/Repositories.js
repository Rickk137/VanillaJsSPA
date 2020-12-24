import ListView from './ListView.js';
import { getRepos, getReposFromIds } from './data/index.js';

export default class extends ListView {
  constructor(params) {
    super(params);
    this.setTitle('Repos');

    this.searchPlaceholder = 'Enter repo name.';

    if (params.repos) this.noSearch = true;
  }

  createElement(el, index) {
    return `<a class="repo" href="${el.link}" target="_blank">
              <span class="name">${
                (this.page - 1) * this.pageSize + index + 1
              }- ${el.name}</span>
              <p>${el.info}</p>
            </a>`;
  }

  search() {
    let list = [];

    if (this.params.repos)
      list = getReposFromIds(this.params.repos, this.page, this.pageSize);
    else list = getRepos(this.criteria, this.page, this.pageSize);

    this.updateList(list);
  }
}
