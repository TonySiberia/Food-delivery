import {getResource} from '../services/services';

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

        getResource('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({img, altimg, title, descr, price}) => {
                    // console.log(`price = ${price} это `, typeof(price));
                    new MenuItemTemplate(img, altimg, title, descr, price).creatItem();
                });
            });
}

export default menu;