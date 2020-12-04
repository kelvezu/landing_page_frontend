import { MIN_CHAR, MAX_CHAR, MIN_PASSWORD, MAX_PASSWORD } from '@/constants';

export const fieldRequired = val => !!val || 'Field is required'

export const min = (val) =>
    (val && val.length >= MIN_CHAR) ||
    `Minimum of ${MIN_CHAR} characters`

export const max = (val) =>
    (val && val.length <= MAX_CHAR) ||
    `Maximum of ${MAX_CHAR} characters`

export const validateEmail = (val) =>
    !!val ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{23})+$/.test(val) ||
    'E-mail must be valid'

export const passwordMin = (val) =>
    (val && val.length >= MIN_PASSWORD) ||
    `Minimum of ${MIN_PASSWORD} characters`

export const passwordMax = (val) =>
    (val && val.length <= MAX_PASSWORD) ||
    `Maximum of ${MAX_PASSWORD} characters`


