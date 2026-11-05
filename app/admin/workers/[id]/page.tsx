import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import WorkerDetailClient from './WorkerDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function WorkerDetailPage({ params }: Props) {
  const { id } = await params

  const worker = await prisma.worker.findUnique({
    where: { id },
    include: {
      assignments: {
        include: {
          project: {
            select: { id: true, title: true, status: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!worker) notFound()

  let skills: string[] = []
  try {
    skills = JSON.parse(worker.skills)
  } catch {
    skills = []
  }

  return <WorkerDetailClient worker={worker} skills={skills} />
}

