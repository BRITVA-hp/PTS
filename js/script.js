document.addEventListener('DOMContentLoaded', () => {

      // Функция слайдера
    function slider(window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass) {
        const window_ = document.querySelector(window),
            field_ = document.querySelector(field),
            cards_ = document.querySelectorAll(cards),
            arrowPrev_ = document.querySelector(arrowPrev),
            arrowNext_ = document.querySelector(arrowNext);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [];

        // Устанавливаем фиксированную ширину поля слайдов

        field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
        field_.style.marginLeft = 'auto';
        field_.style.marginRight = 'auto';

        // Слайд следующий

        function slideNext() {
            sliderCounter++;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter >= cards_.length) {
                sliderCounter = cards_.length - 1;
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                item.classList.remove(dotClassActive);
                if (index == sliderCounter) {
                    item.classList.add(dotClassActive);
                }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
        }

        // Слайд предыдущий

        function slidePrev() {
            sliderCounter--;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter <= 0) {
                sliderCounter = 0;
            }
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
        }

        // Рендер точек

        if (dotsWrap) {
        const dotsWrap_ = document.querySelector(dotsWrap);

        cards_.forEach(() => {
            const dot = document.createElement('div');
            dot.classList.add(dotClass);
            dotsWrap_.appendChild(dot);
            dots_.push(dot);
        });
        dots_[0].classList.add(dotClassActive);
        dots_.forEach((item, index) => {
            item.addEventListener('click', () => {
            sliderCounter = index;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            dots_.forEach(item_ => {
                item_.classList.remove(dotClassActive);
            });
            item.classList.add(dotClassActive);
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            });
        });
        }

        // Переключение на стрелки

        arrowPrev_.addEventListener('click', () => {
            slidePrev();
        });

        arrowNext_.addEventListener('click', () => {
            slideNext();
        });

        // Свайп слайдов тач-событиями

        window_.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (Math.abs(startPoint - endPoint) > 50) {
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (endPoint < startPoint) {
                    slideNext();
                } else {
                    slidePrev();
                }
            } else {
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
        });
    }

    slider(
        '.review__window--big',
        '.review__field--big',
        '.review__wrap--big',
        1419,
        19,
        false,
        false,
        false,
        '.review__arrow--big--prev',
        '.review__arrow--big--next',
        'review__arrow--inactive'
    );

    slider(
        '.review__window--medium',
        '.review__field--medium',
        '.review__card--medium',
        700,
        19,
        false,
        false,
        false,
        '.review__arrow--medium--prev',
        '.review__arrow--medium--next',
        'review__arrow--inactive'
    );

    slider(
        '.review__window--small',
        '.review__field--small',
        '.review__card--small',
        280,
        19,
        false,
        false,
        false,
        '.review__arrow--small--prev',
        '.review__arrow--small--next',
        'review__arrow--inactive'
    );

    // Карта
    ymaps.ready(init);
    function init() {
        // Создание карты.
        const myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.705797, 37.656353],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 12
        });
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects
        .add(new ymaps.Placemark([55.705797, 37.656353], {
            balloonContent: 'г. Москва, ул. Автозаводская, д. 13/1'
        }, {
            preset: 'islands#dotIcon',
            iconColor: '#735184'
        }))
    }

});