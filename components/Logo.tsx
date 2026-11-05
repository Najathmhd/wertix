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
  variant = 'dark',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  const isLight = variant === 'light'

  return (
    <div
      className={`${className} rounded-lg ${
        isLight
          ? 'bg-white text-[#090D1A]'
          : 'bg-[#090D1A] text-white'
      } flex items-center justify-center relative overflow-hidden transition-all duration-200 shadow-sm shrink-0`}
    >
      {/* Precision geometric 'W' mark with Wertix blue accent */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path
          d="M3.5 6.5L7.5 18L12 9.5L16.5 18L20.5 6.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="6" r="1.5" fill="#0055e5" />
      </svg>
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

  const content = (
    <div className={`flex items-center gap-2.5 group shrink-0 ${className}`}>
      <WertixMark
        className={size === 'lg' ? 'w-9 h-9' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'}
        variant={variant}
      />
      <div className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={`font-bold tracking-tight transition-colors duration-150 ${
            size === 'lg'
              ? 'text-lg'
              : size === 'sm'
              ? 'text-[14px]'
              : 'text-[15.5px]'
          } ${
            isLight
              ? 'text-white group-hover:text-[#0055e5]'
              : 'text-[#090D1A] group-hover:text-[#0055e5]'
          }`}
        >
          WERTIX
        </span>
        {showSubtitle && (
          <span
            className={`text-[9.5px] font-medium tracking-[0.14em] uppercase mt-0.5 ${
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
