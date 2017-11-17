import moment from 'moment';

export function getUnixTimestamp(date) {
    return Math.round((date || new Date()).getTime() / 1000);
}