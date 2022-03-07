export default function FlowerClass($target, $props) {
  this.setStoreColor = (store) => {
    switch (store) {
      case '광화문점':
        return 'carousel_gwang';
      case '잠실점':
        return 'carousel_jam';
      case '월계점':
        return 'carousel_wolgye';
      case '구로점':
        return 'carousel_guro';
      case '송파점':
        return 'carousel_songpa';
      case '부산동래점':
        return 'carousel_dongrae';
      default:
        return 'carousel_songpa';
    }
  };

  this.template = () => {
    return `
    <div class="carousel_category_product_detail">
      <dl class="carousel_detail">
        <dt class="carousel_thumbnail">
          <a class="carousel_link" href="/" data-offline="false" style="background-image: url(${$props.webImageUrl});">
            <img src="https://kukka-2-media-123.s3.amazonaws.com/static/kukkart_new/img/kukka/main_class_special.png" alt="${
              $props.name
            }">
            <span class="carousel_image" style="background-image: url(${$props.webImageUrl});"></span>
            <span class="carousel_category_product_bdg"></span>
          </a>
        </dt>
        <dd class="carousel_summary">
          <a href="/" class="carousel_name_2" data-offline="false">${$props.name}</a>
          <span class="carousel_discount">
            <span class="carousel_price">${$props.price}원</span>
          </span>
          <span class="carousel_more"></span>
          <span class="carousel_showroom">
            ${$props.stores
              .map((store) => {
                return `<a href="/" class="carousel_store ${this.setStoreColor(
                  store
                )}" data-offline="true">${store}</a>`;
              })
              .join('')}
          </span>
        </dd>
      </dl>
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
  this.render();
}
