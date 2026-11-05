'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/dal'

// ─── Create / Update Worker ───────────────────────────────────────────────────

const WorkerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  skills: z.string().optional(), // JSON array
  portfolio: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  notes: z.string().optional(),
})

export type WorkerActionState =
  | { success?: boolean; id?: string; errors?: Record<string, string[]> }
  | undefined

export async function createWorkerAction(
  _state: WorkerActionState,
  formData: FormData
): Promise<WorkerActionState> {
  await requireAdmin()

  const validated = WorkerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    skills: formData.get('skills') || '[]',
    portfolio: formData.get('portfolio') || undefined,
    notes: formData.get('notes') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data
  const worker = await prisma.worker.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills ?? '[]',
      portfolio: data.portfolio || null,
      notes: data.notes,
    },
  })

  revalidatePath('/admin/workers')
  return { success: true, id: worker.id }
}

export async function updateWorkerAction(
  id: string,
  _state: WorkerActionState,
  formData: FormData
): Promise<WorkerActionState> {
  await requireAdmin()

  const validated = WorkerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    skills: formData.get('skills') || '[]',
    portfolio: formData.get('portfolio') || undefined,
    notes: formData.get('notes') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data
  await prisma.worker.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills ?? '[]',
      portfolio: data.portfolio || null,
      notes: data.notes,
    },
  })

  revalidatePath('/admin/workers')
  revalidatePath(`/admin/workers/${id}`)
  return { success: true }
}

export async function toggleWorkerActiveAction(id: string, isActive: boolean) {
  await requireAdmin()
  await prisma.worker.update({ where: { id }, data: { isActive } })
  revalidatePath('/admin/workers')
}
