
// Navbar hamburger menu
let justOpenedNavbarMenu = false;
let justOpenedDownloadMenu = false;

function toggleNavbarMenu() {
    const menuContent = document.querySelector('.hamburger-menu-content');
    if (menuContent) {
        menuContent.classList.toggle('active');
        justOpenedNavbarMenu = true;
    } else {
        console.error("Hamburger menu element not found.");
    }
}

function toggleDownloadMenu() {
    const menuMobile = document.getElementById('hamburger-downloadwp-mobile');
    if (menuMobile) {
        menuMobile.classList.toggle('active');
        justOpenedDownloadMenu = true;
    } else {
        console.error('Element #hamburger-downloadwp-mobile not found.');
    }
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    const menuContent = document.querySelector('.hamburger-menu-content');
    const hamburgerButton = document.getElementById('hamburger-menu');

    if (menuContent && menuContent.classList.contains('active')) {
        const isClickOutsideMenu = !menuContent.contains(event.target);
        const isClickOnHamburgerButton = hamburgerButton.contains(event.target);

        if (justOpenedNavbarMenu) {
            justOpenedNavbarMenu = false;
            return;
        }

        if (isClickOutsideMenu && !isClickOnHamburgerButton) {
            menuContent.classList.remove('active');
        }
    }

    const downloadMenuMobile = document.getElementById('hamburger-downloadwp-mobile');
    const downloadButton = document.getElementById('downloadwp');
    const isClickOnDownloadButton = downloadButton ? downloadButton.contains(event.target) : false;

    if (downloadMenuMobile && downloadMenuMobile.classList.contains('active')) {
        const isClickOutsideDownloadMenu = !downloadMenuMobile.contains(event.target);
        const isClickOnDownloadLink = event.target.closest('a');

        if (justOpenedDownloadMenu) {
            justOpenedDownloadMenu = false;
            return;
        }

        if (isClickOutsideDownloadMenu && !isClickOnDownloadLink && !isClickOnDownloadButton) {
            downloadMenuMobile.classList.remove('active');
        }
    }
});

// Smooth scroll for navbar links
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const customOffset = parseInt(this.getAttribute('data-offset')) || 0;
            const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - customOffset;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
    });
});

// Smooth scroll for hamburger menu links
document.querySelectorAll('.hamburger-menu-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const customOffset = parseInt(this.getAttribute('data-offset')) || 0;
            const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - customOffset;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
            document.querySelector('.hamburger-menu-content').classList.remove('active');
        }
    });
});

// Tokenomics pie charts
let myChartDesktop;
let myChartMobile;

function loadDesktopChart() {
    const canvasElement = document.getElementById('myChartdesktop');
    if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        if (ctx) {
            if (myChartDesktop) myChartDesktop.destroy();

            myChartDesktop = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Liquidity', 'Team'],
                    datasets: [{
                        label: 'Total supply 10.000.000',
                        data: [95, 5],
                        backgroundColor: ['rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)'],
                        borderColor: 'white',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'white',
                                font: { size: 15, family: "'Orbitron', sans-serif" }
                            }
                        },
                        title: {
                            display: true,
                            text: ['TOTAL SUPPLY:', '10.000.000 (10M)'],
                            color: 'white',
                            font: { size: 16, family: "'Orbitron', sans-serif" },
                            padding: { bottom: 20 },
                            align: 'center'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return label + ': ' + value + '% of total supply';
                                }
                            },
                            titleFont: { size: 14, family: "'Orbitron', sans-serif" },
                            bodyFont: { size: 12, family: "'Orbitron', sans-serif" },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            borderColor: 'white',
                            borderWidth: 1
                        }
                    }
                }
            });
        }
    }
}

