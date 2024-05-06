export const isEmpty = (obj) => {
    if (obj === 'undefined') return true;
    if (obj === 'null') return true;
    if (obj === null) return true;
    if (obj === undefined) return true;
    if (obj === '') return true;
    if (obj === 0) return true;
    if (obj === false) return true;
    if (typeof obj === 'object' && Object.keys(obj).length === 0) return true;
    if (Array.isArray(obj) && obj.length === 0) return true;
    return false;
}