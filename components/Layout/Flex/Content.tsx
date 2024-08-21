import { cn } from '@/util/cn'

export default function Content ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col pt-6 justify-center content-center items-center w-full',
        className
      )}
    >
      <div className='flex flex-col w-full'>{children}</div>
    </div>
  )
}
