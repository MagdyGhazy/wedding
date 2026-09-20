/* ==========================================================================
   JavaScript: Magdy & Donia Wedding Invitation
   Interactivity, countdown logic, audio syncing, and language toggling.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 8. Language and i18n Translation ---
    const translations = {
        en: {
            lang_toggle: "عربي",
            save_the_date: "SAVE THE DATE",
            m_and_m: "M&D",
            click_seal: "Click the seal to open",
            you_are_invited: "YOU ARE INVITED",
            celebrate_wedding: "TO CELEBRATE THE WEDDING OF",
            mostafa: "Magdy",
            mayada: "Donia",
            romantic_quote: '"Two souls, one heart, forever together."',
            card_date: "25 . 09 . 2026",
            date_label: "DATE",
            date_val: "25.09.2026",
            day_name: "Friday",
            time_label: "TIME",
            time_val: "8:00 PM",
            evening: "Evening",
            listen_song: "LISTEN TO OUR SONG",
            pause_song: "PAUSE THE SONG",
            special_day_coming: "A SPECIAL DAY IS COMING",
            today_is_special: "TODAY IS THE SPECIAL DAY!",
            days: "Days",
            hours: "Hours",
            mins: "Mins",
            secs: "Secs",
            the_venue: "THE VENUE",
            venue_name: "GRAND L'AMOUR",
            venue_desc: "Our journey begins and it wouldn't be complete without you",
            where: "WHERE",
            where_val: "Al Mahalla Al Kubra - Al Gharbiyya",
            when: "WHEN",
            when_val: "September 25, 2026<br>at 8:00 PM",
            tap_address: "TAP ADDRESS FOR DIRECTION",
            wedding_invitation: "WEDDING INVITATION",
            download_card: "DOWNLOAD CARD",
            share_on_whatsapp: "SHARE ON WHATSAPP",
            footer_logo: "M&D",
            cant_wait: "WE CAN'T WAIT TO CELEBRATE TOGETHER",
            wedding_invitation_footer: "&copy; Wedding Invitation of Magdy & Donia ❤️",
            designed_by: "Designed by Mahmoud Salah",
            wedding_happened: "We Got Married! 💍",
            wedding_memory: "Thank you for celebrating this beautiful day with us ❤️",
            whatsapp_share: `You're joyfully invited to the wedding of Magdy & Donia 💍❤️ Find the full invitation details here:\n${window.location.href}`
        },
        ar: {
            lang_toggle: "English",
            save_the_date: "احفظ هذا التاريخ",
            m_and_m: "م & د",
            click_seal: "اضغط على الختم للفتح",
            you_are_invited: "أنتم مدعوون",
            celebrate_wedding: "للاحتفال بحفل زفاف",
            mostafa: "مجدي",
            mayada: "دنيا",
            romantic_quote: '"روحان، قلب واحد، معاً للأبد."',
            card_date: "٢٥ / ٠٩ / ٢٠٢٦",
            date_label: "التاريخ",
            date_val: "٢٥ / ٠٩ / ٢٠٢٦",
            day_name: "الجمعة",
            time_label: "الوقت",
            time_val: "٨:٠٠",
            evening: "مساءً",
            listen_song: "تشغيل الموسيقى",
            pause_song: "إيقاف الموسيقى",
            special_day_coming: "يوم مميز يقترب",
            today_is_special: "اليوم هو اليوم المنتظر!",
            days: "أيام",
            hours: "ساعات",
            mins: "دقائق",
            secs: "ثواني",
            the_venue: "مكان الحفل",
            venue_name: "قاعة جراند لامور",
            venue_desc: "رحلتنا تبدأ، ولن تكتمل فرحتنا إلا بحضوركم",
            where: "المكان",
            where_val: "المحلة الكبرى - الغربية",
            when: "الزمان",
            when_val: "٢٥ سبتمبر ٢٠٢٦<br>الساعة ٨:٠٠",
            tap_address: "اضغط على العنوان لمعرفة الطريق",
            wedding_invitation: "دعوة الزفاف",
            download_card: "تحميل الدعوة",
            share_on_whatsapp: "مشاركة عبر واتساب",
            footer_logo: "م & د",
            cant_wait: "لا يسعنا الانتظار للاحتفال معكم",
            wedding_invitation_footer: "&copy; دعوة زفاف مجدي ودنيا ❤️",
            designed_by: "تصميم محمود صلاح",
            wedding_happened: "لقد تزوجنا! 💍",
            wedding_memory: "شكراً لكم على مشاركتنا هذا اليوم الجميل ❤️",
            whatsapp_share: `يسعدنا دعوتكم لحضور حفل زفاف مجدي ودنيا 💍❤️ تفاصيل الدعوة الكاملة تجدونها هنا في الرابط:\n${window.location.href}`
        }
    };

    let currentLang = 'ar'; // Set Default to Arabic

    // --- Fix #2: Set og:image to absolute URL for correct social sharing ---
    const ogImageMeta = document.getElementById('og-image-meta');
    if (ogImageMeta && window.location.protocol !== 'file:') {
        ogImageMeta.setAttribute('content', window.location.origin + '/assets/Wedding-post-magdy.png');
    }

    // --- Elements ---
    const bgMusic = document.getElementById('bg-music');
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelope = document.getElementById('envelope');
    const openEnvelopeBtn = document.getElementById('open-envelope-btn');
    const mainContent = document.getElementById('main-content');
    const audioWidget = document.getElementById('audio-widget');
    const whatsappFloatWidget = document.getElementById('whatsapp-float-widget');
    const whatsappFloatBtn = document.getElementById('whatsapp-float-btn');
    const mainParticles = document.getElementById('main-particles');
    const langToggleBtn = document.getElementById('lang-toggle'); // Fix #4: moved here for early access
    
    // Audio toggles
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const cardMusicBtn = document.getElementById('card-music-btn');
    const cardMusicBtnText = document.getElementById('card-music-btn-text');
    const playIcons = document.querySelectorAll('.play-icon');
    const pauseIcons = document.querySelectorAll('.pause-icon');

    // Countdown elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    // Hide body scrollbar while envelope is showing
    document.body.style.overflow = 'hidden';


    // --- 1. Interactive Opening Envelope ---
    openEnvelopeBtn.addEventListener('click', () => {
        // Trigger envelope animations
        envelope.classList.add('open');

        // Play music (user interaction enables audio context)
        playAudio();

        // Wait for animations (flap unfolds + card slides out)
        setTimeout(() => {
            envelopeOverlay.classList.add('hide-envelope');
            mainContent.classList.add('reveal-content');
            mainParticles.classList.add('reveal-particles');
            audioWidget.classList.add('show-widget');
            if (whatsappFloatWidget) whatsappFloatWidget.classList.add('show-widget');
            document.body.style.overflow = '';


            // Scroll to the hero invitation top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 1500); // 1.5s allows complete slide out animation
    });

    // --- 2. Interactive Audio Player (Synced Widget + Card button) ---
    let isPlaying = false;

    function playAudio() {
        bgMusic.play()
            .then(() => {
                isPlaying = true;
                updateAudioUI(true);
            })
            .catch(error => {
                console.log('Audio autoplay prevented or error occurred:', error);
            });
    }

    function pauseAudio() {
        bgMusic.pause();
        isPlaying = false;
        updateAudioUI(false);
    }

    function toggleAudio() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }

    function updateAudioUI(playing) {
        if (playing) {
            audioToggleBtn.classList.add('playing');
            cardMusicBtnText.textContent = translations[currentLang]['pause_song'];
            
            playIcons.forEach(icon => icon.classList.add('hidden'));
            pauseIcons.forEach(icon => icon.classList.remove('hidden'));
        } else {
            audioToggleBtn.classList.remove('playing');
            cardMusicBtnText.textContent = translations[currentLang]['listen_song'];
            
            playIcons.forEach(icon => icon.classList.remove('hidden'));
            pauseIcons.forEach(icon => icon.classList.add('hidden'));
        }
    }

    // Attach events to audio players
    audioToggleBtn.addEventListener('click', toggleAudio);
    cardMusicBtn.addEventListener('click', toggleAudio);

    // Fix #3: Sync isPlaying state when audio naturally ends or encounters an error
    bgMusic.addEventListener('ended', () => {
        isPlaying = false;
        updateAudioUI(false);
    });
    bgMusic.addEventListener('error', () => {
        isPlaying = false;
        updateAudioUI(false);
        console.warn('Audio playback error: file may be missing or format unsupported.');
    });

    // --- 3. Live Countdown Timer ---
    // Wedding Date: September 25, 2026 at 8:00 PM (20:00:00) - Month index 8 = September
    const weddingDate = new Date(2026, 8, 25, 20, 0, 0).getTime();

    // Fix #1: Beautiful post-wedding state instead of showing all zeros
    function showWeddingHappenedState() {
        const countdownWrapper = document.querySelector('.countdown-wrapper');
        if (countdownWrapper) countdownWrapper.style.display = 'none';
        const memoryMsg = document.getElementById('wedding-memory-msg');
        if (memoryMsg) {
            memoryMsg.style.display = 'block';
            memoryMsg.textContent = translations[currentLang]['wedding_memory'];
        }
        const titleEl = document.querySelector('#countdown-sec .section-title');
        if (titleEl) titleEl.textContent = translations[currentLang]['wedding_happened'];
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference <= 0) {
            // Fix #1 (bonus): countdownInterval is 'let' so clearInterval works without TDZ error
            clearInterval(countdownInterval);
            showWeddingHappenedState();
            return;
        }

        // Time calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Render to DOM (with leading zeros)
        let dStr = String(days).padStart(2, '0');
        let hStr = String(hours).padStart(2, '0');
        let mStr = String(minutes).padStart(2, '0');
        let sStr = String(seconds).padStart(2, '0');

        if (typeof currentLang !== 'undefined' && currentLang === 'ar') {
            const toAr = s => s.replace(/[0-9]/g, w => ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'][w]);
            dStr = toAr(dStr);
            hStr = toAr(hStr);
            mStr = toAr(mStr);
            sStr = toAr(sStr);
        }

        daysEl.textContent = dStr;
        hoursEl.textContent = hStr;
        minsEl.textContent = mStr;
        secsEl.textContent = sStr;
    }

    // Fix: Use 'let' (not 'const') so clearInterval inside updateCountdown has access
    // without hitting the Temporal Dead Zone (TDZ) bug
    let countdownInterval;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // --- 5. 3D Tilt Effect on Invitation Card ---
    const tiltCard = document.getElementById('tilt-card');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return; // Disable on mobile/touch screens
            const cardRect = tiltCard.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            // Mouse position relative to the card center (from -0.5 to 0.5)
            const mouseX = (e.clientX - cardRect.left) / cardWidth - 0.5;
            const mouseY = (e.clientY - cardRect.top) / cardHeight - 0.5;
            
            // Calculate tilt angle (max 15 degrees)
            const tiltX = (mouseY * -15).toFixed(2);
            const tiltY = (mouseX * 15).toFixed(2);
            
            // Apply 3D transform
            tiltCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            tiltCard.style.boxShadow = `0 15px 35px rgba(43, 29, 22, 0.25)`;
        });
        
        tiltCard.addEventListener('mouseleave', () => {
            // Reset transforms with transition
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
            tiltCard.style.boxShadow = `var(--shadow-heavy)`;
        });
    }

    // Fix #4: langToggleBtn is now declared earlier in elements section (line ~107)
    // Removed duplicate: const langToggleBtn = document.getElementById('lang-toggle');

    function updateLanguage(lang) {
        currentLang = lang;
        const dict = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        if (langToggleBtn) {
            langToggleBtn.textContent = dict['lang_toggle'];
        }

        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        if (isPlaying) {
            cardMusicBtnText.textContent = dict['pause_song'];
        } else {
            cardMusicBtnText.textContent = dict['listen_song'];
        }

        // Fix #1: Re-apply wedding-happened state text when language switches
        const difference = weddingDate - new Date().getTime();
        if (difference <= 0) {
            showWeddingHappenedState();
        }
        // Update invitation image and download link
        const invitationImg = document.getElementById('invitation-img');
        const downloadBtn = document.getElementById('download-btn');
        if (invitationImg && downloadBtn) {
            if (lang === 'en') {
                invitationImg.src = 'assets/Wedding-post-magdy.png';
                downloadBtn.href = 'assets/Wedding-post-magdy.png';
                downloadBtn.download = 'Magdy_Donia_Invitation_EN.jpg';
            } else {
                invitationImg.src = 'assets/Wedding-post-magdy.png';
                downloadBtn.href = 'assets/Wedding-post-magdy.png';
                downloadBtn.download = 'Magdy_Donia_Invitation_AR.jpg';
            }
        }
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            updateLanguage(newLang);
        });
    }

    // --- WhatsApp Share Functionality ---
    const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
    
    function shareOnWhatsApp(e) {
        if (e) e.preventDefault();
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(translations[currentLang].whatsapp_share)}`;
        window.open(whatsappUrl, '_blank');
    }

    if (whatsappFloatBtn) {
        whatsappFloatBtn.addEventListener('click', shareOnWhatsApp);
    }

    if (whatsappShareBtn) {
        whatsappShareBtn.addEventListener('click', shareOnWhatsApp);
    }


    // --- 7. Lightbox Zoom Modal for Invitation Image ---
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');

    if (tiltCard && imageModal && modalImg) {
        tiltCard.style.cursor = 'pointer';
        tiltCard.addEventListener('click', () => {
            const img = tiltCard.querySelector('.shabka-invitation-img');
            if (img) {
                modalImg.src = img.src;
                imageModal.style.display = 'flex';
                // Force layout reflow to allow transition
                void imageModal.offsetWidth;
                imageModal.classList.add('show');
                imageModal.setAttribute('aria-hidden', 'false'); // Fix #5: update accessibility attribute on open
                document.body.style.overflow = 'hidden'; // Disable scroll on body
            }
        });

        const closeModal = () => {
            imageModal.classList.remove('show');
            imageModal.setAttribute('aria-hidden', 'true'); // Fix #5: restore accessibility attribute on close
            document.body.style.overflow = ''; // Restore scroll
            setTimeout(() => {
                imageModal.style.display = 'none';
            }, 300);
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Fix #7: Close when clicking backdrop or anywhere outside the image (cleaner UX)
        imageModal.addEventListener('click', (e) => {
            if (e.target !== modalImg) {
                closeModal();
            }
        });

        // Fix #6: Allow closing the modal with the Escape key (keyboard accessibility)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.getAttribute('aria-hidden') === 'false') {
                closeModal();
            }
        });
    }

    (function () {
        const pageUrl   = window.location.href.split('#')[0];
        const shareText = translations[currentLang].whatsapp_share;
        const isMobile  = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const messengerBtn = document.getElementById('messenger-share-btn');
        messengerBtn.removeAttribute('href');
        messengerBtn.style.cursor = 'pointer';

        messengerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const fallbackUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl);

            if (isMobile) {
                const deepLink = 'fb-messenger://share/?link=' + encodeURIComponent(pageUrl);
                const clickedAt = Date.now();
                window.location.href = deepLink;

                setTimeout(() => {
                    if (Date.now() - clickedAt < 1500 && !document.hidden) {
                        window.location.href = fallbackUrl;
                    }
                }, 800);
            } else {
                window.open(fallbackUrl, '_blank');
            }
        });

        const toast = document.getElementById('share-toast');
        document.getElementById('instagram-share-btn').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(pageUrl);
            } catch (e) {
                const t = document.createElement('textarea');
                t.value = pageUrl; document.body.appendChild(t);
                t.select(); document.execCommand('copy'); t.remove();
            }
            toast.textContent = 'تم نسخ اللينك — الصقه في الاستوري أو البايو';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2800);
            setTimeout(() => {
                window.location.href = isMobile ? 'instagram://story-camera' : 'https://www.instagram.com/';
            }, 900);
        });
    })();

});
