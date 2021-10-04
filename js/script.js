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

    // function showModal(dataModal, dataClose, connectForm) {

    //     const modal = document.querySelectorAll(dataModal),
    //         close = document.querySelector(dataClose),
    //         form = document.querySelector(connectForm);

    //     function togglerOpen() {
    //         form.classList.toggle('show');
    //         document.body.style.overflow = "hidden";
    //         clearInterval(showModalDelay);
    //     }

    //     function togglerClose() {
    //         form.classList.toggle('show');
    //         document.body.style.overflow = "";
    //     }

    //     modal.forEach(element => {
    //         element.addEventListener('click', togglerOpen);
    //     });

    //     close.addEventListener('click', togglerClose);

    //     form.addEventListener('click', (event) => {
    //         if (event.target === form) {
    //             togglerClose();
    //         }
    //     });

    //     document.addEventListener('keydown', (event) => {
    //         if (event.code === "Escape" && form.classList.contains('show')) {
    //             togglerClose();
    //         }
    //     });

    //     const showModalDelay = setTimeout(togglerOpen, 10000);

    //     window.addEventListener('scroll', () => {
    //         if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
    //             setTimeout(togglerOpen, 2000);
    //         }
    //     });

    // }

    // showModal("[data-modal]", "[data-close]", ".modal");

    //menu

    class MenuItemTemplate {
        constructor(imgSrc, subtitle, decription, totalCost, ...somthigElse) {
            this.imgSrc = imgSrc;
            this.subtitle = subtitle;
            this.decription = decription;
            this.totalCost = totalCost;
            this.heigth = "133px";
            this.dollar = 75;
            this.DollarToRubl();
            this.somthigElse = somthigElse;
        }

        DollarToRubl () {   
            this.totalCost = Math.floor(this.totalCost / this.dollar * 2);
        }

        creatItem () {
            let newDiv = document.createElement('div'),
                menu = document.querySelector(".menu__field .container");
                
            newDiv.classList.add('menu__item');

            if (this.somthigElse.length > 0) {
                this.somthigElse.forEach(element => {
                    newDiv.classList.add(element);
                });
            } 
          
            console.log(newDiv);
            newDiv.innerHTML =  `<img src=${this.imgSrc} alt="post">
                                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                                <div class="menu__item-descr">${this.decription}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.totalCost}</span>  долларов/день</div>`;

            newDiv.querySelector(".menu__item-descr").style.minHeight = this.heigth;
            menu.append(newDiv);
        }   
    }



    const firstItemDescription = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с       оптимальной ценой и высоким качеством!',
        secondItemDescription = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        thirdItemDescription = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        firstItem = new MenuItemTemplate("img/tabs/vegy.jpg", 'Меню "Фитнес"', firstItemDescription, 229, "get", "out", "here", "men"),
        secondItem = new MenuItemTemplate("img/tabs/elite.jpg", 'Меню "Премиум"', secondItemDescription, 550),
        thirdItem = new MenuItemTemplate("img/tabs/post.jpg", 'Меню "Постное"', thirdItemDescription, 430);


    document.querySelector(".menu__field .container").innerHTML = "";        
    firstItem.creatItem();
    secondItem.creatItem();
    thirdItem.creatItem();
});