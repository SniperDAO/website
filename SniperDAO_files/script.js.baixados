
// Menu hamburger da navbar
// Menu hamburger da navbar

// Variável de controle para evitar fechar logo após abrir
let justOpenedHamburger = false;

function toggleHamburgerMenu() {
    console.log("toggleHamburgerMenu chamado"); // Para debug
    var menuContent = document.querySelector('.hamburger-menu-content');
    menuContent.classList.toggle('active');
    justOpenedHamburger = true; // Marca que o menu acabou de ser aberto
}

// Menu hamburguer do download files whitepaper
// Variável de controle para evitar fechar logo após abrir (navbar e download)
let justOpenedNavbarMenu = false;
let justOpenedDownloadMenu = false;

// Função para o menu da navbar (menu hambúrguer)
function toggleNavbarMenu() {
    var menuContent = document.querySelector('.hamburger-menu-content');
    
    if (menuContent) {
        menuContent.classList.toggle('active');
        justOpenedNavbarMenu = true; // Marca que o menu acabou de ser aberto
        console.log("Classe 'active' aplicada ao menu navbar:", menuContent.classList.contains('active'));
    } else {
        console.error("Menu de navegação não encontrado!");
    }
}

// Função para o menu de download (mobile)
function toggleDownloadMenu() {
    console.log("toggleDownloadMenu chamado");  // Para debug
    
    // Menu de download para mobile
    var menuMobile = document.getElementById('hamburger-downloadwp-mobile');
    
    // Verifica se o menu mobile existe e alterna seu estado
    if (menuMobile) {
        menuMobile.classList.toggle('active');
        justOpenedDownloadMenu = true; // Marca que o menu acabou de ser aberto
        console.log("Classe 'active' aplicada ao menu download mobile:", menuMobile.classList.contains('active'));
    } else {
        console.error('Elemento #hamburger-downloadwp-mobile não encontrado!');
    }
}

// Fechar os menus ao clicar fora deles
document.addEventListener('click', function(event) {
    // Para o menu de navegação (navbar)
    var menuContent = document.querySelector('.hamburger-menu-content');
    var hamburgerButton = document.getElementById('hamburger-menu');

    if (menuContent && menuContent.classList.contains('active')) {
        const isClickOutsideMenu = !menuContent.contains(event.target);
        const isClickOnHamburgerButton = hamburgerButton.contains(event.target);

        // Evita fechar imediatamente após abrir o menu navbar
        if (justOpenedNavbarMenu) {
            justOpenedNavbarMenu = false; // Reseta o estado após o primeiro clique
            return; // Sai da função para não fechar o menu
        }

        // Fecha o menu navbar se o clique for fora do menu e do botão
        if (isClickOutsideMenu && !isClickOnHamburgerButton) {
            menuContent.classList.remove('active');
        }
    }

    // Para o menu de download (mobile)
    var downloadMenuMobile = document.getElementById('hamburger-downloadwp-mobile');
    var downloadButton = document.getElementById('downloadwp');

    // Verifica se o clique foi no botão de download
    const isClickOnDownloadButton = downloadButton ? downloadButton.contains(event.target) : false;

    // Verifica se o menu de download mobile está aberto e fecha ao clicar fora
    if (downloadMenuMobile && downloadMenuMobile.classList.contains('active')) {
        const isClickOutsideDownloadMenuMobile = !downloadMenuMobile.contains(event.target);
        const isClickOnDownloadLink = event.target.closest('a');

        // Evita fechar imediatamente após abrir o menu de download
        if (justOpenedDownloadMenu) {
            justOpenedDownloadMenu = false; // Reseta o estado após o primeiro clique
            return; // Sai da função para não fechar o menu
        }

        // Fecha o menu de download mobile se o clique for fora dele e não em um link ou botão
        if (isClickOutsideDownloadMenuMobile && !isClickOnDownloadLink && !isClickOnDownloadButton) {
            downloadMenuMobile.classList.remove('active');
        }
    }
});



// Código para ajustar a rolagem suave das seções da navbar
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Captura o valor de offset do data-attribute ou usa um valor padrão
            var customOffset = parseInt(this.getAttribute('data-offset')) || 0;
            
            // Calcula a posição da seção ajustada pelo offset
            var topOffset = targetElement.getBoundingClientRect().top + window.scrollY - customOffset;

            // Realiza o scroll suave para a posição calculada
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    });
});

