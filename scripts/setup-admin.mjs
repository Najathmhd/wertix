/**
 * WERTIX — Initial Setup Script
 *
 * This script creates the first SUPER_ADMIN account.
 * Run it ONCE after your database is ready:
 *
 *   node scripts/setup-admin.mjs
 *
 * You will be prompted for email, name, and password.
 * After running, DELETE or DISABLE this script to prevent re-use.
 */

import { createInterface } from 'readline'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const rl = createInterface({ input: process.stdin, output: process.stdout })
const question = (q) => new Promise((resolve) => rl.question(q, resolve))

async function main() {
  console.log('\n🔐 WERTIX Admin Setup\n')

  // Check if any admin already exists
  const existing = await prisma.admin.count()
  if (existing > 0) {
    console.log('❌ An admin account already exists.')
    console.log('   Use the admin panel to add additional administrators.')
    process.exit(1)
  }

  const email = await question('Admin email: ')
  const name = await question('Admin name: ')
  const password = await question('Password (min 8 chars): ')

  if (!email || !name || password.length < 8) {
    console.log('❌ Invalid input. Email and name are required. Password must be at least 8 characters.')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.admin.create({
    data: {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })

  console.log('\n✅ Admin account created successfully.')
  console.log(`   Email: ${email}`)
  console.log(`   Role: SUPER_ADMIN`)
  console.log('\n   You can now sign in at /admin/login')
  console.log('   ⚠️  Delete this script file after use.\n')
}

main()
  .catch((err) => {
    console.error('Setup failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    rl.close()
  })
