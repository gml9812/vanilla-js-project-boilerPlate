export default function BannerItem($target, $props) {
  this.setEvent = () => {
    this.$target.addEventListener('mouseover', ({ currentTarget }) => {
      currentTarget.querySelector('.banner_real_img').style.transform = 'scale(1.05)';
    });
    this.$target.addEventListener('mouseout', ({ currentTarget }) => {
      currentTarget.querySelector('.banner_real_img').style.transform = '';
    });
  };

  this.template = () => {
    return `
      <div class="banner_item">
        <a href="/" class="banner_link">
          <img src="https://kukka-2-media-123.s3.amazonaws.com/static/kukkart_new/img/kukka/main_brand_story_w.png" class="banner_pc" alt="">
          <span class="banner_real_img banner_pc" style="background-image: url(${$props.backgroundImg});"></span>
          <strong class="banner_name">${$props.title}</strong>
          <b class="banner_desc">
            ${$props.description}
            <span class="banner_more">${$props.more}</span>
          </b>

        </a>
      </div>`;
  };

  this.setState = (newState) => {
    this.$state = { ...this.$state, ...newState };
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.$target = $target;
  this.setEvent();
  this.render();
}
