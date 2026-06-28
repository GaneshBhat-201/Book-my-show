export const formatToTime = (dateTime: string): string =>
    new Date(dateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
