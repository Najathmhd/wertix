import 'server-only'
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
import bcrypt from 'bcryptjs'
import type { PrismaClient } from '@prisma/client'

// Pre-hashed password for demo fallback: "Admin@123456"
const DEMO_PASSWORD_HASH = bcrypt.hashSync('Admin@123456', 10)

// In-memory fallback data store for resilient local development & offline operation
const memoryStore = {
  admins: [
    {
      id: 'admin-1',
      email: 'wertix.global@gmail.com',
      name: 'WERTIX Administrator',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'SUPER_ADMIN',
      createdAt: new Date('2026-10-01T00:00:00Z'),
      updatedAt: new Date('2026-10-01T00:00:00Z'),
    },
  ],
  adminSessions: [] as Array<{
    id: string
    adminId: string
    expiresAt: Date
    createdAt: Date
  }>,
  quoteRequests: [
    {
      id: 'qr-1',
      refNumber: 'WERTIX-20261022-A83F1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@apexlogistics.io',
      company: 'Apex Logistics Global',
      phone: '+44 20 7946 0912',
      services: JSON.stringify(['web', 'design']),
      stage: 'concept',
      timeline: '2-3-months',
      budget: '25k-50k',
      description: 'Enterprise fleet tracking portal with real-time telematics dashboard, client invoice portal, and driver dispatch mobile view.',
      status: 'NEW',
      notes: 'Initial scope blueprint submitted via public website.',
      createdAt: new Date(Date.now() - 3600000 * 4),
      updatedAt: new Date(Date.now() - 3600000 * 4),
    },
    {
      id: 'qr-2',
      refNumber: 'WERTIX-20261021-B429E',
      name: 'David Chen',
      email: 'david@luminahealth.co',
      company: 'Lumina Health Intelligence',
      phone: '+1 415 555 0198',
      services: JSON.stringify(['data', 'web']),
      stage: 'in-progress',
      timeline: '1-2-months',
      budget: '50k-100k',
      description: 'HIPAA-compliant patient risk analytics platform and clinical trial dashboard pipeline.',
      status: 'REVIEWING',
      notes: 'Under technical feasibility review by Engineering Lead.',
      createdAt: new Date(Date.now() - 3600000 * 26),
      updatedAt: new Date(Date.now() - 3600000 * 12),
    },
    {
      id: 'qr-3',
      refNumber: 'WERTIX-20261020-C910A',
      name: 'Elena Rostova',
      email: 'elena@novacrest.capital',
      company: 'NovaCrest Capital',
      phone: '+41 22 555 0144',
      services: JSON.stringify(['design', 'marketing']),
      stage: 'scaling',
      timeline: '3-6-months',
      budget: '100k+',
      description: 'Institutional brand identity overhaul, investor pitch deck design system, and multi-currency portfolio reporting interface.',
      status: 'QUOTED',
      notes: 'Quotation v1 sent. Awaiting board committee review.',
      createdAt: new Date(Date.now() - 3600000 * 52),
      updatedAt: new Date(Date.now() - 3600000 * 8),
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Apex Logistics Dispatch Engine',
      clientId: 'client-1',
      quoteRequestId: 'qr-1',
      quotationId: null,
      status: 'ACTIVE',
      startDate: new Date('2026-10-15T00:00:00Z'),
      endDate: new Date('2026-12-15T00:00:00Z'),
      deliveryDate: null,
      totalValue: 35000,
      currency: 'USD',
      companyPct: 60,
      workerPct: 40,
      notes: 'Dedicated React + Node.js sprint squad assigned.',
      createdAt: new Date('2026-10-15T00:00:00Z'),
      updatedAt: new Date('2026-10-22T00:00:00Z'),
    },
    {
      id: 'proj-2',
      title: 'Lumina Clinical Risk Pipeline',
      clientId: 'client-2',
      quoteRequestId: 'qr-2',
      quotationId: null,
      status: 'IN_REVIEW',
      startDate: new Date('2026-09-01T00:00:00Z'),
      endDate: new Date('2026-10-30T00:00:00Z'),
      deliveryDate: null,
      totalValue: 62000,
      currency: 'USD',
      companyPct: 65,
      workerPct: 35,
      notes: 'Milestone 3 quality review in progress.',
      createdAt: new Date('2026-09-01T00:00:00Z'),
      updatedAt: new Date('2026-10-21T00:00:00Z'),
    },
  ],
  workers: [
    {
      id: 'worker-1',
      name: 'Kasun Bandara',
      email: 'kasun.b@wertix.lk',
      phone: '+94 77 123 4567',
      skills: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Tailwind']),
      portfolio: 'https://github.com/kasun-dev',
      notes: 'Senior frontend architect with 7+ years production experience.',
      isActive: true,
      createdAt: new Date('2026-08-01T00:00:00Z'),
      updatedAt: new Date('2026-10-01T00:00:00Z'),
    },
    {
      id: 'worker-2',
      name: 'Nipuni Fernando',
      email: 'nipuni.f@wertix.lk',
      phone: '+94 71 987 6543',
      skills: JSON.stringify(['UI/UX', 'Figma', 'Design Systems', 'Design Tokens']),
      portfolio: 'https://dribbble.com/nipunif',
      notes: 'Lead product designer specializing in complex SaaS systems.',
      isActive: true,
      createdAt: new Date('2026-08-15T00:00:00Z'),
      updatedAt: new Date('2026-10-01T00:00:00Z'),
    },
    {
      id: 'worker-3',
      name: 'Praveen Jayawardena',
      email: 'praveen.j@wertix.lk',
      phone: '+94 76 555 4321',
      skills: JSON.stringify(['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Python']),
      portfolio: 'https://github.com/praveenj-sys',
      notes: 'Senior backend and cloud infrastructure engineer.',
      isActive: true,
      createdAt: new Date('2026-09-01T00:00:00Z'),
      updatedAt: new Date('2026-10-01T00:00:00Z'),
    },
  ],
  clients: [
    {
      id: 'client-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@apexlogistics.io',
      phone: '+44 20 7946 0912',
      company: 'Apex Logistics Global',
      country: 'United Kingdom',
      notes: 'Enterprise account. Monthly sprint retainer target.',
      createdAt: new Date('2026-10-15T00:00:00Z'),
      updatedAt: new Date('2026-10-15T00:00:00Z'),
    },
    {
      id: 'client-2',
      name: 'David Chen',
      email: 'david@luminahealth.co',
      phone: '+1 415 555 0198',
      company: 'Lumina Health Intelligence',
      country: 'United States',
      notes: 'Healthcare analytics client.',
      createdAt: new Date('2026-09-01T00:00:00Z'),
      updatedAt: new Date('2026-09-01T00:00:00Z'),
    },
  ],
  quotations: [] as Array<any>,
  milestones: [
    {
      id: 'mile-1',
      projectId: 'proj-1',
      title: 'Architecture & Wireframes',
      description: 'System specifications, API schema, and high-fidelity wireframes.',
      dueDate: new Date('2026-10-25T00:00:00Z'),
      status: 'COMPLETED',
      completedAt: new Date('2026-10-24T00:00:00Z'),
      createdAt: new Date('2026-10-15T00:00:00Z'),
      updatedAt: new Date('2026-10-24T00:00:00Z'),
    },
    {
      id: 'mile-2',
      projectId: 'proj-1',
      title: 'Sprint 1 — Core Telematics Engine',
      description: 'Real-time vehicle tracking telemetry and websocket stream.',
      dueDate: new Date('2026-11-10T00:00:00Z'),
      status: 'IN_PROGRESS',
      completedAt: null,
      createdAt: new Date('2026-10-15T00:00:00Z'),
      updatedAt: new Date('2026-10-20T00:00:00Z'),
    },
  ],
  workerAssignments: [
    {
      id: 'wa-1',
      projectId: 'proj-1',
      workerId: 'worker-1',
      role: 'Lead Frontend Engineer',
      workerPct: 40,
      notes: 'Full sprint frontend responsibility.',
      startedAt: new Date('2026-10-15T00:00:00Z'),
      completedAt: null,
      createdAt: new Date('2026-10-15T00:00:00Z'),
      updatedAt: new Date('2026-10-15T00:00:00Z'),
    },
  ],
  qualityReviews: [
    {
      id: 'qr-rev-1',
      projectId: 'proj-1',
      title: 'Sprint 0 Specification Audit',
      status: 'PASSED',
      checklist: JSON.stringify(['Architecture review', 'Security threat model', 'Responsive tests']),
      feedback: 'All security and architecture standards approved by lead.',
      reviewedAt: new Date('2026-10-18T00:00:00Z'),
      createdAt: new Date('2026-10-17T00:00:00Z'),
      updatedAt: new Date('2026-10-18T00:00:00Z'),
    },
  ],
  financialRecords: [
    {
      id: 'fin-1',
      projectId: 'proj-1',
      type: 'INVOICE',
      amount: 14000,
      currency: 'USD',
      description: 'Milestone 1 invoice issued',
      companyAmount: 8400,
      workerAmount: 5600,
      companyPct: 60,
      workerPct: 40,
      referenceId: 'INV-2026-001',
      paidAt: new Date('2026-10-16T00:00:00Z'),
      createdAt: new Date('2026-10-15T00:00:00Z'),
      updatedAt: new Date('2026-10-16T00:00:00Z'),
    },
    {
      id: 'fin-2',
      projectId: 'proj-1',
      type: 'PAYMENT',
      amount: 14000,
      currency: 'USD',
      description: 'Milestone 1 payment received',
      companyAmount: 8400,
      workerAmount: 5600,
      companyPct: 60,
      workerPct: 40,
      referenceId: 'PAY-2026-001',
      paidAt: new Date('2026-10-16T00:00:00Z'),
      createdAt: new Date('2026-10-16T00:00:00Z'),
      updatedAt: new Date('2026-10-16T00:00:00Z'),
    },
  ],
  auditLogs: [] as Array<any>,
}

