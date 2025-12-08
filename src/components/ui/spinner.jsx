import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({
  className,
  ...props
}) {
  return (
    <div className="z-100 absolute w-full h-full bg-[#00000050] flex items-center justify-center">
      <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-6 text-focused animate-spin", className)}
      {...props} />
    </div>
  );
}

export { Spinner }
