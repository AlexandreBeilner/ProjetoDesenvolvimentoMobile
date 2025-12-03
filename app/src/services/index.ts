const VIA_USB_REVERSE = false;
const VIA_WIFI       = true;
const EMULATOR_ADB   = false;

export const API_URL =
  VIA_USB_REVERSE ? 'http://localhost:3000/api' :
    VIA_WIFI       ? `http://192.168.2.25:3000/api` :
      EMULATOR_ADB   ? 'http://10.0.2.2:3000/api' :
        'http://localhost:3000/api';