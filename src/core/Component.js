export default function Component($target, $props) {
  this.setup = () => {};

  this.setEvent = () => {};

  this.template = () => {
    return ``;
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
