import FlowerClass from './FlowerClass/index.js';

export default function Carousel($target) {
  this.setUp = () => {
    this.$state = {
      selected: 0,
      flowerClasses: [
        {
          id: 0,
          name: '롱앤로우 센터피스(2/17~2/21)',
          price: '69,000',
          stores: ['광화문점', '잠실점', '월계점', '구로점'],
          webImageUrl:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ContentsTopBanner/3/class_2022_home_web_R0tReO1.jpeg',
          mobileImageUrl:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ContentsTopBanner/3/class_2022_home_mob_okfoQzB.jpeg',
        },
        {
          id: 1,
          name: '오아시스 리스(2/21~2/27)',
          price: '79,000',
          stores: ['광화문점', '잠실점', '월계점', '구로점', '송파점', '부산동래점'],
          webImageUrl:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ClassProductGroup/106/img_%EC%98%A4%EC%95%84%EC%8B%9C%EC%8A%A4-%EB%A6%AC%EC%8A%A4.jpg',
          mobileImageUrl:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ClassProductGroup/106/img_%EC%98%A4%EC%95%84%EC%8B%9C%EC%8A%A4-%EB%A6%AC%EC%8A%A4.jpg',
        },
        {
          id: 2,
          name: '클래식 핸드타이드(2/28~3/6)',
          price: '79,000',
          stores: ['잠실점', '월계점', '구로점', '송파점', '부산동래점'],
          webImageUrl:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ClassProductGroup/107/img_%ED%81%B4%EB%9E%98%EC%8B%9D-%ED%95%B8%EB%93%9C%ED%83%80%EC%9D%B4%EB%93%9C.jpg',
          mobileImageUrl:
            'https://kukka-2-media-123.s3.amazonaws.com/media/class-name/ClassProductGroup/107/img_%ED%81%B4%EB%9E%98%EC%8B%9D-%ED%95%B8%EB%93%9C%ED%83%80%EC%9D%B4%EB%93%9C.jpg',
        },
      ],
    };
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

  this.template = () => {
    const { selected, flowerClasses } = this.$state;

    return `
    <div class="carousel_inbox">
      <div class="carousel_home_contents_head">
        <h3 class="carousel_tit">
          <span>꽃과 함께 하는 일상, </span>
          <b>플라워클래스</b>
        </h3>
      </div>
      <div class="carousel_products">
        <div class="carousel_event_class">
          <a href="/" class="carousel_link">
            <img class="carousel_img carousel_mobile" src="https://kukka-2-media-123.s3.amazonaws.com/static/kukkart_new/img/kukka/main_class_event.png" alt="매주 새로운 커리큘럼으로 배우는" />
            <img class="carousel_img carousel_pc" src="https://kukka-2-media-123.s3.amazonaws.com/static/kukkart_new/img/kukka/main_class_event_w.png" alt="매주 새로운 커리큘럼으로 배우는" />
            <span class="carousel_real_img carousel_mobile" style="background-image: url(${flowerClasses[selected].mobileImageUrl});"></span>
            <span class="carousel_real_img carousel_pc" style="background-image: url(${flowerClasses[selected].webImageUrl});"></span>
            <strong class="carousel_name">플라워 클래스 자세히 보기</strong>
            <span class="carousel_desc">매주 새로운 커리큘럼으로 배우는</span>
          </a>
        </div>
        <ul class="carousel_special_class">
          <li class="carousel_first_item"></li>
          <li class="carousel_second_item"></li>
        </ul>
        <a href="/" class="carousel_more_link">더보기</a>
        <button class="carousel_left_button" />
        <button class="carousel_right_button" />
      </div>
    </div>`;
  };

  this.mounted = () => {
    const { selected, flowerClasses } = this.$state;
    const $firstItem = this.$target.querySelector('.carousel_first_item');
    const $secondItem = this.$target.querySelector('.carousel_second_item');

    new FlowerClass($firstItem, flowerClasses[(selected + 1) % 3]);

    new FlowerClass($secondItem, flowerClasses[(selected + 2) % 3]);
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
  this.setEvent();
  this.render();
}
