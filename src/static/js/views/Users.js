import ListView from './ListView.js';
import { getUsers } from './data/index.js';

export default class extends ListView {
  constructor(params) {
    super(params);
    this.setTitle('Users');
    this.searchPlaceholder = 'Enter user name.';
  }

  createElement(el) {
    return ` <div class="user">
          <a href="/users/${el.id}" data-link ></a>
          <img src="${el.avatar}" alt="${el.username}"/>
          <span class="username">${el.username}</span>
        </div>`;
  }

  search() {
    this.updateList(getUsers(this.criteria, this.page, this.pageSize));
  }
}
