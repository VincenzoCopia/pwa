const toggleBtn = document.getElementById('toggleButton');
toggleBtn.style.backgroundColor = 'DodgerBlue';
const img = document.getElementById('toggleImage');


toggleBtn.onclick = function () {
    if (img.style.visibility === 'hidden') {
        img.style.visibility = 'visible';
        toggleBtn.textContent = 'Nascondi';
    } else {
        img.style.visibility = 'hidden';
        toggleBtn.textContent = 'Mostra';
    }
};

const networkStatusBtn = document.getElementById('networkStatusBtn');

function updateNetworkStatus() {
    if (navigator.onLine) {
        networkStatusBtn.style.backgroundColor = 'green';
        networkStatusBtn.textContent = 'Online';
    } else {
        networkStatusBtn.style.backgroundColor = 'red';
        networkStatusBtn.textContent = 'Offline';
    }
}

// Aggiorna lo stato della rete all'avvio
updateNetworkStatus();

// Ascoltatori per gli eventi online e offline
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);


// Lettura NFC
const nfcMessageElement = document.getElementById('nfcMessage');

async function readNFC() {
    if ("NDEFReader" in window) {
        try {
            const reader = new NDEFReader();
            await reader.scan();
            nfcMessageElement.textContent = "Scan NFC avviato 2... Avvicina un tag!";
            console.log("Scan NFC avviato... Avvicina un tag!");
            
            reader.onreading = (event) => {
                nfcMessageElement.textContent = "Tag rilevato!";
                console.log("Tag rilevato!");
                nfcMessageElement.textContent = "UID del Tag:", event.serialNumber;
                console.log("UID del Tag:", event.serialNumber);
            };
        } catch (error) {
            nfcMessageElement.textContent = "Errore durante la lettura NFC:";
            console.error("Errore durante la lettura NFC:", error);
        }
    } else {
        nfcMessageElement.textContent = "Web NFC non supportato nel browser.";
        console.log("Web NFC non supportato nel browser.");
    }
}

readNFC();
