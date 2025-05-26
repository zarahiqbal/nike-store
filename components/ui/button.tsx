// import * as React from "react"

// const buttonVariants = {
//   variant: {
//     default: "bg-black text-white hover:bg-gray-800",
//     destructive: "bg-red-500 text-white hover:bg-red-600",
//     outline: "border border-gray-300 bg-white hover:bg-gray-50",
//     secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
//     ghost: "hover:bg-gray-100",
//     link: "text-black underline-offset-4 hover:underline",
//   },
//   size: {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 px-3",
//     lg: "h-11 px-8",
//     icon: "h-10 w-10",
//   },
// }

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: keyof typeof buttonVariants.variant
//   size?: keyof typeof buttonVariants.size
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant = "default", size = "default", ...props }, ref) => {
//     const variantClasses = buttonVariants.variant[variant]
//     const sizeClasses = buttonVariants.size[size]

//     // Simple class merging function
//     const classes = [
//       "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//       variantClasses,
//       sizeClasses,
//       className,
//     ]
//       .filter(Boolean)
//       .join(" ")

//     return <button className={classes} ref={ref} {...props} />
//   },
// )
// Button.displayName = "Button"

// export { Button, buttonVariants }


import * as React from "react"
import { cn } from "../../lib/utils"

const buttonVariants = {
  variant: {
    default: "bg-black text-white hover:bg-gray-800",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100",
    link: "text-black underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  },
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, children, disabled, ...props }, ref) => {
    const variantClasses = buttonVariants.variant[variant]
    const sizeClasses = buttonVariants.size[size]

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClasses,
          sizeClasses,
          className,
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
