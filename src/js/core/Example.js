export default function Example($target, $props) {
  this.setup = () => {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        },
      ],
    };
  };

  this.template = () => {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  };

  this.setEvent = () => {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('carousel_left_button')) {
        this.setState({ selected: this.$state.selected === 0 ? 2 : this.$state.selected - 1 });
      }

      if (target.classList.contains('carousel_right_button')) {
        this.setState({ selected: (this.$state.selected + 1) % 3 });
      }
    });
  };

  this.filteredItems = () => {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) || (isFilter === 2 && !active) || isFilter === 0);
  };

  this.addItem = (contents) => {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
  };

  this.deleteItem = (seq) => {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ items });
  };

  this.toggleItem = (seq) => {
    const items = [...this.$state.items];
    const index = items.findIndex((v) => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  };

  this.filterItem = (isFilter) => {
    this.setState({ isFilter });
  };

  this.mounted = () => {
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    new ItemAppender($itemAppender, {
      addItem: this.addItem.bind(this),
    });
    new Items($items, {
      filteredItems: this.filteredItems(),
      deleteItem: this.deleteItem.bind(this),
      toggleItem: this.toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: this.filterItem.bind(this),
    });
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.setState = (newState) => {
    this.$state = { ...this.$state, ...newState };
    this.render();
  };

  this.$target = $target;
  this.$props = $props;
  this.setup();
  this.setEvent();
  this.render();
}
