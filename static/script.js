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
const startNFCScanButton = document.getElementById('startNFCScanButton');

async function readNFC() {
    if ("NDEFReader" in window) {
        try {
            // Richiedo il permesso NFC
            const permissionStatus = await navigator.permissions.query({ name: "nfc" });
            
            if (permissionStatus.state === "denied") {
                nfcMessageElement.textContent = "Permesso NFC negato. Abilita l'NFC nelle impostazioni del browser.";
                return;
            }

            const reader = new NDEFReader();
            await reader.scan();
            nfcMessageElement.textContent = "Scan NFC avviato... Avvicina un tag!";
            
            reader.onreading = (event) => {
                nfcMessageElement.textContent = `Tag rilevato! UID: ${event.serialNumber}`;
            };

            reader.onerror = (error) => {
                nfcMessageElement.textContent = `Errore NFC: ${error.message}`;
            };

        } catch (error) {
            if (error.name === "NotAllowedError") {
                nfcMessageElement.textContent = "Per favore, concedi il permesso per utilizzare l'NFC quando richiesto dal browser";
            } else {
                nfcMessageElement.textContent = `Errore durante la lettura NFC: ${error.message}`;
            }
            console.error("Errore NFC:", error);
        }
    } else {
        nfcMessageElement.textContent = "Web NFC non supportato in questo browser";
    }
}

startNFCScanButton.onclick = readNFC;
