import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

const MobileTable = AccordionPrimitive.Root

const MobileTableItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border rounded-md even:bg-[#EFF4FF] data-[state=open]:bg-[#EFF4FF]", className)}
    {...props}
  />
))
MobileTableItem.displayName = "MobileTableItem"

const MobileTableTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center py-4 font-medium transition-all  [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
MobileTableTrigger.displayName = AccordionPrimitive.Trigger.displayName

const MobileTableContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all bg-white data-[state=open]:bg-[#EFF4FF] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-3 data-[state=open]:border-t data-[state=open]:pt-3"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

MobileTableContent.displayName = AccordionPrimitive.Content.displayName

export { MobileTable, MobileTableItem, MobileTableTrigger, MobileTableContent }
