export default function Nodes($target, $props) {
  this.setup = () => {};

  this.setEvent = () => {
    const { handleDirClick, handleFileClick, handleBackSpace } = $props;

    this.$target.addEventListener('click', ({ target }) => {
      const closestTarget = target.closest('div');
      if (closestTarget.classList.contains('Directory')) {
        handleDirClick(closestTarget.innerText, closestTarget.dataset.id);
      }
      if (closestTarget.classList.contains('File')) {
        handleFileClick(closestTarget.dataset.filepath);
      }
      if (closestTarget.classList.contains('Prev')) {
        handleBackSpace();
      }
    });
  };

  this.template = () => {
    const { nodeList, isRoot } = $props;

    const prev = `
        <div class="Node Prev">
          <img src="./assets/prev.png">
        </div>
      `;

    const nodes = nodeList.map((node) =>
      node.type === 'FILE'
        ? `
        <div class="Node File" data-id="${node.id}" data-filepath="${node.filePath}">
          <img src="./assets/file.png">
          <div>${node.name}</div>
        </div>
      `
        : `
        <div class="Node Directory" data-id="${node.id}">
          <img src="./assets/directory.png">
          <div>${node.name}</div>
        </div>
      `
    );

    return isRoot ? `${nodes}` : `${prev}${nodes}`;
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
