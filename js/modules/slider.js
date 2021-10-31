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

export default slider;