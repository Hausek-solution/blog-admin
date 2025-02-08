import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "../../lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  const [showActualValue, setShowActualValue] = React.useState<boolean>(true)

  React.useEffect(() => {
    // If char is deleted, reset to show nothing
    if (!char) {
      setShowActualValue(true)
      return
    }

    // Show the value briefly when char changes
    setShowActualValue(true)

    // After 1 second, hide the actual value and show a dot
    const timer = setTimeout(() => {
      setShowActualValue(false)
    }, 500) // 1 second delay to show actual value

    return () => clearTimeout(timer) // Cleanup on re-render or unmount
  }, [char])

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-14 w-11 items-center justify-center border rounded-2xl border-input text-sm transition-all first:border-l text-[#040405] leading-[19.36px]",
        isActive && "z-10 border-primary",
        className
      )}
      {...props}
    >
      {showActualValue ? char : char === "" ? "" : "•"} {/* Show actual char, nothing if deleted, or a dot */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
