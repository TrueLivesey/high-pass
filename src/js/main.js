(() => {
  // CONTACTS
  // yandex_api
  ymaps.ready(init);
  let myMap;
  function init() {
    myMap = new ymaps.Map(
      'map',
      {
        center: [55.765201, 37.621893],
        zoom: 14,
        controls: [],
      },
      {
        suppressMapOpenBlock: true,
      },
    );

    let placemark = new ymaps.Placemark(
      [55.769383, 37.638521],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../images/map-icon.svg',
        iconImageSize: [12, 12],
      },
    );
    myMap.geoObjects.add(placemark);
  }

  function setCenter() {
    if (myMap.setCenter([55.765201, 37.621893]) !== undefined) {
      myMap.setCenter([55.765201, 37.621893]);
    }
  }

  function setPan(x, y) {
    myMap.panTo([x, y], {
      delay: 1500,
    });
  }

  let clampObj = {
    ellipsis: '…', // символ, который добавится после обрезанного текста
    debounce: 300, // задержка изменения обрезания при сжатии сайта (для оптимизации)
    responsive: true, // адаптивно обрезать текст или нет
    className: '.js-clamp', // класс для элемента
    lines: 3, // сколько линий должно быть видно
    portrait: null, // тут можно передать количество линий для портретного режима
    break_word: false, // определять, как обрезать текст - оставлять обрезанное слово или нет
  };

  // PROJECTS
  Ellipsis(clampObj);

  document.addEventListener('DOMContentLoaded', () => {
    // HEADER
    // burger
    const burgerOpenButton = document.querySelector('.header__burger-btn'),
      headerNav = document.querySelector('.header__nav'),
      burgerCloseButton = document.querySelector('.nav__burger-btn'),
      headerNavLinkArray = document.querySelectorAll('.nav__link');

    burgerOpenButton.addEventListener('click', () => {
      headerNav.classList.add('js-burger-open');
    });

    burgerCloseButton.addEventListener('click', () => {
      headerNav.classList.remove('js-burger-open');
    });

    headerNavLinkArray.forEach((headerNavLink) => {
      headerNavLink.addEventListener('click', () => {
        if (headerNav.classList.contains('js-burger-open')) {
          headerNav.classList.remove('js-burger-open');
        }
      });
    });

    // search
    const searchForm = document.querySelector('.search__form'),
      searchButton = document.querySelector('.search__btn'),
      searchCloseButton = document.querySelector('.search__btn-close');

    searchButton.addEventListener('click', () => {
      searchForm.classList.add('js-search-open');
    });

    searchCloseButton.addEventListener('click', (event) => {
      event.preventDefault();
      searchForm.classList.remove('js-search-open');
    });

    // HERO
    const heroLeft = document.querySelector('.hero__left');

    if (heroLeft.offsetHeight > 650) {
      heroLeft.style.backgroundPosition = 'center';
    }

    // FORM VALIDATE
    // valid__form
    const validationAbout = new JustValidate('#about-form');

    validationAbout.addField('#about-email', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели e-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Вы некорректно ввели email',
      },
    ]);

    const validationContacts = new JustValidate('.contacts-form');

    validationContacts
      .addField('#contacts-name', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели имя',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Недостаточное количество символов',
        },
        {
          rule: 'maxLength',
          value: 30,
          errorMessage: 'Вы ввели больше, чем положено',
        },
        {
          rule: 'customRegexp',
          value: /^([a-zа-яё]+)$/i,
          errorMessage: 'Недопустимое значение',
        },
      ])
      .addField('#contacts-email', [
        {
          rule: 'required',
          errorMessage: 'Вы не ввели e-mail',
        },
        {
          rule: 'email',
          errorMessage: 'Вы некорректно ввели email',
        },
      ]);

    // MEDIA
    const mQueryXl = matchMedia('(max-width: 1024px)'),
      mQueryLg = matchMedia('(max-width: 768px)'),
      mQueryMd = matchMedia('(max-width: 576px)');

    // projects
    function setClampAndPan() {
      let timeout;
      clearTimeout(timeout);
      if (mQueryMd.matches) {
        Ellipsis({
          ellipsis: '…',
          debounce: 300,
          responsive: true,
          className: '.js-clamp-576',
          lines: 2,
          portrait: null,
          break_word: false,
        });
        Ellipsis(clampObj);
        setTimeout(() => {
          setPan(55.764893, 37.635211);
        }, 1000);
      } else if (mQueryLg.matches) {
        setTimeout(() => {
          if (setPan(55.764893, 37.635211) !== undefined) {
            setPan(55.764893, 37.635211);
          }
        }, 1000);
        Ellipsis({
          ellipsis: '…',
          debounce: 300,
          responsive: true,
          className: '.js-clamp',
          lines: 3,
          portrait: null,
          break_word: false,
        });
        Ellipsis(clampObj);
      } else if (mQueryXl.matches) {
        Ellipsis({
          ellipsis: '…',
          debounce: 300,
          responsive: true,
          className: '.js-clamp',
          lines: 2,
          portrait: null,
          break_word: false,
        });
        setTimeout(() => {
          setPan(55.765183, 37.626721);
        }, 1000);
        Ellipsis(clampObj);
      } else {
        setTimeout(() => {
          setCenter();
        }, 1000);
      }
    }
    setClampAndPan();

    window.addEventListener('resize', () => {
      setClampAndPan();
    });
  });
})();
