/* ==========================================
   PESONA - JAVASCRIPT
========================================== */


/* ==========================================
   PRELOADER
========================================== */

const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader?.classList.add("hide");
    }, 700);
});



/* ==========================================
   NAVBAR RESPONSIVE
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");

function setMenu(open) {
    navMenu.classList.toggle("active", open);
    menuToggle.classList.toggle("open", open);

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    menuToggle.setAttribute(
        "aria-label",
        open ? "Tutup menu" : "Buka menu"
    );
}

menuToggle.addEventListener("click", () => {
    setMenu(!navMenu.classList.contains("active"));
});

/* Tutup menu setelah memilih navigasi */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        setMenu(false);
    });
});

/* Tutup menu ketika klik di luar navbar */

document.addEventListener("click", event => {
    if (
        navMenu.classList.contains("active") &&
        !header.contains(event.target)
    ) {
        setMenu(false);
    }
});

/* Tutup menu ketika layar kembali ke desktop */

window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
        setMenu(false);
    }
});


/* ==========================================
   NAVBAR SAAT SCROLL
========================================== */

const progressBar = document.getElementById("scrollProgress");
const toTop = document.getElementById("toTop");

function handleScroll() {

    const scrollY = window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    header.classList.toggle("scrolled", scrollY > 50);

    toTop.classList.toggle("show", scrollY > 500);

    progressBar.style.transform =
        `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;

}

window.addEventListener("scroll", handleScroll, {
    passive: true
});

handleScroll();


/* ==========================================
   TOMBOL KEMBALI KE ATAS
========================================== */

toTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==========================================
   FILTER DESTINASI
========================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const destinationCards =
    document.querySelectorAll(".destination-card");

const searchInput =
    document.getElementById("destinationSearch");

const emptyState =
    document.getElementById("emptyState");

let activeFilter = "all";
const norm = v => (v || "").toLowerCase().trim().replace(/\s+/g, "-");


function filterDestinations() {

    const keyword = searchInput.value
        .toLowerCase()
        .trim();

    let visibleCount = 0;

    destinationCards.forEach(card => {

        const category = norm(card.dataset.category);

        const text = card.textContent.toLowerCase();

        const matchCategory =
            activeFilter === "all" ||
            category === activeFilter;

        const matchSearch =
            text.includes(keyword);

        const visible =
            matchCategory && matchSearch;

        card.hidden = !visible;

        if (visible) {
            visibleCount++;
        }

    });

    emptyState.style.display =
        visibleCount === 0 ? "block" : "none";

}


/* Tombol kategori */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        filterDestinations();

    });

});


/* Pencarian */

searchInput.addEventListener("input", filterDestinations);


/* ==========================================
   MODAL DETAIL DESTINASI
========================================== */

const detailModal =
    document.getElementById("detailModal");

const modalContent =
    document.getElementById("modalContent");

destinationCards.forEach(card => {

    const button = card.querySelector(".detail-btn");

    button.addEventListener("click", () => {

        const image =
            card.querySelector(".destination-image img");

        const title =
            card.querySelector("h3");

        const location =
            card.querySelector(".location");

        const description =
            card.querySelector(".detail-content");

        modalContent.replaceChildren();

        /* Gambar */

        const modalImage =
            document.createElement("img");

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        /* Judul */

        const modalTitle =
            document.createElement("h2");

        modalTitle.textContent = title.textContent;

        /* Lokasi */

        const modalLocation =
            document.createElement("p");

        modalLocation.textContent =
            "Lokasi: " + location.textContent;

        /* Deskripsi */

        const modalDescription =
            document.createElement("p");

        modalDescription.textContent =
            description.textContent.trim();

        modalContent.append(
            modalImage,
            modalTitle,
            modalLocation,
            modalDescription
        );

        /* Google Maps */

        const mapsButton =
            document.createElement("a");

        const mapsQuery =
            title.textContent + " Pesawaran Lampung";

        mapsButton.href =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(mapsQuery);

        mapsButton.target = "_blank";

        mapsButton.rel = "noopener noreferrer";

        mapsButton.className = "maps-btn";

        mapsButton.textContent =
            "Lihat Lokasi di Google Maps ↗";

        modalContent.appendChild(mapsButton);

        detailModal.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});


/* Tutup modal */

function closeDetailModal() {

    detailModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

document.getElementById("modalClose")
    .addEventListener("click", closeDetailModal);

detailModal.addEventListener("click", event => {

    if (event.target === detailModal) {
        closeDetailModal();
    }

});


/* ==========================================
   GALERI LIGHTBOX
========================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const closeLightbox =
    document.getElementById("lightboxClose");

const prevButton =
    document.getElementById("lightboxPrev");

const nextButton =
    document.getElementById("lightboxNext");

let currentImage = 0;


/* Membuka galeri */

function openLightbox(index) {

    currentImage = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* Memperbarui gambar */

function updateLightbox() {

    const item = galleryItems[currentImage];

    const image = item.querySelector("img");

    const caption = item.querySelector(".gallery-caption");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxCaption.textContent =
        caption.textContent;

}


/* Klik gambar galeri */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {
        openLightbox(index);
    });

});


/* Gambar selanjutnya */

nextButton.addEventListener("click", () => {

    currentImage =
        (currentImage + 1) % galleryItems.length;

    updateLightbox();

});


/* Gambar sebelumnya */

prevButton.addEventListener("click", () => {

    currentImage =
        (currentImage - 1 + galleryItems.length) %
        galleryItems.length;

    updateLightbox();

});


/* Tutup lightbox */

function closeGallery() {

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

closeLightbox.addEventListener("click", closeGallery);

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeGallery();
    }

});


/* ==========================================
   KEYBOARD CONTROL
========================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeDetailModal();

        closeGallery();

        setMenu(false);

    }

    if (lightbox.classList.contains("active")) {

        if (event.key === "ArrowRight") {
            nextButton.click();
        }

        if (event.key === "ArrowLeft") {
            prevButton.click();
        }

    }

});


/* ==========================================
   MENU AKTIF BERDASARKAN SECTION
========================================== */

const navLinks =
    document.querySelectorAll(".nav-links a");

const sections =
    document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "current",
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    );

                });

            });

        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* ==========================================
   ANIMASI SAAT SCROLL
========================================== */

const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if ("IntersectionObserver" in window && !reduceMotion) {

    const revealElements = document.querySelectorAll(
        ".about-image, .about-content > *, " +
        ".section-heading > *, .destination-tools, " +
        ".destination-card, .quote-content > *, " +
        ".gallery-item, .map-content > *, " +
        ".map-frame, .footer-top > *"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        }, {
            threshold: 0.12
        });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}


/* ==========================================
   SELESAI
========================================== */




/* ==========================================
   PETA INTERAKTIF (Leaflet)
========================================== */
(function () {
    const el = document.getElementById("pesonaMap");
    if (!el || typeof L === "undefined") return;

    /* Koordinat perkiraan — sesuaikan jika perlu */
    const coords = {
        "Pulau Pahawang": [-5.672, 105.220], "Pulau Kelagian": [-5.690, 105.256],
        "Pulau Legundi": [-5.600, 105.175], "Pantai Sari Ringgung": [-5.588, 105.215],
        "Pantai Mutun": [-5.564, 105.225], "Pantai Ketapang": [-5.635, 105.233],
        "Pantai Klara": [-5.647, 105.209], "Air Terjun Ciupang": [-5.570, 105.125],
        "Air Terjun Gunung Betung": [-5.462, 105.192], "Gunung Betung": [-5.455, 105.185],
        "Gunung Ratai": [-5.560, 105.178], "Air Terjun Talang Mulya": [-5.540, 105.215]
    };
    const colors = { pulau: "#2f8f83", pantai: "#c6a36c", "air-terjun": "#3b82a0", alam: "#5c9a56" };

    const map = L.map(el, { center: [-5.58, 105.2], zoom: 10, zoomControl: false, scrollWheelZoom: false });
    const peta = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { maxZoom: 18, subdomains: "abcd", attribution: "&copy; OpenStreetMap &copy; CARTO" }).addTo(map);
    const satelit = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18, attribution: "Tiles &copy; Esri" });
    L.control.layers({ "Peta": peta, "Satelit": satelit }, null, { position: "topright", collapsed: false }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    /* Zoom scroll hanya aktif setelah peta diklik */
    map.on("click focus", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    const chips = document.getElementById("mapChips");
    const markers = [];

    document.querySelectorAll(".destination-card").forEach(card => {
        const name = card.querySelector("h3").textContent.trim();
        const pos = coords[name];
        if (!pos) return;

        const cat = (card.dataset.category || "").toLowerCase().trim().replace(/\s+/g, "-");
        const icon = L.divIcon({
            className: "", iconSize: [32, 32], iconAnchor: [16, 38], popupAnchor: [0, -38],
            html: '<div class="pin" style="--c:' + (colors[cat] || "#c6a36c") + '"></div>'
        });

        const popup = document.createElement("div");
        popup.className = "map-pop";
        const img = document.createElement("img");
        img.src = card.querySelector("img").src; img.alt = name;
        const box = document.createElement("div");
        const small = document.createElement("small");
        small.textContent = card.querySelector(".location").textContent;
        const title = document.createElement("h4"); title.textContent = name;
        const link = document.createElement("a");
        link.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name + " Pesawaran Lampung");
        link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Buka di Google Maps ↗";
        box.append(small, title, link); popup.append(img, box);

        const marker = L.marker(pos, { icon, title: name }).addTo(map).bindPopup(popup, { closeButton: true });
        markers.push(marker);

        const chip = document.createElement("button");
        chip.className = "map-chip"; chip.textContent = name.replace(/^(Pulau|Pantai|Air Terjun|Kawasan) /, "");
        chip.addEventListener("click", () => {
            chips.querySelectorAll(".map-chip").forEach(c => c.classList.remove("on"));
            chip.classList.add("on");
            map.flyTo(pos, 13, { duration: 1.2 });
            map.once("moveend", () => marker.openPopup());
        });
        chips.appendChild(chip);
    });

    const bounds = L.featureGroup(markers).getBounds().pad(0.25);
    const resetView = () => map.flyToBounds(bounds, { duration: 1 });

    const reset = document.createElement("button");
    reset.className = "map-chip reset"; reset.textContent = "↺ Semua";
    reset.addEventListener("click", () => {
        chips.querySelectorAll(".map-chip").forEach(c => c.classList.remove("on"));
        map.closePopup(); resetView();
    });
    chips.prepend(reset);

    map.fitBounds(bounds);
    setTimeout(() => map.invalidateSize(), 500);
    window.addEventListener("load", () => map.invalidateSize());
})();


/* ==========================================
   ANGKA STATISTIK (count-up)
========================================== */
document.querySelectorAll(".stats h3").forEach(num => {
    const target = parseInt(num.textContent, 10);
    if (isNaN(target) || reduceMotion || !("IntersectionObserver" in window)) return;
    num.textContent = "0";
    new IntersectionObserver((entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        (function tick(now) {
            const p = Math.min((now - start) / 1400, 1);
            num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
        })(start);
    }, { threshold: 0.6 }).observe(num);
});

console.log("PESONA Website berhasil dimuat!");