function loadMobileChart() {
    const canvasElement = document.getElementById('myChartMobile');
    if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        if (ctx) {
            if (myChartMobile) myChartMobile.destroy();

            myChartMobile = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [{
                        data: [95, 5],
                        backgroundColor: ['rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)'],
                        borderColor: 'white',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        }
    }
}

function handleResize() {
    if (window.innerWidth >= 768) {
        loadDesktopChart();
    } else {
        loadMobileChart();
    }
}

handleResize();
window.addEventListener('resize', handleResize);

// Contract address copy-to-clipboard
window.addEventListener("DOMContentLoaded", function() {
    // Mobile - home section
    document.getElementById("contract-address-mobile-home").addEventListener("click", function() {
        copyTextToClipboard("contract-address-mobile-home", "toast-mobile-home");
    });
    document.getElementById("copy-btn-mobile-home").addEventListener("click", function() {
        copyTextToClipboard("contract-address-mobile-home", "toast-mobile-home");
    });

    // Mobile - tokenomics section
    const tokenomicsMobileAddress = document.getElementById("contract-address-tokenomics-mobile");
    if (tokenomicsMobileAddress) {
        tokenomicsMobileAddress.addEventListener("click", function() {
            copyTextToClipboard("contract-address-tokenomics-mobile", "toast-tokenomics-mobile");
        });
    }
    document.getElementById("copy-btn-tokenomics-mobile").addEventListener("click", function() {
        copyTextToClipboard("contract-address-tokenomics-mobile", "toast-tokenomics-mobile");
    });

    // Desktop - home section
    const desktopHomeAddress = document.getElementById("contract-address-desktop-home");
    if (desktopHomeAddress) {
        desktopHomeAddress.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-home", "toast-desktop-home");
        });
    }
    const desktopHomeCopyBtn = document.getElementById("copy-btn-desktop-home");
    if (desktopHomeCopyBtn) {
        desktopHomeCopyBtn.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-home", "toast-desktop-home");
        });
    }

    // Desktop - tokenomics section
    const desktopTokenomicsAddress = document.getElementById("contract-address-desktop-tokenomics");
    if (desktopTokenomicsAddress) {
        desktopTokenomicsAddress.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-tokenomics", "toast-desktop-tokenomics");
        });
    }
    const desktopTokenomicsCopyBtn = document.getElementById("copy-btn-desktop-tokenomics");
    if (desktopTokenomicsCopyBtn) {
        desktopTokenomicsCopyBtn.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-tokenomics", "toast-desktop-tokenomics");
        });
    }
});

function copyTextToClipboard(elementId, toastId) {
    const copyText = document.getElementById(elementId).textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText).then(function() {
            showToast(toastId);
        }).catch(function() {
            fallbackCopyText(copyText, toastId);
        });
    } else {
        fallbackCopyText(copyText, toastId);
    }
}

function fallbackCopyText(text, toastId) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast(toastId);
}

function showToast(toastId) {
    const toast = document.getElementById(toastId);
    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

// Gear hover animation
const gearElements = document.querySelectorAll('.img02, .img03, .img04');
gearElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        gearElements.forEach(el => el.classList.add('animated'));
    });
    element.addEventListener('mouseout', () => {
        gearElements.forEach(el => el.classList.remove('animated'));
    });
});

// Whitepaper reveal on terms acceptance
document.addEventListener('DOMContentLoaded', function() {
    const termsCheckbox = document.getElementById('termsCheckbox');
    const fullWhitepaper = document.getElementById('fullWhitepaper');
    const roadmapSection = document.getElementById('roadmap');
    const contactSection = document.getElementById('contact');

    fullWhitepaper.style.display = 'none';

    termsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            fullWhitepaper.style.display = 'block';

            setTimeout(function() {
                const whitepaperHeight = fullWhitepaper.scrollHeight;

                if (window.innerWidth >= 1200) {
                    roadmapSection.style.marginTop = (whitepaperHeight + 100) + 'px';
                }

                scrollToSectionWithOffset(fullWhitepaper, 30);
            }, 200);
        } else {
            fullWhitepaper.style.display = 'none';
            roadmapSection.style.marginTop = "0";
            contactSection.style.marginTop = "0";
        }
    });
});

function scrollToSectionWithOffset(element, offset) {
    const topPosition = element.getBoundingClientRect().top + window.scrollY;
    const scrollToPosition = topPosition - offset;
    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
}

function openTermsOfUse() {
    window.open('./pages/termsofuse.html', 'Terms Of Use', 'width=600,height=400,scrollbars=yes');
}
