/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

    'use strict';

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');

    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = "1.375";
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {

        const elements = document.querySelectorAll(selector);

        elements.forEach(e => {
            e.classList.remove(activeClass);
        });

        elements.forEach(element => {
            if (element.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('id') == localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
        });

    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {

        if (!height || !weight || !age) {
            result.textContent = '0';
            return;
        } else {
            if (sex === 'female') {
                result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
            }
            if (sex === 'male') {
                result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
            }
        }
    }

    calcTotal();

    function getStaticinformation(parrentSelector, activeClass) {
        const elements = document.querySelectorAll(parrentSelector);

        elements.forEach(element => {
            element.addEventListener('click', e => {

                if (e.target.getAttribute('data-ratio')) {
                    ratio = e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(e => {
                    e.classList.remove(activeClass);
                });

                element.classList.add(activeClass);
                calcTotal();

            });
        });

    }

    getStaticinformation('#gender div', 'calculating__choose-item_active');
    getStaticinformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight ');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menu () {

'use strict';

    class MenuItemTemplate {
        constructor(img, altimg, title, descr, price, ...somthigElse) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.heigth = "133px";
            // this.dollar = 75;
            // this.DollarToRubl();
            this.somthigElse = somthigElse;
        }

        // DollarToRubl () {   
        //     this.price = Math.floor(this.price * this.dollar);
        // }

        creatItem () {
            let newDiv = document.createElement('div'),
                menu = document.querySelector(".menu__field .container");
                
            newDiv.classList.add('menu__item');

            if (this.somthigElse.length === 0) {
                newDiv.classList.add('menu__item');
                }
            else {this.somthigElse.forEach(element => 
                {
                newDiv.classList.add('menu__item');
                newDiv.classList.add(element);
                });
            } 

            newDiv.innerHTML =  `<img src=${this.img} alt="post">
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> - <b>USD</b>/день</div>`;

            newDiv.querySelector(".menu__item-descr").style.minHeight = this.heigth;
            menu.append(newDiv);
        }   
    }

    document.querySelector(".menu__field .container").innerHTML = ""; 

        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({img, altimg, title, descr, price}) => {
                    // console.log(`price = ${price} это `, typeof(price));
                    new MenuItemTemplate(img, altimg, title, descr, price).creatItem();
                });
            });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });


