import { Reveal } from './Reveal';
import { useContent } from '../lib/site';

export function Team() {
    const team = useContent('team').team ?? [];
    return (
        <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {team.map((m, i) => (
                <Reveal as="li" key={m.name} delay={i * 0.08} >
                    <figure className="group">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#d9e1ec]">
                            <img src={m.photo} alt={m.name} loading="lazy" className="absolute inset-0 size-full object-cover object-top mix-blend-multiply grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                        </div>
                        <figcaption className="mt-4">
                            <p className="text-xl font-semibold tracking-tight text-ink" style={{ fontStretch: '88%' }}>{m.name}</p>
                            <p className="text-sm text-muted">{m.role}</p>
                        </figcaption>
                    </figure>
                </Reveal>
            ))}
        </ul>
    );
}
