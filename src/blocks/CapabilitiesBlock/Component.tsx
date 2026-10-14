import { cn } from '@/utilities/ui'
import type { CapabilitiesBlock as CapabilitiesBlockProps } from '@/payload-types'

export const CapabilitiesBlock: React.FC<
  CapabilitiesBlockProps & { className?: string }
> = ({ heading, text, items, className }) => {
  if (!items?.length) return null

  return (
    <div className={cn('px-4 mb-16', className)}>
      <div className="max-w-[1500px] mx-auto flex flex-col">
        {heading && <h2>{heading}</h2>}
        {text && <p>{text}</p>}

        <div className="mt-8 flex gap-4 flex-wrap">
          {items.map((item, i) => (
            <p
              key={i}
              className="font-bold w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)] border-b border-[#ccc] py-4"
            >
              {item.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}