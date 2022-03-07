export default function Video($target) {
  this.template = () => {
    return `
    <div class="video-ratio">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/FiZI8xd3qoY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.$target = $target;
  this.render();
}
