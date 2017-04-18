import crypto from 'crypto';
import * as base64 from 'urlsafe-base64';
import { remote } from 'electron';
import { CONSTANTS } from '../constants';
import sodium from 'libsodium-wrappers';

export const getAuthData = () => {
  let authData = window.JSON.parse(
    window.localStorage.getItem(CONSTANTS.LOCAL_AUTH_DATA_KEY)
  );
  return authData;
};

export const saveAuthData = (authData) => {
  return window.localStorage.setItem(CONSTANTS.LOCAL_AUTH_DATA_KEY,
    window.JSON.stringify(authData)
  );
};

export const hashPublicId = publicId => {
  return crypto.createHash('sha256').update(publicId).digest();
};

export const showError = (title, errMsg) => {
  remote.dialog.showMessageBox({
    type: 'error',
    buttons: ['Ok'],
    title,
    message: errMsg
  }, _ => {});
};

export const showSuccess = (title, message) => {
  remote.dialog.showMessageBox({
    type: 'info',
    buttons: ['Ok'],
    title,
    message
  }, _ => {});
};

export const genKeyPair = () => {
  let {keyType, privateKey, publicKey} = sodium.crypto_box_keypair('hex');
  return {privateKey, publicKey};
}

export const encrypt = (input, pk) => sodium.crypto_box_seal(input, Buffer.from(pk, 'hex'), 'hex');

export const decrypt = (cipherMsg, sk, pk) => sodium.crypto_box_seal_open(
                              Buffer.from(cipherMsg, 'hex'),
                              Buffer.from(pk, 'hex'),
                              Buffer.from(sk, 'hex'),
                              'text');
