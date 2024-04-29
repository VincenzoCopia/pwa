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