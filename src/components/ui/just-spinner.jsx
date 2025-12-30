import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function JustSpinner({
  className,
  ...props
}) {
  return (
    <div className="">
      <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-6 text-focused animate-spin", className)}
      {...props} />
    </div>
  );
}

export { JustSpinner }
