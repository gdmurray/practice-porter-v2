import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Matches reference/pp-shared.css `.btn`: brand-red gradient fill, white text,
// 4px radius, white sheen sweep on hover. Font weight 500 per Brand Guidelines
// (Plus Jakarta Sans Medium). Reuses the `shimmer` keyframe already defined
// in global.css so the sweep animation stays identical to the raw-CSS
// `.btn-primary` class.
const primaryButtonClasses =
  "relative overflow-hidden rounded-[4px] bg-[linear-gradient(100deg,var(--red),var(--red-bright))] text-white shadow-xs before:pointer-events-none before:absolute before:inset-y-0 before:left-[-100%] before:w-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] before:content-[''] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(163,39,5,0.22)] hover:before:animate-[shimmer_0.85s_ease_forwards]"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary brand CTA — matches the "Primary Button" rule in Brand
        // Guidelines exactly. Kept as the fallback `default` so any button
        // that forgets to pass a variant still renders on-brand.
        default: primaryButtonClasses,
        brand: primaryButtonClasses,
        nav:
          "rounded-[10px] bg-red px-6 py-2.5 text-[13px] text-white shadow-xs hover:bg-red-deep hover:shadow-[0_6px_16px_rgba(163,39,5,0.22)]",
        // Secondary CTA — "Border + Fill": white fill, brand-red border/text,
        // fills to vanilla and lifts on hover.
        outline:
          "rounded-[4px] border border-[rgba(163,39,5,0.28)] bg-white text-red hover:bg-vanilla hover:border-[rgba(163,39,5,0.40)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(163,39,5,0.10)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        // Matches reference/pp-shared.css `.btn`/`.btn--small` exactly as
        // rendered in reference/Home.html's nav CTA (`class="btn btn--small"`):
        // 4px radius, 10px/22px padding — sharp/rectangular, NOT the 10-11px
        // rounding used by the larger `cta` size. `!rounded-[4px]` forces this
        // over the variant's own radius class since size should win here.
        sm: "h-auto gap-1.5 !rounded-[4px] px-[22px] py-2.5 text-[13px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        lg: "h-10 gap-1.5 px-3 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        // Marketing CTA size — 14px/28px padding, 14px type per Brand Guidelines.
        cta: "h-auto px-7 py-3.5 text-sm gap-2.5",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
