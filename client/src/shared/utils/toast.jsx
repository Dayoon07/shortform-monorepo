export function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.innerHTML = message;
    toast.style.position = 'absolute';
    toast.style.left = '50%';
    toast.style.top = '50px';
    toast.style.transform = 'translate(-50%, -20px)';
    toast.style.backgroundColor = 'rgb(22, 163, 74)';
    toast.className = 'text-white px-10 py-2 rounded shadow-md z-50 text-center';

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), duration);
}