import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/cn';

/** Small circular button that switches the whole site between light and dark mode. */
export function ThemeToggle({ className }) {
    const [theme, toggle] = useTheme();
    const dark = theme === 'dark';
    return (
        <button type="button" onClick={toggle} aria-pressed={dark}
            className={cn('flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-navy', className)}>
            <span className="sr-only">{dark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
            {dark ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
        </button>
    );
}
