import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'

export const Button = forwardRef(
  ({ className, variant = 'primary', arrow = false, href, type = 'button', ...props }, ref) => {
    const Comp = href ? 'a' : 'button'

    return (
      <Comp
        ref={ref}
        type={href ? undefined : type}
        className={clsx('btn', `btn--${variant}`, arrow && 'btn--arrow', className)}
        {...(href ? { href } : {})}
        {...props}
      >
        {props.children}
        {arrow && <ArrowRight className="btn-arrow" strokeWidth={2.5} />}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
