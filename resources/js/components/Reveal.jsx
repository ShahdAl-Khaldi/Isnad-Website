/**
 * Plain wrappers. The redesign keeps motion for a few deliberate moments
 * (hero "lights on", hover rows, timeline progress) instead of animating every section.
 * The API is kept so pages stay simple: <Reveal>, <SplitHeading>.
 */
export function Reveal({ children, as: Cmp = 'div', className, delay, y, ...rest }) {
    return <Cmp className={className} {...rest}>{children}</Cmp>;
}

export function SplitHeading({ text, as: Cmp = 'h2', className, id }) {
    return <Cmp id={id} className={className}>{text}</Cmp>;
}
