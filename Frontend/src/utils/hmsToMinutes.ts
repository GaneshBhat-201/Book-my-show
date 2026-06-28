/**
 * converts hh:mm:ss to minutes
 * @param {string} hmsString - hh:mm:ss
 */
export const hmsToMinutes = (hmsString: string) => {
    if (!hmsString || typeof hmsString !== 'string') {
        return 0;
    }

    const [hours, minutes, seconds] = hmsString.split(':');

    const h = +hours || 0;
    const m = +minutes || 0;
    const s = +seconds || 0;

    const totalMinutes = h * 60 + m + s / 60;

    return `${Math.floor(totalMinutes)} min`;
};
