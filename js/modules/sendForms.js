'use strict';

import {openModal, closeModal} from './modal';
import {postDate} from '../services/services';

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
        openModal(".modal", modalTimerId);

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
            closeModal(".modal");      
        },5000);
    }

}

export default sendForms;