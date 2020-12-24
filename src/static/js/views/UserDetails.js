import BaseView from './BaseView.js';
import Repositories from './Repositories.js';
import { getUserById } from './data/index.js';

export default class extends BaseView {
  constructor(params) {
    super(params);
    this.setTitle('UserDetails');
  }

  getHtml() {
    const user = getUserById(this.params.id);

    if (!user) return `<p>User not found!</p>`;

    this.reposView = new Repositories({
      repos: user.repositories,
    });

    return `
            <div class="users">
              <a href="/users" data-link>Back to Users</a>
              <div class="user-details">
                <div class="user">
                  <img src="${user.avatar}" alt="${user.username}"/>
                  <span class="username">${user.username}</span>
                </div>
                 <p>
                  ${user.info}
                </p>
              </div>
            </div>
            ${this.reposView.getHtml()}
        `;
  }

  init() {
    this.reposView.init();
  }
}
