/**
 * Option type for the date formatter
 */
export interface DateFormatterOptions {
    /**
     * day - option for the day representation in the date formatter
     */
    day?: 'numeric' | '2-digit';
    /**
     * month - option for the month representation in the date formatter
     */
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    /**
     * year - option for the year representation in the date formatter
     */
    year?: 'numeric' | '2-digit';
    /**
     * weekday - option for the weekday representation in the date formatter
     */
    weekday?: 'long' | 'short' | 'narrow';
    /**
     * locale - For different date formats
     */
    locale?: string;
}

/**
 * Types for the date formatter function
 */
export interface DateFormatter {
    /**
     * Date which need to be format
     */
    date: string;
    /**
     * Options - options given to the formatter
     */
    options?: DateFormatterOptions;
}
