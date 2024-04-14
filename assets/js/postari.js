document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('#add_resource_button');
    const addContainer = document.querySelector('#main_add_container');

    const addAnnoucmentContainer = document.querySelector('#announcementContainer');
    const addPostContainer = document.querySelector('#postContainer');
    const addEventContainer = document.querySelector('#eventContainer');

    const announcementFormContainer = document.querySelector('#anunt');
    const eventFormContainer = document.querySelector('#eveniment');
    const postFormContainer = document.querySelector('#post');


    addButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        announcementFormContainer.style.opacity = '0';
        announcementFormContainer.style.display = 'none';
        announcementFormContainer.style.pointerEvents = 'none';

        eventFormContainer.style.opacity = '0';
        eventFormContainer.style.display = 'none';
        eventFormContainer.style.pointerEvents = 'none';

        postFormContainer.style.opacity = '0';
        postFormContainer.style.display = 'none';
        postFormContainer.style.pointerEvents = 'none';

        if (addContainer.style.opacity === '0' || addContainer.style.opacity === '') {
            addContainer.style.opacity = '1';
            addContainer.style.display = 'block'
            addContainer.style.pointerEvents = 'auto';
            addContainer.style.animation = 'fadeIn 0.5s ease';
        } else {
            addContainer.style.opacity = '0';
            addContainer.style.display = 'none';
            addContainer.style.pointerEvents = 'none';
        }
    });

    addAnnoucmentContainer.addEventListener('click', function(event) {
        event.preventDefault();
        addContainer.style.opacity = '0';
        addContainer.style.display = 'none';
        addContainer.style.pointerEvents = 'none';

        announcementFormContainer.style.opacity = '1';
        announcementFormContainer.style.display = 'block';
        announcementFormContainer.style.pointerEvents = 'auto';
        announcementFormContainer.style.animation = 'fadeIn 0.5s ease';

    });

    addPostContainer.addEventListener('click', function(event) {
        event.preventDefault();
        addContainer.style.opacity = '0';
        addContainer.style.display = 'none';
        addContainer.style.pointerEvents = 'none';

        postFormContainer.style.opacity = '1';
        postFormContainer.style.display = 'block';
        postFormContainer.style.pointerEvents = 'auto';
        postFormContainer.style.animation = 'fadeIn 0.5s ease';
    });

    addEventContainer.addEventListener('click', function(event) {
        event.preventDefault();
        addContainer.style.opacity = '0';
        addContainer.style.display = 'none';
        addContainer.style.pointerEvents = 'none';

        eventFormContainer.style.opacity = '1';
        eventFormContainer.style.display = 'block';
        eventFormContainer.style.pointerEvents = 'auto';
        eventFormContainer.style.animation = 'fadeIn 0.5s ease';
    });


});