function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";

    console.log(modalTimerId);
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);


    modalTrigger.forEach(element => {
        element.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.hasAttribute('data-close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {
        setTimeout(() => {
            if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }, 5000);

    }

    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/sendForms.js":
/*!*********************************!*\
  !*** ./js/modules/sendForms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");





function sendForms (formSelector, modalTimerId) {  

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'загрузка',
        succes: 'спасибо! скоро мы с вами свяжемся, в клубок...',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(element => {
        bindPostData(element);
    });

    function bindPostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
    
            showThanksModal(message.loading);

            const formData = new FormData(form); //конструктор формирует объект формата FormDate по даннным введынм из форм пользователем
            console.log("Form Data: " + formData);

            let object = {};    // конструктор формирует объект типа Object из FormDate
            formData.forEach((value, key) => {   
                object[key] = value;
            });
            console.log("Object: " + object);
          
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postDate)('http://localhost:3000/requests', JSON.stringify(object))
            // .then(data => { data.text(); console.log('что пришло из промиса' + data);})
            .then(data => {
                document.querySelector('.thanksModal').remove();
                showThanksModal(message.succes);
                console.log(data);
                console.log('succes');
            }).catch(() => {
                document.querySelector('.thanksModal').remove();
                showThanksModal(message.failure);  
            }).finally(() => {
                form.reset();
            });

        });
    } 

    function showThanksModal(message) {
        
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog', 'thanksModal');
        thanksModal.innerHTML = `<div class="modal__content">
                                    <div data-close class="modal__close">&times;</div>
                                    <div class="modal__title">${message}</div>
                                </div>`;
        
        document.querySelector('.modal').append(thanksModal);

        setTimeout( () => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');  
            prevModalDialog.classList.remove('hide');  
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");      
        },5000);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForms);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    'use strict';

    const sliders = document.querySelectorAll('.offer__slide'),
        totalCounter = document.querySelector('.offer__slider-counter [id="total"]'),
        prevButton = document.querySelector('.offer__slider-prev'),
        nextButton = document.querySelector('.offer__slider-next');

    let currentCounter = document.querySelector('.offer__slider-counter [id="current"]'),
        counterValue = 1;

    totalCounter.textContent = `0${sliders.length}`;
    currentCounter.textContent = `0${counterValue}`;

    sliders.forEach(element => {
        hideSlider(element);
    });

    showSlider(sliders[0]);

    function hideSlider(slider) {
        slider.classList.remove('show');
        slider.classList.add('hide');
    }

    function showSlider(slider) {
        slider.classList.remove('hide');
        slider.classList.add('show');
    }

    prevButton.addEventListener('click', () => {

        hideSlider(sliders[counterValue - 1]);

        if (counterValue == 1) {
            counterValue = sliders.length;
            currentCounter.textContent = `0${counterValue}`;
        } else {
            counterValue--;
            currentCounter.textContent = `0${counterValue}`;
        }

        showSlider(sliders[counterValue - 1]);

    });

    nextButton.addEventListener('click', () => {

        hideSlider(sliders[counterValue - 1]);

        if (counterValue == sliders.length) {
            counterValue = 1;
            currentCounter.textContent = `0${counterValue}`;
        } else {
            counterValue++;
            currentCounter.textContent = `0${counterValue}`;
        }

        showSlider(sliders[counterValue - 1]);

    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);
        console.log(tabs);

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
        const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline) {

    "use strict";

    function showTimeleft(deadline) {

        return Date.parse(deadline) - Date.parse(new Date());

    }

    function showDhms(shortDate) {

        let z = showTimeleft(shortDate);

        let days = Math.floor(z / (1000 * 60 * 60 * 24));
        let hours = Math.floor(z / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(z / (1000 * 60) % 60);
        let seconds = Math.floor((z / 1000) % 60);

        // console.log(`сейчас ${Date()}`);
        // console.log(`до ${deadline} осталось ${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`);  

        return {
            total: z,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function updateTimer(selector, timeLimit) {

        const timerBlock = document.querySelector(selector),
            days = timerBlock.querySelector('#days'),
            hours = timerBlock.querySelector('#hours'),
            minutes = timerBlock.querySelector('#minutes'),
            seconds = timerBlock.querySelector('#seconds'),
            timeInterval = setInterval(updateclock, 1000);

        updateclock();

        function updateclock() {
            const currentTime = showDhms(timeLimit);

            days.innerHTML = getZero(currentTime.days);
            hours.innerHTML = getZero(currentTime.hours);
            minutes.innerHTML = getZero(currentTime.minutes);
            seconds.innerHTML = getZero(currentTime.seconds);

            if (currentTime.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = "00";
                hours.innerHTML = "00";
                minutes.innerHTML = "00";
                seconds.innerHTML = "00";
            }
        }
    }

    updateTimer(id, deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postDate": () => (/* binding */ postDate),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });


const postDate = async (url, data) => {
    const resolve = await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data 
    });

    return await resolve.json();
};


const getResource = async url => {
    const resolve = await fetch(url);

    if(!resolve.ok) {
        throw new Error(`could not fetch ${url}, status: ${resolve.status}`);
    }

    return await resolve.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_sendForms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/sendForms */ "./js/modules/sendForms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











window.addEventListener('DOMContentLoaded', () => {
 
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(".modal", modalTimerId), 30000);

    // openModal('.modal');
    // setTimeout(() => console.log(500), 500);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"]) (); 
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__["default"]) (); 
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"]) ("[data-modal]", ".modal", modalTimerId); 
    (0,_modules_sendForms__WEBPACK_IMPORTED_MODULE_3__["default"]) ('form', modalTimerId ); 
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"]) (); 
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"]) ('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); 
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"]) ('.timer','2021-12-31 23:59'); 

});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map