export type CarouselCardProps = {
    title: string;
    description: string;
    duration?: string;
    handleClick?: (title: string) => void;
    poster?: string;
    genre?: string[];
    language?: string[];
};
