
import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
  RESET_SETTINGS
} from "./types";
import { defaultSettings } from '../store';

export const setAllowRegistration = (allowRegistration) => {
    // get and parse the setting from the local strage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // toggle the required setting
    // settings.allowRegistration = !settings.setDisableBalanceOnAdd;
    settings.allowRegistration = allowRegistration;

    // set updated settings back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: ALLOW_REGISTRATION,
        payload: allowRegistration
    };
}

export const setDisableBalanceOnAdd = (shouldDisable) => {
    // get and parse the setting from the local strage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // toggle the required setting
    // settings.disableBalanceOnAdd = !settings.setDisableBalanceOnAdd;
    settings.disableBalanceOnAdd = shouldDisable;

    // set updated settings back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: shouldDisable
    };
}

export const setDisableBalanceOnEdit = (shouldDisable) => {
    // get and parse the setting from the local strage
    const settings = JSON.parse(localStorage.getItem('settings'));
    // toggle the required setting
    // settings.disableBalanceOnEdit = !settings.setDisableBalanceOnAdd;
    settings.disableBalanceOnEdit = shouldDisable;

    // set updated settings back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: shouldDisable
    };
}

export const resetSettings= () => {
    // get the default settings from the store.js
    // set updated settings back to localStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));

    return {
        type: RESET_SETTINGS,
        payload: defaultSettings
    };
}