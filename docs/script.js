document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    
    // ===============================================
    // --- 1. Header & Smooth Scrolling ---
    // ===============================================
    
    // Efek shadow pada header saat scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth Scrolling untuk tautan navigasi
    document.querySelectorAll('.nav-menu-desktop a, .nav-mobile-bar a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Hanya proses link yang dimulai dengan '#' dan bukan hanya '#' saja
            if (href && href.startsWith('#') && href.length > 1) { 
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    let offset = header.offsetHeight; 
                    
                    // Tambahkan offset jika di layar kecil untuk menghindari terpotong header
                    if (window.innerWidth <= 768) {
                        offset = header.offsetHeight + 10; 
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===============================================
    // --- 2. Fungsi Hitung Mundur (Latihan Section) ---
    // Target: Sabtu, 14:00:00 WITA
    // ===============================================

    const countdownTimer = document.getElementById('countdown-timer');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const countdownMessage = document.getElementById('countdown-message');


    function updateCountdown() {
        // Mendapatkan waktu saat ini di WITA (UTC+8)
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const witaTime = new Date(utc + (3600000 * 8)); // WITA: UTC + 8 jam
        
        const dayOfWeek = witaTime.getDay(); // 0 = Minggu, 6 = Sabtu
        const currentHour = witaTime.getHours();
        
        // **WAKTU TARGET DIPERBAIKI MENJADI 14:00 WITA**
        const targetDay = 6; // Sabtu
        const targetHour = 14; 
        
        let daysUntilTarget = targetDay - dayOfWeek;

        // Logika Reset: Jika sudah Sabtu dan waktu sudah lewat 14:00, target berikutnya adalah Sabtu depan (+7 hari)
        if (daysUntilTarget < 0) {
            daysUntilTarget += 7; 
        } else if (daysUntilTarget === 0 && currentHour >= targetHour) {
            daysUntilTarget = 7; 
        }

        // Tentukan tanggal target
        const targetDate = new Date(witaTime);
        targetDate.setDate(witaTime.getDate() + daysUntilTarget);
        targetDate.setHours(targetHour, 0, 0, 0); 

        // Selisih waktu (dalam milidetik)
        const distance = targetDate.getTime() - witaTime.getTime();

        if (distance < 0) {
            countdownMessage.textContent = "Latihan sedang berlangsung atau baru saja dimulai! Tunggu reset.";
            daysSpan.textContent = hoursSpan.textContent = minutesSpan.textContent = secondsSpan.textContent = "00";
        } else {
            // Perhitungan waktu
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Format dan tampilkan
            daysSpan.textContent = String(days).padStart(2, '0');
            hoursSpan.textContent = String(hours).padStart(2, '0');
            minutesSpan.textContent = String(minutes).padStart(2, '0');
            secondsSpan.textContent = String(seconds).padStart(2, '0');
            
            countdownMessage.textContent = "Sampai latihan dimulai lagi!";
        }
    }

    // Panggil fungsi countdown jika elemennya ada
    if (countdownTimer) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ===============================================
    // --- 3. Fungsi View All Projek ---
    // ===============================================

    const viewAllButton = document.getElementById('view-all-button');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    
    // Hanya tambahkan event listener jika ada tombol dan projek tersembunyi
    if (viewAllButton && hiddenProjects.length > 0) {
        
        viewAllButton.addEventListener('click', () => {
            // Tampilkan semua projek tersembunyi
            hiddenProjects.forEach(project => {
                // Gunakan 'flex' karena .project-row menggunakan display: flex
                project.style.display = 'flex'; 
            });

            // Sembunyikan tombol "Lihat Semua Projek" setelah diklik
            viewAllButton.style.display = 'none';
        });
    }
});