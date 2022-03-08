export default function Modal($target, $props) {
  this.setup = () => {};

  this.setEvent = () => {
    const { isModalShow, handleModalClick } = $props;

    this.$target.addEventListener('click', () => {
      if (isModalShow) handleModalClick();
    });
  };

  this.template = () => {
    const { isModalShow, filePath } = $props;

    this.$target.style.display = isModalShow ? 'block' : 'none';

    return `
        <div class="content">
          <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${filePath}">
        </div>
    `;
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
