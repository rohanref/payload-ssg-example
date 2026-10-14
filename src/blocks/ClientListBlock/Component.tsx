import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { ClientListBlock as ClientListBlockProps } from '@/payload-types'
import { getMediaURL } from '@/utilities/getURL'

export const ClientListBlock: React.FC<ClientListBlockProps & { className?: string }> = ({
  heading,
  text,
  logos,
  className,
}) => {
  if (!logos?.length) return null

  return (
    <div className={cn('px-4 pb-16', className)}>
      <div className="max-w-[1500px] mx-auto">
        {heading && <h2 className="mb-2">{heading}</h2>}
        {text && <p>{text}</p>}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {logos.map((logo, i) => {
            if (!logo?.image || typeof logo.image === 'number') return null

            return (
              <Image
                key={i}
                src={getMediaURL(logo.image.url)}
                alt={logo.image.alt || ''}
                width={600}
                height={400}
                loading="lazy"
                className="object-contain w-full max-w-[226px]"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
