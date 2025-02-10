const splashScreenEl = document.querySelector('div.splash-screen');
const turnOnOffSwitchEl = document.getElementById('turnOnOff');
const bulb = document.getElementById('bulb');

setTimeout(() => splashScreenEl.remove(), 3500);
turnOnOffSwitchEl.addEventListener('change', () => bulb.classList.toggle('on'));
