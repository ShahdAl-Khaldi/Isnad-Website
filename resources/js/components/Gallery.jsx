import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { EmptyState } from './Bits';
import { cn } from '../lib/cn';

export function Gallery({ items = [], limit }) {
    const list = limit ? items.slice(0, limit) : items;
    if (list.length === 0) {
        return (
            <EmptyState icon="image" title="Photos are on their way">
                We only share authentic photographs of ISNAD’s spaces and activities. This gallery will grow as images are prepared and consent is confirmed.
            </EmptyState>
        );
    }
    return (
        <ul className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-3 md:gap-4">
            {list.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 3) * 0.06}
                    className={cn('group relative overflow-hidden rounded-card', i % 5 === 0 && 'md:row-span-2', i === 0 && 'col-span-2 md:col-span-1')}>
                    <figure className="h-full">
                        <Photo image={item.image} className="h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12 text-sm text-white">
                            <span className="block text-sm font-medium text-blue">{item.category}</span>
                            {item.caption}
                        </figcaption>
                    </figure>
                </Reveal>
            ))}
        </ul>
    );
}
