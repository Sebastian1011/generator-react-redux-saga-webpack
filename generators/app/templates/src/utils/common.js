import { isNumber } from 'lodash';

export function buildQueryParams(params) {
    if(!params) return '';
    return Object.keys(params)
        .reduce((paramStrArray, k) => {
            if(params[k] != 'undefined' && params[k] !== void 0) {
                paramStrArray.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            }
            return paramStrArray;
        }, []).join('&');
}

export function pick(obj, ...fields) {
    let res = {};
    for (let key of fields) {
        res[key] = obj[key];
    }

    return res;
}

export function hexToRgb(hex, alpha) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        const colors = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        if (isNumber(alpha)) {
            colors.push(alpha);
        }
        return "rgba(" + colors.join(",") + ")";
    }

    return null;
}