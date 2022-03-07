import BannerItem from './BannerItem/index.js';

export default function Banner($target) {
  this.setUp = () => {
    this.$state = {
      banners: [
        {
          title: '꾸까 브랜드 이야기',
          description: '꽃으로 라이프스타일을 만들어가는<br /> kukka의 문화를 소개해요.',
          more: 'Brand story',
          backgroundImg:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ContentsTopBanner/2020/12/25/brand_201225_w.png',
        },
        {
          title: '꾸까 오프라인 쇼룸',
          description:
            '꽃을 가까이서 만져보고 향기도 맡아보고, <br /> 꽃 속에서 작은 휴식을 누릴 수 있는 kukka의 오프라인 쇼룸',
          more: '꾸까 쇼룸 안내',
          backgroundImg:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ContentsTopBanner/2020/12/25/offline_201225_w.png',
        },
      ],
    };
  };

  this.template = () => {
    return `
    <div class="banner_container">
      <div class="banner_item_1"></div>
      <div class="banner_item_2"></div>
    </div>
    `;
  };

  this.mounted = () => {
    const { banners } = this.$state;
    const $firstItem = this.$target.querySelector('.banner_item_1');
    const $secondItem = this.$target.querySelector('.banner_item_2');

    new BannerItem($firstItem, banners[0]);
    new BannerItem($secondItem, banners[1]);
  };

  this.setState = (newState) => {
    this.$state = { ...this.$state, ...newState };
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.$target = $target;
  this.setUp();
  this.render();
}
