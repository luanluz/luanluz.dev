import { pick } from './common.js';

export function initStatusBar() {
  var cellLevels = [
    'ph-cell-signal-full',
    'ph-cell-signal-high',
    'ph-cell-signal-medium',
    'ph-cell-signal-low',
  ];
  var wifiLevels = [
    'ph-wifi-high',
    'ph-wifi-medium',
    'ph-wifi-low',
  ];
  var batteryLevels = [
    'ph-battery-full',
    'ph-battery-high',
    'ph-battery-medium',
    'ph-battery-low',
    'ph-battery-charging'
  ];
  document.getElementById('status-cell').className = 'ph-fill ' + pick(cellLevels);
  document.getElementById('status-wifi').className = 'ph-fill ' + pick(wifiLevels);
  document.getElementById('status-battery').className = 'ph-fill ' + pick(batteryLevels);

  function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('status-time').textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 1000);
}
