import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
  showSubtitle?: boolean
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

export function WertixMark({
  className = 'w-8 h-8',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  return (
    <div
      className={`${className} flex items-center justify-center relative shrink-0`}
    >
      <Image
        src="/logo-icon.png"
        alt="WERTIX"
        width={187}
        height={106}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  )
}

export default function Logo({
  className = '',
  variant = 'dark',
  showSubtitle = true,
  href = '/',
  size = 'md',
}: LogoProps) {
  const isLight = variant === 'light'

  const heights = {
    sm: 'h-6',
    md: 'h-7',
    lg: 'h-9',
  }

  const content = (
    <div className={`flex items-center gap-2.5 group shrink-0 ${className}`}>
      <div className="flex flex-col">
        <Image
          src={isLight ? '/logo-white.png' : '/logo.png'}
          alt="WERTIX"
          width={538}
          height={106}
          priority
          className={`${heights[size] ?? 'h-7'} w-auto object-contain transition-transform duration-150 group-hover:scale-[1.02]`}
        />
        {showSubtitle && (
          <span
            className={`text-[8px] font-medium tracking-[0.22em] uppercase mt-0.5 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Digital Services
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055e5] rounded-lg"
        aria-label="WERTIX — Home"
      >
        {content}
      </Link>
    )
  }

  return content
}
