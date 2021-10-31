"use strict";

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

export default modal;
export {openModal};
export {closeModal};