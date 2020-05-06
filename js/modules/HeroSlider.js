import $ from 'jquery';

class HeroSlider {
  constructor() {
    this.els = $(".old-hero-slider");
    this.initSlider();
  }

  initSlider() {
    this.els.slick({
      autoplay: true,
      arrows: false,
      dots: true
    });
  }
}

export default HeroSlider;