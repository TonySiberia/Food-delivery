document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    "use strict";

    const tabHeader = document.querySelector('.tabheader__items'),
        tabHeaderItems = tabHeader.querySelectorAll('.tabheader__item'),
        tabContentItems = document.querySelectorAll('.tabcontent');


    function hideTabs() {

        tabContentItems.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });

        tabHeaderItems.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTabs(i = 0) {
        tabContentItems[i].classList.add('show', 'fade');
        tabContentItems[i].classList.remove('hide');
        tabHeaderItems[i].classList.add('tabheader__item_active');
    }

    tabHeader.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabHeaderItems.forEach((element, i) => {
                if (element == target) {
                    hideTabs();
                    showTabs(i);
                }

            });
        }
    });

    hideTabs();
    showTabs();

    //Timer

    const deadline = '2021-09-28 20:39';

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

    updateTimer('.timer', deadline);

    //modal
 

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = "";
    }

    modalTrigger.forEach(element => {
        element.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.hasAttribute('data-close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        setTimeout(() => { 
            if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }, 5000);
      
    }    

    window.addEventListener('scroll', showModalByScroll);
 

    //menu

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

    const getResource = async url => {
            const resolve = await fetch(url);
        
            if(!resolve.ok) {
                throw new Error(`could not fetch ${url}, status: ${resolve.status}`);
            }

            return await resolve.json();
        };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                // console.log(`price = ${price} это `, typeof(price));
                new MenuItemTemplate(img, altimg, title, descr, price).creatItem();
            });
        });


    //send-forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'загрузка',
        succes: 'спасибо! скоро мы с вами свяжемся, в клубок...',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(element => {
        bindPostData(element);
    });

const postDate = async (url, data) => {
    const resolve = await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data 
    });

    return await resolve.json();
};

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
          
            postDate('http://localhost:3000/requests', JSON.stringify(object))
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
        openModal();

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
            closeModal();      
        },5000);
    }

});
