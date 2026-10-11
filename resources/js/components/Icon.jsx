import {
    ArrowRight, BookOpen, Building2, CircleAlert, CircleCheck, Clock, Compass, Download, ExternalLink, FileText,
    GraduationCap, Handshake, HeartHandshake, Image, Laptop, Layers, Lightbulb, Lock, Mail, MapPin, Megaphone,
    MessageCircle, MousePointerClick, Newspaper, Phone, Receipt, ShieldCheck, Sprout, Users, Wifi, Wrench, Zap,
} from 'lucide-react';

/** Content files (PHP) refer to icons by these short names. */
const icons = {
    arrow: ArrowRight, book: BookOpen, building: Building2, alert: CircleAlert, success: CircleCheck, clock: Clock,
    compass: Compass, download: Download, external: ExternalLink, file: FileText, graduation: GraduationCap,
    handshake: Handshake, heart: HeartHandshake, image: Image, laptop: Laptop, layers: Layers, lightbulb: Lightbulb,
    lock: Lock, mail: Mail, map: MapPin, megaphone: Megaphone, message: MessageCircle, pointer: MousePointerClick,
    news: Newspaper, phone: Phone, receipt: Receipt, shield: ShieldCheck, sprout: Sprout, users: Users, wifi: Wifi,
    wrench: Wrench, zap: Zap,
};

export function Icon({ name, className = 'size-5', strokeWidth = 1.6 }) {
    const Cmp = icons[name] ?? Image;
    return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
