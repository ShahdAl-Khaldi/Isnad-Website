import { Link } from 'react-router';
import { motion } from 'motion/react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

/** Inner-page title band: breadcrumb, navy title, short introduction. Fades and lifts in on page load. */
export function PageHero({ eyebrow, title, lead, children }) {
    return (
        <header className="relative overflow-hidden border-b border-line bg-soft">
            <motion.div className="container-page py-14 md:py-20" variants={container} initial="hidden" animate="show">
                <motion.nav variants={item} aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
                    <Link to="/" className="hover:text-navy hover:underline">Home</Link>
                    <span aria-hidden="true" className="mx-2">›</span>
                    <span className="font-semibold text-ink" aria-current="page">{eyebrow}</span>
                </motion.nav>
                <motion.h1 variants={item} className="display max-w-4xl text-[2.4rem] text-navy md:text-[3.6rem]">{title}</motion.h1>
                {lead && <motion.p variants={item} className="mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{lead}</motion.p>}
                {children && <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">{children}</motion.div>}
            </motion.div>
            <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                initial={{ x: '-150%' }} animate={{ x: '150%' }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0, repeat: Infinity, repeatDelay: 1.9 }} />
        </header>
    );
}
