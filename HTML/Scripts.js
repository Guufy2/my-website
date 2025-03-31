function toggleContent(element) {
    const serviceContent = element.closest('.service-content');
    serviceContent.classList.toggle("expanded");

    const arrow = element.querySelector('.arrow');
    arrow.textContent = serviceContent.classList.contains("expanded") ? "▲" : "▼";

    const moreImgs = serviceContent.querySelector('.more-imgs');
    if (moreImgs) {
        moreImgs.style.display = serviceContent.classList.contains("expanded") ? "flex" : "none";
    }
}


// Open the modal when an image is clicked
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    modal.style.display = "flex"; // Show the modal
    modalImg.src = img.src; // Set the clicked image inside the modal
}

// Close the modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Close modal when pressing "Esc"
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