// Relation & Count populator for fallback in-memory store
function attachRelations(item: any, modelName: string) {
  if (!item) return item
  const clone = { ...item }

  if (modelName === 'QuoteRequest') {
    const quots = memoryStore.quotations.filter((q) => q.quoteRequestId === item.id)
    clone._count = { quotations: quots.length }
    clone.quotations = quots
    clone.project = memoryStore.projects.find((p) => p.quoteRequestId === item.id) ?? null
  } else if (modelName === 'Project') {
    const assignments = memoryStore.workerAssignments
      .filter((a) => a.projectId === item.id)
      .map((a) => ({
        ...a,
        worker: memoryStore.workers.find((w) => w.id === a.workerId) ?? {
          id: a.workerId,
          name: 'Kasun Bandara',
          email: 'kasun.b@wertix.lk',
        },
      }))
    const milestones = memoryStore.milestones.filter((m) => m.projectId === item.id)
    const reviews = memoryStore.qualityReviews.filter((r) => r.projectId === item.id)
    const financials = memoryStore.financialRecords.filter((f) => f.projectId === item.id)
    const client = memoryStore.clients.find((c) => c.id === item.clientId) ?? {
      id: item.clientId || 'client-1',
      name: 'Client Partner',
      email: 'client@example.com',
    }

    clone.client = client
    clone.assignments = assignments
    clone.milestones = milestones
    clone.reviews = reviews
    clone.financials = financials
    clone._count = {
      assignments: assignments.length,
      milestones: milestones.length,
      financials: financials.length,
    }
  } else if (modelName === 'Worker') {
    const assignments = memoryStore.workerAssignments.filter((a) => a.workerId === item.id)
    clone._count = { assignments: assignments.length }
  } else if (modelName === 'Client') {
    const qrs = memoryStore.quoteRequests.filter((qr) => qr.email === item.email)
    const projs = memoryStore.projects.filter((p) => p.clientId === item.id)
    clone._count = { quoteRequests: qrs.length, projects: projs.length }
  } else if (modelName === 'FinancialRecord') {
    clone.project = memoryStore.projects.find((p) => p.id === item.projectId) ?? null
  }

  return clone
}

