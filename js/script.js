 document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabHeader = document.querySelector('.tabheader__items'),
          tabHeaderItems = tabHeader.querySelectorAll('.tabheader__item'),
          tabContentItems = document.querySelectorAll('.tabcontent');

          
    function hideTabs () {

        tabContentItems.forEach(element => {
            element.classList.add ('hide');
            element.classList.remove ('show', 'fade');
        });

        tabHeaderItems.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTabs (i = 0) {
        tabContentItems[i].classList.add('show', 'fade');
        tabContentItems[i].classList.remove('hide');
        tabHeaderItems[i].classList.add('tabheader__item_active');
        console.log(tabContentItems);
    }

    tabHeader.addEventListener('click', (event) => {
        const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabHeaderItems.forEach((element, i) => {
                    if (element == target) {
                        hideTabs ();
                        showTabs (i); 
                    }
                    
                });
            }
    });

    hideTabs ();
    showTabs ();

    //Timer 

    
});
