'use strict';

import calc from './modules/calc';
import menu from './modules/menu';
import modal from './modules/modal';
import sendForms from './modules/sendForms';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
 
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 30000);

    // openModal('.modal');
    // setTimeout(() => console.log(500), 500);

    calc (); 
    menu (); 
    modal ("[data-modal]", ".modal", modalTimerId); 
    sendForms ('form', modalTimerId ); 
    slider (); 
    tabs ('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); 
    timer ('.timer','2021-12-31 23:59'); 

});

