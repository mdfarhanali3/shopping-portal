const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreviewElement = document.querySelector('#image-upload-control img');

function updateImagePreview(){
    const files = imagePickerElement.files;

    if (!files || files.length === 0) {
        imagePreviewElement.style.display = 'none';
        return;
    }

    imagePreviewElement.src = URL.createObjectURL(files[0]);
    imagePreviewElement.style.display = 'block';
}

imagePickerElement.addEventListener('change', updateImagePreview);