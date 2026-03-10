// Conecta ao provedor da Binance Smart Chain
const bsc = "https://bsc-dataseed.binance.org/";
const web3 = new Web3(new Web3.providers.HttpProvider(bsc));

// Endereço dos contratos Chainlink Price Feed BNB/USD e ETH/USD na BSC
let bnbPriceFeedAddress = "0x0567F2323251f0AAB15c8DfB1967E4e8A7D42aeE"; // BNB/USD na BSC
let ethPriceFeedAddress = "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e"; // ETH/USD na BSC

// Converte os endereços para formato de checksum
bnbPriceFeedAddress = web3.utils.toChecksumAddress(bnbPriceFeedAddress);
ethPriceFeedAddress = web3.utils.toChecksumAddress(ethPriceFeedAddress);

// ABI do Chainlink Price Feed (simplificada para o que precisamos)
const priceFeedABI = [{
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
        { "name": "roundId", "type": "uint80" },
        { "name": "answer", "type": "int256" },
        { "name": "startedAt", "type": "uint256" },
        { "name": "updatedAt", "type": "uint256" },
        { "name": "answeredInRound", "type": "uint80" }
    ],
    "stateMutability": "view",
    "type": "function"
}];

// Variável global para armazenar o tipo atualmente selecionado
let selectedType = 'bnb';  // Define o valor padrão como 'bnb'

// Função para obter o preço de BNB e ETH via Chainlink
async function getPricesInUSD() {
    try {
        console.debug("Consultando preços de BNB/USD e ETH/USD via Chainlink...");

        const bnbPriceFeed = new web3.eth.Contract(priceFeedABI, bnbPriceFeedAddress);
        const ethPriceFeed = new web3.eth.Contract(priceFeedABI, ethPriceFeedAddress);

        // Consultas simultâneas para os preços de BNB e ETH
        const [bnbRoundData, ethRoundData] = await Promise.all([
            bnbPriceFeed.methods.latestRoundData().call(),
            ethPriceFeed.methods.latestRoundData().call()
        ]);

        const bnbPriceInUSD = bnbRoundData.answer / 1e8;
        const ethPriceInUSD = ethRoundData.answer / 1e8;

        console.debug(`Preço de BNB/USD: ${bnbPriceInUSD}, Preço de ETH/USD: ${ethPriceInUSD}`);
        return { bnb: bnbPriceInUSD, eth: ethPriceInUSD };

    } catch (error) {
        console.error("Erro ao obter o preço de BNB ou ETH via Chainlink:", error);
        return { bnb: 0, eth: 0 };  // Retorna 0 para evitar quebra
    }
}


// Endereços das carteiras
const wallet_addresses = {
    "sniperdao-revenue-share.bnb": "0x7251B462B0AaD290E699F465f2F7Ef06e14FD381",
    "sniperdao-operators-vault.bnb": "0x3E0D0999EbFBF2E23501d608955335F713716214",
    "sniperdao-liquidity.bnb": "0xF74B177A8Bc0FF81aA36040556c36B48aF590634",
    "sniperdao-ecosystem.bnb": "0xd9A9f5bFA0Cfd14D1Fd64a4a2c27161b790d33aF",
    "sniperdao-emergency-fund.bnb": "0xE40E9f4c386CD537C4F04b8668E7174B14Ee027B",
    "sniperdao-deployer.bnb": "0x8EEdc1EbE170bdFa25Aeea55cAf0231651c57038"
};

