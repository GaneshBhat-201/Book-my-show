export const extractCursor = (url: string | null) => {
    if (!url) return null;

    try {
        const u = new URL(url, import.meta.env.VITE_API_BASE_URL);
        return u.searchParams.get('cursor');
    } catch {
        return null;
    }
};