// Código para ajustar a rolagem suave das seções no menu hambúrguer
document.querySelectorAll('.hamburger-menu-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Captura o valor de offset do data-attribute ou usa um valor padrão de 0
            var customOffset = parseInt(this.getAttribute('data-offset')) || 0;
            
            // Calcula a posição da seção ajustada pelo offset
            var topOffset = targetElement.getBoundingClientRect().top + window.scrollY - customOffset;

            // Realiza o scroll suave para a posição calculada
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });

            // Fecha o menu após o clique no link (opcional para mobile)
            document.querySelector('.hamburger-menu-content').classList.remove('active');
        }
    });
});
// GRAFICOS DE PIZZA TOKENOMICS
// GRAFICOS DE PIZZA TOKENOMICS
// GRAFICOS DE PIZZA TOKENOMICS
window.onload = function() {
    // Detecta a largura da janela para decidir entre mobile ou desktop
    if (window.innerWidth >= 768) {
        // Executa o script para Desktop
        loadDesktopChart();
    } else {
        // Mantém o script para Mobile funcionando como está
        loadMobileChart();
    }
};

var myChartDesktop;  // Variável para armazenar o gráfico desktop
var myChartMobile;   // Variável para armazenar o gráfico mobile

// Função para carregar gráfico desktop
function loadDesktopChart() {
    var canvasElement = document.getElementById('myChartdesktop');  // Certifique-se de que o ID seja 'myChartdesktop'
    if (canvasElement) {
        var ctx = canvasElement.getContext('2d');
        if (ctx) {
            if (myChartDesktop) {
                myChartDesktop.destroy();  // Destrói o gráfico anterior para recriar
            }

            myChartDesktop = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Liquidity', 'Team'],
                    datasets: [{
                        label: 'Total supply 10.000.000',
                        data: [95, 5],
                        backgroundColor: [
                            'rgba(0, 0, 0, 1)', 
                            'rgba(255, 255, 255, 1)'
                        ],
                        borderColor: 'white',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,  // Responsividade ativada
                    maintainAspectRatio: false,  // Permitir que o canvas ajuste sua proporção
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'white',
                                font: {
                                    size: 15,  // Tamanho absoluto em px
                                    family: "'Orbitron', sans-serif"
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: ['TOTAL SUPPLY:', '10.000.000 (10M)'],
                            color: 'white',
                            font: {
                                size: 16,  // Tamanho absoluto em px
                                family: "'Orbitron', sans-serif"
                            },
                            padding: {
                                bottom: 20
                            },
                            align: 'center'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    var label = context.label || '';
                                    var value = context.raw || 0;
            
                                    // Formatação personalizada
                                    return label + ': ' + value + '% of total supply';
                                }
                            },
                            // Estilo personalizado para a tooltip
                            titleFont: {
                                size: 14,
                                family: "'Orbitron', sans-serif"
                            },
                            bodyFont: {
                                size: 12,
                                family: "'Orbitron', sans-serif"
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Cor de fundo da tooltip
                            borderColor: 'white',
                            borderWidth: 1
                        }
                    }
                }
            });
            
        }
    }
}

// Função para carregar gráfico mobile (inalterado)
function loadMobileChart() {
    var canvasElement = document.getElementById('myChartMobile');
    if (canvasElement) {
        var ctx = canvasElement.getContext('2d');
        if (ctx) {
            if (myChartMobile) {
                myChartMobile.destroy();  // Destrói o gráfico anterior para recriar
            }

            myChartMobile = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [{
                        data: [95, 5],
                        backgroundColor: [
                            'rgba(0, 0, 0, 1)', 
                            'rgba(255, 255, 255, 1)'
                        ],
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

// Função para detectar redimensionamento da tela
function handleResize() {
    // Verifica se estamos no modo desktop ou mobile e recarrega o gráfico
    if (window.innerWidth >= 768) {
        loadDesktopChart();  // Recarrega o gráfico para desktop
    } else {
        loadMobileChart();  // Mantém o mobile funcionando como está
    }
}

// Chama a função de resize ao iniciar
handleResize();

// Event listener para redimensionamento da tela (zoom ou alteração de tamanho)
window.addEventListener('resize', handleResize);

// Sessao de click e copy
// Sessao de click e copy
// Sessao de click e copy
// Adiciona os eventos de clique após o carregamento completo da página
window.addEventListener("DOMContentLoaded", function() {
    // ----- MOBILE -----
    
    // Seção "home" mobile
    document.getElementById("contract-address-mobile-home").addEventListener("click", function() {
        copyTextToClipboard("contract-address-mobile-home", "toast-mobile-home");
    });

    document.getElementById("copy-btn-mobile-home").addEventListener("click", function() {
        copyTextToClipboard("contract-address-mobile-home", "toast-mobile-home");
    });

    // Seção "tokenomics" mobile
    var tokenomicsMobileContractAddress = document.getElementById("contract-address-tokenomics-mobile");
    if (tokenomicsMobileContractAddress) {
        tokenomicsMobileContractAddress.addEventListener("click", function() {
            copyTextToClipboard("contract-address-tokenomics-mobile", "toast-tokenomics-mobile");
        });
    }

    document.getElementById("copy-btn-tokenomics-mobile").addEventListener("click", function() {
        copyTextToClipboard("contract-address-tokenomics-mobile", "toast-tokenomics-mobile");
    });

    // ----- DESKTOP -----
    
    // Seção "home" desktop
    var desktopHomeContractAddress = document.getElementById("contract-address-desktop-home");
    if (desktopHomeContractAddress) {
        desktopHomeContractAddress.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-home", "toast-desktop-home");
        });
    }

    var desktopHomeCopyButton = document.getElementById("copy-btn-desktop-home");
    if (desktopHomeCopyButton) {
        desktopHomeCopyButton.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-home", "toast-desktop-home");
        });
    }

    // Seção "tokenomics" desktop
    var tokenomicsDesktopContractAddress = document.getElementById("contract-address-desktop-tokenomics");
    if (tokenomicsDesktopContractAddress) {
        tokenomicsDesktopContractAddress.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-tokenomics", "toast-desktop-tokenomics");
        });
    }

    var tokenomicsDesktopCopyButton = document.getElementById("copy-btn-desktop-tokenomics");
    if (tokenomicsDesktopCopyButton) {
        tokenomicsDesktopCopyButton.addEventListener("click", function() {
            copyTextToClipboard("contract-address-desktop-tokenomics", "toast-desktop-tokenomics");
        });
    }
});

