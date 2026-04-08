const container = document.getElementById("mainImageContainer");
const image = document.getElementById("mainImage");
const lens = document.getElementById("zoomLens");
const preview = document.getElementById("zoomPreview");

const zoomLevel = 3;

function moveLens(e) {
    const rect = container.getBoundingClientRect();

    const lensW = lens.offsetWidth;
    const lensH = lens.offsetHeight;

    // mouse position inside container
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // center lens
    x = x - lensW / 2;
    y = y - lensH / 2;

    // boundaries
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > rect.width - lensW) x = rect.width - lensW;
    if (y > rect.height - lensH) y = rect.height - lensH;

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    const scaleX = image.naturalWidth / rect.width;
    const scaleY = image.naturalHeight / rect.height;

    const bgX = x * scaleX * zoomLevel;
    const bgY = y * scaleY * zoomLevel;

    preview.style.backgroundPosition = `-${bgX}px -${bgY}px`;
}

function initZoom() {
    preview.style.backgroundImage = `url(${image.src})`;
    preview.style.backgroundSize = `${image.naturalWidth * zoomLevel}px ${image.naturalHeight * zoomLevel}px`;
}

container.addEventListener("mouseenter", () => {
    lens.style.display = "block";
    preview.style.display = "block";
    initZoom();
});

container.addEventListener("mousemove", moveLens);

container.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    preview.style.display = "none";
});


const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        thumbnails.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");

        mainImage.src = thumb.src;
        zoomPreview.style.backgroundImage = `url(${thumb.src})`;
    });
});

document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", function () {
        const currentItem = this.parentElement;

        document.querySelectorAll(".faq-item").forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove("active");
            }
        });

        currentItem.classList.toggle("active");
    });
});

const tabs = document.querySelectorAll(".process-tab");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
    });
});

const overlay = document.getElementById("modalOverlay");
const techModal = document.getElementById("techModal");
const quoteModal = document.getElementById("quoteModal");

function openModal(modal) {
    overlay.classList.add("active");
    modal.classList.add("active");
    document.body.classList.add("modal-open");
}

function closeAllModals() {
    overlay.classList.remove("active");
    techModal.classList.remove("active");
    quoteModal.classList.remove("active");
    document.body.classList.remove("modal-open");
}

/* button from any section */
const techTrigger = document.querySelector(".view-tech-specs");
const quoteTrigger = document.querySelector(".request-quote");

if (techTrigger) {
    techTrigger.addEventListener("click", () => {
        openModal(techModal);
    });
}

if (quoteTrigger) {
    quoteTrigger.addEventListener("click", () => {
        openModal(quoteModal);
    });
}

overlay.addEventListener("click", closeAllModals);

document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
});

const header = document.querySelector("header");
const triggerHeight = window.innerHeight * 0.9;
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > triggerHeight && current > lastScroll) {
        header.classList.add("sticky-visible");
    } else if (current < lastScroll) {
        header.classList.remove("sticky-visible");
    }

    lastScroll = current;
});

const track = document.querySelector(".process-track");
let index = 0;

document.querySelector(".process-next").onclick = () => {
    index = (index + 1) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
};

document.querySelector(".process-prev").onclick = () => {
    index = (index - 1 + 3) % 3;
    track.style.transform = `translateX(-${index * 100}%)`;
};

const appSlider = document.querySelector(".applications-slider");
const appCards = document.querySelectorAll(".application-card");

let appIndex = 0;

document.querySelector(".next-btn").addEventListener("click", () => {
    appIndex = Math.min(appIndex + 1, appCards.length - 1);

    appSlider.scrollTo({
        left: appCards[appIndex].offsetLeft - 120,
        behavior: "smooth"
    });
});

document.querySelector(".prev-btn").addEventListener("click", () => {
    appIndex = Math.max(appIndex - 1, 0);

    appSlider.scrollTo({
        left: appCards[appIndex].offsetLeft - 120,
        behavior: "smooth"
    });
});