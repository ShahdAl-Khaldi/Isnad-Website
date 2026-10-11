import { useEffect, useMemo, useRef } from 'react';
import { cn } from '../lib/cn';

/**
 * A slowly rotating wireframe sphere of connected points — a visual nod to
 * "isnad" (support, connection). Pure SVG + requestAnimationFrame, no library.
 * Pauses when off-screen and stays still for reduced-motion users.
 */
function buildSphere(count, neighbours) {
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = golden * i;
        pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    const edges = new Set();
    pts.forEach((p, i) => {
        pts.map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2])
            .filter(([j]) => j !== i)
            .sort((a, b) => a[1] - b[1])
            .slice(0, neighbours)
            .forEach(([j]) => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`));
    });
    return { pts, edges: [...edges].map((e) => e.split('-').map(Number)) };
}

export function NetworkSphere({ className, points = 46, neighbours = 3, speed = 0.00012, accentEvery = 7 }) {
    const { pts, edges } = useMemo(() => buildSphere(points, neighbours), [points, neighbours]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const lines = svg.querySelectorAll('line');
        const dots = svg.querySelectorAll('circle[data-node]');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;
        let visible = true;
        let start = performance.now();

        const draw = (t) => {
            const a = (t - start) * speed * 6;
            const tilt = 0.42;
            const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt);
            const proj = pts.map(([x, y, z]) => {
                const x1 = x * ca + z * sa;
                const z1 = -x * sa + z * ca;
                const y1 = y * ct - z1 * st;
                const z2 = y * st + z1 * ct;
                const s = 1 / (1.9 - z2 * 0.55);
                return [x1 * s * 180, y1 * s * 180, z2];
            });
            edges.forEach(([i, j], k) => {
                const l = lines[k];
                l.setAttribute('x1', proj[i][0].toFixed(1));
                l.setAttribute('y1', proj[i][1].toFixed(1));
                l.setAttribute('x2', proj[j][0].toFixed(1));
                l.setAttribute('y2', proj[j][1].toFixed(1));
                l.setAttribute('stroke-opacity', (0.12 + ((proj[i][2] + proj[j][2]) / 2 + 1) * 0.22).toFixed(2));
            });
            proj.forEach((p, k) => {
                const d = dots[k];
                d.setAttribute('cx', p[0].toFixed(1));
                d.setAttribute('cy', p[1].toFixed(1));
                d.setAttribute('opacity', (0.25 + (p[2] + 1) * 0.37).toFixed(2));
            });
        };

        const loop = (t) => {
            draw(t);
            if (visible) raf = requestAnimationFrame(loop);
        };

        draw(start + 4000);
        if (reduce) return;

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(raf);
            if (visible) raf = requestAnimationFrame(loop);
        });
        io.observe(svg);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [pts, edges, speed]);

    return (
        <svg ref={svgRef} viewBox="-200 -200 400 400" className={cn('pointer-events-none select-none', className)} aria-hidden="true" focusable="false">
            <g stroke="currentColor" strokeWidth="0.7">
                {edges.map((_, k) => <line key={k} />)}
            </g>
            {pts.map((_, k) => (
                <circle key={k} data-node r={k % accentEvery === 0 ? 3 : 1.6} fill={k % accentEvery === 0 ? 'var(--isnad-blue)' : 'currentColor'} />
            ))}
        </svg>
    );
}
