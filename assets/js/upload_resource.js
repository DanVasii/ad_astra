// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');

document.addEventListener('DOMContentLoaded', function() {
   
    const addButton = document.querySelector('.content .btn.primary');
    const addForm = document.querySelector('.content .add-resource-form');
    const fileInput = addForm.querySelector('input[type="file"]')
    const uploadContainer = addForm.querySelector('.upload-container');

    addForm.addEventListener('submit', function(event) {
        event.preventDefault();

        uploadResource();
    });


    addButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        if (addForm.style.opacity === '0' || addForm.style.opacity === '') {
            addForm.style.opacity = '1';
            addForm.style.display = 'block'
            addForm.style.pointerEvents = 'auto';
        } else {
            addForm.style.opacity = '0';
            addForm.style.display = 'none';
            addForm.style.pointerEvents = 'none';
        }

    });

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        
        if (file && file.type.startsWith('image/')) {
            displayImagePreview(file);
        }
        else if (file && file.type === 'application/pdf') {
            displayPdfPreview(file);
        }

    });

    function displayImagePreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {

            const previewContainer = document.createElement('div'); 
            previewContainer.classList.add('file-preview-container'); 

            const previewImage = document.createElement('img');
            previewImage.classList.add('preview-image');
            previewImage.src = event.target.result;

            const previewImageName = document.createElement('p');
            previewImageName.classList.add('preview-file-name');
            previewImageName.textContent = file.name;

            const trashImage = document.createElement('img');
            trashImage.src = '/assets/images/trash.png';
            trashImage.style.width = '20px'; 
            trashImage.style.height = '20px';

            const trashButton = document.createElement('button');
            trashButton.classList.add('btn', 'danger', 'maxW');
            trashButton.appendChild(trashImage);            

            previewContainer.appendChild(previewImage);
            previewContainer.appendChild(previewImageName);
            previewContainer.appendChild(trashButton);
            
            uploadContainer.appendChild(previewContainer);
        };
      
        reader.readAsDataURL(file);
      }

    function displayPdfPreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {

            const previewContainer = document.createElement('div'); 
            previewContainer.classList.add('file-preview-container'); 

            const previewImage = document.createElement('img');
            previewImage.classList.add('preview-image');
            // previewImage.src = event.target.result;
            previewImage.src = 'assets/images/pdf-icon.png';

            const previewImageName = document.createElement('p');
            previewImageName.classList.add('preview-file-name');
            previewImageName.textContent = file.name;

            const trashImage = document.createElement('img');
            trashImage.src = '/assets/images/trash.png';
            trashImage.style.width = '20px'; 
            trashImage.style.height = '20px';

            const trashButton = document.createElement('button');
            trashButton.classList.add('btn', 'danger', 'maxW');
            trashButton.appendChild(trashImage);            

            previewContainer.appendChild(previewImage);
            previewContainer.appendChild(previewImageName);
            previewContainer.appendChild(trashButton);
            
            uploadContainer.appendChild(previewContainer);
        };
      
        reader.readAsDataURL(file);
    }

});

async function uploadResource() {
    try {
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        const files = fileInput.files;

        formData.append('content', document.querySelector('textarea'));

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        const response = await axios.post('/upload_resource', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        });

        console.log(response.data.message);
    } catch (error) {
        console.error('Error uploading resource:', error.response ? error.response.data : error.message);
    }
}