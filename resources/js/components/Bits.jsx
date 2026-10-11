import { Icon } from './Icon';
import { cn } from '../lib/cn';

export function StatusBadge({ status, className }) {
    const styles = {
        Active: 'bg-status-active/12 text-status-active',
        Planned: 'bg-status-planned/12 text-status-planned',
        Past: 'bg-status-past/12 text-status-past',
    };
    return (
        <span className={cn('inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-bold', styles[status] ?? styles.Past, className)}>
            <span className={cn('size-1.5 rounded-full bg-current', status === 'Active' && 'animate-pulse motion-reduce:animate-none')} aria-hidden="true" />
            {status}
        </span>
    );
}

export function EmptyState({ icon = 'file', title, children, action, dark = false, className }) {
    return (
        <div className={cn('rounded-card-lg border border-dashed px-6 py-14 text-center md:px-12', dark ? 'border-white/20' : 'border-ink/15 bg-paper/60', className)}>
            <div className={cn('mx-auto mb-6 flex size-14 items-center justify-center rounded-full', dark ? 'bg-white/5 text-blue' : 'bg-blue-soft text-blue-strong')}>
                <Icon name={icon} className="size-6" />
            </div>
            <h3 className={cn('text-xl', dark ? 'text-white' : 'text-ink')}>{title}</h3>
            {children && <div className={cn('mx-auto mt-3 max-w-lg text-[0.97rem]', dark ? 'text-inverse-muted' : 'text-muted')}>{children}</div>}
            {action && <div className="mt-7 flex justify-center">{action}</div>}
        </div>
    );
}