// Função de copiar o texto para o clipboard (mesma para todas as seções)
function copyTextToClipboard(elementId, toastId) {
    var copyText = document.getElementById(elementId).textContent;
    console.log("Copying text:", copyText); // Debug

    // Verifica se a API Clipboard está disponível
    if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText).then(function() {
            showToast(toastId);
        }).catch(function(err) {
            fallbackCopyText(copyText, toastId);
        });
    } else {
        fallbackCopyText(copyText, toastId);
    }
}

// Fallback para navegadores que não suportam a API Clipboard
function fallbackCopyText(copyText, toastId) {
    var textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast(toastId);
}

// Função para mostrar o toast (adapta para todas as seções)
function showToast(toastId) {
    var toast = document.getElementById(toastId);
    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}




/*hover das engrenagens*/
/*hover das engrenagens*/

const elements = document.querySelectorAll('.img02, .img03, .img04');
elements.forEach(element => {
    element.addEventListener('mouseover', () => {
        elements.forEach(el => el.classList.add('animated'));
    });
    element.addEventListener('mouseout', () => {
        elements.forEach(el => el.classList.remove('animated'));
    });
});

/*full whitepaper text*/
/*full whitepaper text*/
document.addEventListener('DOMContentLoaded', function() {
    var termsCheckbox = document.getElementById('termsCheckbox');
    var fullWhitepaper = document.getElementById('fullWhitepaper');
    var roadmapSection = document.getElementById('roadmap');
    var contactSection = document.getElementById('contact');

    // Inicializa o whitepaper como oculto
    fullWhitepaper.style.display = 'none';

    termsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Exibe o whitepaper e faz o layout ajustar
            fullWhitepaper.style.display = 'block';
    
            // Adiciona um pequeno atraso para calcular a altura corretamente
            setTimeout(function() {
                var fullWhitepaperHeight = fullWhitepaper.scrollHeight;
    
                // Verifica a altura do whitepaper
                console.log("Altura do Whitepaper: " + fullWhitepaperHeight);
    
                // Apenas aplica o espaçamento extra para desktop
                if (window.innerWidth >= 1200) {  // Apenas para telas maiores (desktop)
                    roadmapSection.style.marginTop = (fullWhitepaperHeight + 100) + 'px';
                }
    
                // Rola suavemente para o whitepaper
                scrollToSectionWithOffset(fullWhitepaper, 30);
            }, 200);
        } else {
            // Oculta o whitepaper
            fullWhitepaper.style.display = 'none';
    
            // Reseta o layout quando o whitepaper é oculto
            roadmapSection.style.marginTop = "0";
            contactSection.style.marginTop = "0";
        }
    });
    
});

// Função para fazer o scroll suave
function scrollToSectionWithOffset(element, offset) {
    var topPosition = element.getBoundingClientRect().top + window.scrollY;
    var scrollToPosition = topPosition - offset;
    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
}



//pop up  terms of use//
function openTermsOfUse() {
    window.open('termsOfUse.html', 'Terms Of Use', 'width=600,height=400,scrollbars=yes');
}







