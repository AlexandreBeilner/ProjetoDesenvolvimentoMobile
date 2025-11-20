import {WIFI_IP} from '@env'

const VIA_USB_REVERSE = true;
const VIA_WIFI       = false;
const EMULATOR_ADB   = false;

export const API_URL =
  VIA_USB_REVERSE ? 'http://localhost:3000' :
    VIA_WIFI       ? `http://${WIFI_IP}:3000` :
      EMULATOR_ADB   ? 'http://10.0.2.2:3000' :
        'http://localhost:3000';