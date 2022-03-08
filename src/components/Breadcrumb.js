export default function Breadcrumb($target, $props) {
  this.setup = () => {};

  this.setEvent = () => {};

  this.template = () => {
    const { paths } = $props;

    const pathList = paths.map((path) => `<div>${path}</div>`).join('');

    return `<div>root</div>${pathList}`;
  };

  this.mounted = () => {};

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