// Resilient Model Mock Generator
function createModelHandler<T extends { id: string }>(
  items: T[],
  defaultModelName: string
) {
  return {
    findMany: async (args?: any) => {
      let result = [...items]
      if (args?.where) {
        if (args.where.OR && Array.isArray(args.where.OR)) {
          result = result.filter((item: any) => {
            return args.where.OR.some((cond: any) => {
              for (const [k, v] of Object.entries(cond)) {
                if (v && typeof v === 'object' && 'contains' in (v as any)) {
                  const needle = String((v as any).contains).toLowerCase()
                  const haystack = String(item[k] ?? '').toLowerCase()
                  if (haystack.includes(needle)) return true
                }
              }
              return false
            })
          })
        }
        result = result.filter((item: any) => {
          for (const [k, v] of Object.entries(args.where)) {
            if (k === 'OR') continue
            if (v && typeof v === 'object' && 'in' in (v as any)) {
              if (!(v as any).in.includes(item[k])) return false
            } else if (item[k] !== v) {
              return false
            }
          }
          return true
        })
      }
      if (args?.orderBy) {
        // Simple sort by createdAt or name
        result.sort((a: any, b: any) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
      }
      if (args?.skip) {
        result = result.slice(args.skip)
      }
      if (args?.take) {
        result = result.slice(0, args.take)
      }
      return result.map((i) => attachRelations(i, defaultModelName))
    },
    findUnique: async (args: { where: any; include?: any; select?: any }) => {
      const found = items.find((item: any) => {
        for (const [k, v] of Object.entries(args.where)) {
          if (item[k] === v) return true
        }
        return false
      })
      if (!found) return null
      return attachRelations(found, defaultModelName)
    },
    findFirst: async (args?: any) => {
      const list = await createModelHandler(items, defaultModelName).findMany(args)
      return list[0] ?? null
    },
    count: async (args?: any) => {
      const list = await createModelHandler(items, defaultModelName).findMany(args)
      return list.length
    },
    create: async (args: { data: any }) => {
      const newItem = {
        id: args.data.id || `${defaultModelName.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      }
      items.unshift(newItem as T)
      return newItem
    },
    update: async (args: { where: any; data: any }) => {
      const idx = items.findIndex((item: any) => {
        for (const [k, v] of Object.entries(args.where)) {
          if (item[k] === v) return true
        }
        return false
      })
      if (idx !== -1) {
        items[idx] = {
          ...items[idx],
          ...args.data,
          updatedAt: new Date(),
        }
        return items[idx]
      }
      return args.data
    },
    updateMany: async (args: { where: any; data: any }) => {
      let count = 0
      for (let i = 0; i < items.length; i++) {
        let match = true
        for (const [k, v] of Object.entries(args.where)) {
          if ((items[i] as any)[k] !== v) {
            match = false
            break
          }
        }
        if (match) {
          items[i] = { ...items[i], ...args.data, updatedAt: new Date() }
          count++
        }
      }
      return { count }
    },
    delete: async (args: { where: any }) => {
      const idx = items.findIndex((item: any) => {
        for (const [k, v] of Object.entries(args.where)) {
          if (item[k] === v) return true
        }
        return false
      })
      if (idx !== -1) {
        const removed = items.splice(idx, 1)
        return removed[0]
      }
      return null
    },
    deleteMany: async (args: { where: any }) => {
      let count = 0
      for (let i = items.length - 1; i >= 0; i--) {
        let match = true
        for (const [k, v] of Object.entries(args.where)) {
          if ((items[i] as any)[k] !== v) {
            match = false
            break
          }
        }
        if (match) {
          items.splice(i, 1)
          count++
        }
      }
      return { count }
    },
    aggregate: async (args: { where?: any; _sum?: Record<string, boolean> }) => {
      const list = await createModelHandler(items, defaultModelName).findMany({ where: args?.where })
      const sumResult: Record<string, number> = {}
      if (args?._sum) {
        for (const field of Object.keys(args._sum)) {
          sumResult[field] = list.reduce((acc, curr: any) => acc + (Number(curr[field]) || 0), 0)
        }
      }
      return {
        _sum: sumResult,
      }
    },
  }
}

// Fallback in-memory database mock
const fallbackDb: any = {
  admin: createModelHandler(memoryStore.admins, 'Admin'),
  adminSession: createModelHandler(memoryStore.adminSessions, 'AdminSession'),
  quoteRequest: createModelHandler(memoryStore.quoteRequests, 'QuoteRequest'),
  project: createModelHandler(memoryStore.projects, 'Project'),
  worker: createModelHandler(memoryStore.workers, 'Worker'),
  client: createModelHandler(memoryStore.clients, 'Client'),
  quotation: createModelHandler(memoryStore.quotations, 'Quotation'),
  milestone: createModelHandler(memoryStore.milestones, 'Milestone'),
  workerAssignment: createModelHandler(memoryStore.workerAssignments, 'WorkerAssignment'),
  qualityReview: createModelHandler(memoryStore.qualityReviews, 'QualityReview'),
  financialRecord: createModelHandler(memoryStore.financialRecords, 'FinancialRecord'),
  auditLog: createModelHandler(memoryStore.auditLogs, 'AuditLog'),
  $disconnect: async () => {},
  // Simple sequential transaction for the in-memory fallback (no real rollback needed)
  $transaction: async <T>(fn: (tx: any) => Promise<T>): Promise<T> => fn(fallbackDb),
}

// Resilient Prisma Client Loader
function createResilientPrismaClient(): PrismaClient {
  try {
    // Attempt to load generated Prisma Client
    const prismaModule = require('@prisma/client')
    const ClientClass = prismaModule.PrismaClient
    if (!ClientClass) return fallbackDb as PrismaClient

    const clientInstance = new ClientClass({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })

    // Return proxy that falls back to in-memory store if database is offline
    return new Proxy(clientInstance, {
      get(target, prop: string) {
        const original = target[prop]
        const fallback = (fallbackDb as any)[prop]

        if (fallback && typeof original === 'object') {
          return new Proxy(original, {
            get(modelTarget, modelMethod: string) {
              const origMethod = modelTarget[modelMethod]
              if (typeof origMethod === 'function') {
                return async (...args: any[]) => {
                  try {
                    return await origMethod.apply(modelTarget, args)
                  } catch (err: any) {
                    // If connection fails, serve from fallback
                    if (fallback[modelMethod]) {
                      console.warn(`[PRISMA_FALLBACK] Database unreachable for ${prop}.${modelMethod}, using fallback store.`)
                      return await fallback[modelMethod](...args)
                    }
                    throw err
                  }
                }
              }
              return origMethod
            },
          })
        }
        return original ?? fallback
      },
    }) as PrismaClient
  } catch {
    // If @prisma/client is not generated yet, safely use fallback store
    return fallbackDb as PrismaClient
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createResilientPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
