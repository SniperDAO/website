// Connects to the Binance Smart Chain provider
const bscProvider = "https://bsc-dataseed.binance.org/";
const web3 = new Web3(new Web3.providers.HttpProvider(bscProvider));

// Chainlink Price Feed contract addresses (BNB/USD and ETH/USD on BSC)
const bnbPriceFeedAddress = web3.utils.toChecksumAddress("0x0567F2323251f0AAB15c8DfB1967E4e8A7D42aeE");
const ethPriceFeedAddress = web3.utils.toChecksumAddress("0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e");

// Chainlink Price Feed ABI (simplified)
const PRICE_FEED_ABI = [{
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

// Currently selected display type
let selectedType = 'bnb';

// Fetches BNB and ETH prices in USD via Chainlink
async function getPricesInUSD() {
    try {
        const bnbPriceFeed = new web3.eth.Contract(PRICE_FEED_ABI, bnbPriceFeedAddress);
        const ethPriceFeed = new web3.eth.Contract(PRICE_FEED_ABI, ethPriceFeedAddress);

        const [bnbRoundData, ethRoundData] = await Promise.all([
            bnbPriceFeed.methods.latestRoundData().call(),
            ethPriceFeed.methods.latestRoundData().call()
        ]);

        const bnbPriceInUSD = bnbRoundData.answer / 1e8;
        const ethPriceInUSD = ethRoundData.answer / 1e8;

        return { bnb: bnbPriceInUSD, eth: ethPriceInUSD };

    } catch (error) {
        console.error("Error fetching BNB/ETH prices from Chainlink:", error);
        return { bnb: 0, eth: 0 };
    }
}

// Wallet addresses
const walletAddresses = {
    "sniperdao-revenue-share.bnb": "0x7251B462B0AaD290E699F465f2F7Ef06e14FD381",
    "sniperdao-operators-vault.bnb": "0x3E0D0999EbFBF2E23501d608955335F713716214",
    "sniperdao-liquidity.bnb": "0xF74B177A8Bc0FF81aA36040556c36B48aF590634",
    "sniperdao-ecosystem.bnb": "0xd9A9f5bFA0Cfd14D1Fd64a4a2c27161b790d33aF",
    "sniperdao-emergency-fund.bnb": "0xE40E9f4c386CD537C4F04b8668E7174B14Ee027B",
    "sniperdao-deployer.bnb": "0x8EEdc1EbE170bdFa25Aeea55cAf0231651c57038"
};

// ETH token contract on BSC
const ethContractAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";
const ETH_ABI = [{
    "constant": true,
    "inputs": [{ "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
}];

// Fetches BNB and ETH balances for all wallets
async function getWalletBalances() {
    const balances = {};
    const ethContract = new web3.eth.Contract(ETH_ABI, ethContractAddress);

    const balancePromises = Object.keys(walletAddresses).map(async (name) => {
        const address = walletAddresses[name];

        try {
            const [balanceWei, balanceEthWei] = await Promise.all([
                web3.eth.getBalance(address),
                ethContract.methods.balanceOf(address).call()
            ]);

            const balanceBNB = web3.utils.fromWei(balanceWei, 'ether');
            const balanceETH = web3.utils.fromWei(balanceEthWei, 'ether');

            balances[name] = {
                bnb: parseFloat(balanceBNB).toFixed(3),
                eth: parseFloat(balanceETH).toFixed(3)
            };
        } catch (error) {
            console.error(`Error fetching balance for ${name}:`, error);
            balances[name] = { bnb: "Error", eth: "Error" };
        }
    });

    await Promise.all(balancePromises);
    return balances;
}

// Renders wallet balances in the panel (BNB, ETH, or USD)
async function displayWalletBalances(type = selectedType) {
    const balances = await getWalletBalances();
    const prices = await getPricesInUSD();

    const orderedWalletNames = [
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
        const { bnb, eth } = balances[name];
        const walletAddress = walletAddresses[name];
        const walletLink = `https://bscscan.com/address/${walletAddress}`;

        if (!isNaN(parseFloat(bnb))) totalBNB += parseFloat(bnb);
        if (!isNaN(parseFloat(eth))) totalETH += parseFloat(eth);

        if (type === 'bnb') {
            balanceMessage += `<div class="balance-row">
                <div class="wallet-name"><a href="${walletLink}" target="_blank">${name}:</a></div>
                <div class="balance-amount"><p>${bnb} BNB</p></div>
            </div>`;
        } else if (type === 'eth') {
            balanceMessage += `<div class="balance-row">
                <div class="wallet-name"><a href="${walletLink}" target="_blank">${name}:</a></div>
                <div class="balance-amount"><p>${eth} ETH</p></div>
            </div>`;
        } else if (type === 'usd') {
            let balanceInUSD = 0;
            if (!isNaN(parseFloat(bnb)) && !isNaN(parseFloat(eth))) {
                balanceInUSD = (parseFloat(bnb) * prices.bnb) + (parseFloat(eth) * prices.eth);
                totalUSD += balanceInUSD;
            }
            balanceMessage += `<div class="balance-row">
                <div class="wallet-name"><a href="${walletLink}" target="_blank">${name}:</a></div>
                <div class="balance-amount"><p>$${balanceInUSD.toFixed(2)} USD</p></div>
            </div>`;
        }
    });

    // Total balance row
    let totalValue = '';
    if (type === 'bnb') totalValue = `${totalBNB.toFixed(3)} BNB`;
    else if (type === 'eth') totalValue = `${totalETH.toFixed(3)} ETH`;
    else if (type === 'usd') totalValue = `$${totalUSD.toFixed(2)} USD`;

    balanceMessage += `<div class="balance-row total-balance">
        <div class="wallet-name">Total Balance:</div>
        <div class="balance-amount">${totalValue}</div>
    </div>`;

    document.getElementById('balanceDisplay').innerHTML = balanceMessage;
}

// Handles BNB/ETH/USD toggle button click
function handleButtonClick(type) {
    selectedType = type;
    displayWalletBalances(type);

    document.querySelectorAll('.toggle-button').forEach(button => button.classList.remove('selected'));

    const buttonIds = { bnb: 'bnbBalanceButton', eth: 'ethBalanceButton', usd: 'usdTotalButton' };
    const selectedButton = document.getElementById(buttonIds[type]);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    } else {
        console.error(`Toggle button for type "${type}" not found.`);
    }
}

// Toggles the live balance panel open/closed
function toggleLiveBalanceDisplay() {
    const liveBalancePanel = document.getElementById('live-balance-panel');
    const panelStyle = window.getComputedStyle(liveBalancePanel);

    if (panelStyle.display === 'none') {
        liveBalancePanel.style.display = 'block';
        displayWalletBalances(selectedType);
        window.liveBalanceInterval = setInterval(() => displayWalletBalances(selectedType), 30000);
    } else {
        liveBalancePanel.style.display = 'none';
        clearInterval(window.liveBalanceInterval);
    }
}

// Initialize event listeners after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const liveBalanceLink = document.getElementById('openLiveBalance');
    const liveBalanceMobileLink = document.getElementById('openLiveBalanceMobile');
    const bnbButton = document.getElementById('bnbBalanceButton');
    const ethButton = document.getElementById('ethBalanceButton');
    const usdButton = document.getElementById('usdTotalButton');

    if (bnbButton && ethButton && usdButton) {
        bnbButton.addEventListener('click', () => handleButtonClick('bnb'));
        ethButton.addEventListener('click', () => handleButtonClick('eth'));
        usdButton.addEventListener('click', () => handleButtonClick('usd'));
    } else {
        console.error("Balance toggle buttons not found.");
    }

    if (liveBalanceLink) {
        liveBalanceLink.addEventListener('click', toggleLiveBalanceDisplay);
    } else {
        console.error("Element 'openLiveBalance' not found.");
    }

    if (liveBalanceMobileLink) {
        liveBalanceMobileLink.addEventListener('click', toggleLiveBalanceDisplay);
    } else {
        console.error("Element 'openLiveBalanceMobile' not found.");
    }

    displayWalletBalances(selectedType);
});