// Contrato ETH no BSC
const ethContractAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"; // ETH na BSC
const ethABI = [{
    "constant": true,
    "inputs": [{ "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
}];

// Função para obter os saldos em BNB e ETH
async function getWalletBalances() {
    let balances = {};
    const ethContract = new web3.eth.Contract(ethABI, ethContractAddress);

    // Cria uma array de promessas para as consultas de saldo de BNB e ETH
    const balancePromises = Object.keys(wallet_addresses).map(async (name) => {
        let address = wallet_addresses[name];
        console.debug(`Consultando saldo de BNB e ETH para o endereço: ${address}`);

        try {
            // Consulta saldo em BNB e ETH simultaneamente
            const [balanceWei, balanceEthWei] = await Promise.all([
                web3.eth.getBalance(address),
                ethContract.methods.balanceOf(address).call()
            ]);

            const balanceBNB = web3.utils.fromWei(balanceWei, 'ether');
            const balanceETH = web3.utils.fromWei(balanceEthWei, 'ether');
            console.debug(`Saldo de BNB para ${name}: ${balanceBNB}`);
            console.debug(`Saldo de ETH para ${name}: ${balanceETH}`);

            balances[name] = { bnb: parseFloat(balanceBNB).toFixed(3), eth: parseFloat(balanceETH).toFixed(3) };
        } catch (error) {
            console.error(`Erro ao consultar o saldo de ETH ou BNB para ${name}:`, error);
            balances[name] = { bnb: "Erro", eth: "Erro" };
        }
    });

    // Aguarda todas as promessas serem resolvidas
    await Promise.all(balancePromises);
    return balances;
}

// Função para exibir os saldos em BNB, ETH ou USD
async function displayWalletBalances(type = selectedType) {
    let balances = await getWalletBalances();
    let prices = await getPricesInUSD();  // Obtém os preços reais de BNB e ETH via Chainlink
    let orderedWalletNames = [
        "sniperdao-deployer.bnb",
        "sniperdao-operators-vault.bnb",
        "sniperdao-revenue-share.bnb",
        "sniperdao-ecosystem.bnb",
        "sniperdao-liquidity.bnb",
        "sniperdao-emergency-fund.bnb"
    ];
    let balanceMessage = "";
    let totalBNB = 0;
    let totalETH = 0;
    let totalUSD = 0;

    orderedWalletNames.forEach(name => {
        let { bnb, eth } = balances[name];
        let walletAddress = wallet_addresses[name];
        let walletLink = `https://bscscan.com/address/${walletAddress}`;

        // Acumula os saldos totais
        if (!isNaN(parseFloat(bnb))) {
            totalBNB += parseFloat(bnb);
        }
        if (!isNaN(parseFloat(eth))) {
            totalETH += parseFloat(eth);
        }

        if (type === 'bnb') {
            balanceMessage += `<div class="balance-row">
                <div class="wallet-name">
                    <a href="${walletLink}" target="_blank">${name}:</a>
                </div>
                <div class="balance-amount">
                    <p>${bnb} BNB</p>
                </div>
            </div>`;
        } else if (type === 'eth') {
            balanceMessage += `<div class="balance-row">
                <div class="wallet-name">
                    <a href="${walletLink}" target="_blank">${name}:</a>
                </div>
                <div class="balance-amount">
                    <p>${eth} ETH</p>
                </div>
            </div>`;
        } else if (type === 'usd') {
            let balanceInUSD = 0;
            if (!isNaN(parseFloat(bnb)) && !isNaN(parseFloat(eth))) {
                balanceInUSD = (parseFloat(bnb) * prices.bnb) + (parseFloat(eth) * prices.eth);
                totalUSD += balanceInUSD;
            }
            balanceMessage += `<div class="balance-row">
                <div class="wallet-name">
                    <a href="${walletLink}" target="_blank">${name}:</a>
                </div>
                <div class="balance-amount">
                    <p>$${balanceInUSD.toFixed(2)} USD</p>
                </div>
            </div>`;
        }
    });

    // Adiciona a linha de saldo total no final
    balanceMessage += `<div class="balance-row total-balance">
    <div class="wallet-name">Total Balance:</div>
    <div class="balance-amount">`;

    if (type === 'bnb') {
        balanceMessage += `${totalBNB.toFixed(3)} BNB`;
    } else if (type === 'eth') {
        balanceMessage += `${totalETH.toFixed(3)} ETH`;
    } else if (type === 'usd') {
        balanceMessage += `$${totalUSD.toFixed(2)} USD`;
    }

    balanceMessage += `</div></div>`;


    document.getElementById('balanceDisplay').innerHTML = balanceMessage;
}


// Alterna entre os tipos de visualização (BNB, ETH ou USD)
function handleButtonClick(type) {
    selectedType = type;  // Atualiza o tipo selecionado globalmente
    displayWalletBalances(type);

    // Remove a classe 'selected' de todos os botões
    document.querySelectorAll('.toggle-button').forEach(button => button.classList.remove('selected'));

    // Adiciona a classe 'selected' ao botão correto com base no tipo
    let buttonId;
    if (type === 'bnb') {
        buttonId = 'bnbBalanceButton';
    } else if (type === 'eth') {
        buttonId = 'ethBalanceButton';
    } else if (type === 'usd') {
        buttonId = 'usdTotalButton';
    }

    const selectedButton = document.getElementById(buttonId);
    if (selectedButton) {
        selectedButton.classList.add('selected');
        console.log(`Botão ${type} selecionado e classe 'selected' aplicada.`);
    } else {
        console.error(`Botão ${type}BalanceButton não encontrado.`);
    }
}


// Função para abrir/fechar o painel de saldo ao vivo
function toggleLiveBalanceDisplay() {
    const liveBalancePanel = document.getElementById('live-balance-panel');
    const panelStyle = window.getComputedStyle(liveBalancePanel);

    if (panelStyle.display === 'none') {
        liveBalancePanel.style.display = 'block';
        displayWalletBalances(selectedType); // Exibe o saldo inicial com base no tipo selecionado
        window.liveBalanceInterval = setInterval(() => displayWalletBalances(selectedType), 30000); // Atualiza a cada 30 segundos
    } else {
        liveBalancePanel.style.display = 'none';
        clearInterval(window.liveBalanceInterval); // Parar a atualização automática quando o painel é fechado
    }
}

// Evento para garantir que o DOM seja carregado antes de qualquer manipulação
document.addEventListener('DOMContentLoaded', function () {
    const liveBalanceLink = document.getElementById('openLiveBalance');
    const liveBalanceMobileLink = document.getElementById('openLiveBalanceMobile');

    const bnbButton = document.getElementById('bnbBalanceButton');
    const ethButton = document.getElementById('ethBalanceButton');
    const usdButton = document.getElementById('usdTotalButton');

    // Adiciona eventos de clique para os botões de alternância de saldo
    if (bnbButton && ethButton && usdButton) {
        bnbButton.addEventListener('click', () => handleButtonClick('bnb'));
        ethButton.addEventListener('click', () => handleButtonClick('eth'));
        usdButton.addEventListener('click', () => handleButtonClick('usd'));
    } else {
        console.error("Os botões de alternância de saldo não foram encontrados.");
    }

    // Eventos para abrir o painel de live balance
    if (liveBalanceLink) {
        liveBalanceLink.addEventListener('click', toggleLiveBalanceDisplay);
    } else {
        console.error("O link 'openLiveBalance' não foi encontrado.");
    }

    if (liveBalanceMobileLink) {
        liveBalanceMobileLink.addEventListener('click', toggleLiveBalanceDisplay);
    } else {
        console.error("O link 'openLiveBalanceMobile' não foi encontrado.");
    }

    // Exibe o saldo inicial em BNB quando a página carrega
    displayWalletBalances(selectedType);
});
