import BaseView from './BaseView.js';

export default class extends BaseView {
  constructor(params) {
    super(params);

    this.list = [];
    this.page = 1;
    this.pageSize = 20;
    this.noSearch = false;
  }

  updatePagination() {
    //there is no more items left!
    if (this.list.length < this.pageSize)
      [...document.getElementsByClassName('next')].forEach(
        (el) => (el.disabled = true)
      );
    else
      [...document.getElementsByClassName('next')].forEach(
        (el) => (el.disabled = false)
      );

    if (this.page === 1)
      [...document.getElementsByClassName('prv')].forEach(
        (el) => (el.disabled = true)
      );
    else
      [...document.getElementsByClassName('prv')].forEach(
        (el) => (el.disabled = false)
      );
  }

  getHtml() {
    const btns = `<div class="page-btn">
              <button class="prv" class="prv">
                <i class="arrow left"></i>
              </button>
              <button class="next" class="next">
                <i class="arrow right"></i>
              </button>
            </div>`;

    return `
          <div>
        <div>
          <div class="search-header">
            ${
              this.noSearch
                ? '<div></div>'
                : `<input
              id="search-criteria"
              placeholder="${this.searchPlaceholder}"
            />`
            }
            ${btns}
          </div>
        </div>
        <div id="list-wrapper">
          <p>Enter the Criteria and Press Enter...</p>
        </div>
        <div class="search-header">
          <div></div>
          ${btns}
        </div>
      </div>
        `;
  }

  search() {}

  createElement() {}

  nextPage() {
    this.page++;
    this.search();
  }

  prvPage() {
    if (this.page > 1) this.page--;
    this.search();
  }

  init() {
    if (!this.noSearch) {
      const searchEl = document.getElementById('search-criteria');
      searchEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.criteria = searchEl.value.toLowerCase();
          this.page = 1;
          this.search();
        }
      });
    } else {
      this.search();
    }

    [...document.getElementsByClassName('prv')].forEach((el) =>
      el.addEventListener('click', () => this.prvPage())
    );

    [...document.getElementsByClassName('next')].forEach((el) =>
      el.addEventListener('click', () => this.nextPage())
    );

    this.updatePagination();
  }

  updateList(list) {
    this.list = list;
    this.updatePagination();

    let listObjects = '';

    list.forEach((el, i) => {
      listObjects += this.createElement(el, i);
    });

    if (list.length === 0) listObjects = '<p>No Item Found</p>';

    document.getElementById('list-wrapper').innerHTML = listObjects;
  }
}
