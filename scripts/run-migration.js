import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Creating users table...");
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      clerk_id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'developer', 'admin')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  console.log("Creating applications table...");
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      introduction TEXT,
      hero_image VARCHAR(512),
      status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  console.log("Creating documentation table...");
  await sql`
    CREATE TABLE IF NOT EXISTS documentation (
      id SERIAL PRIMARY KEY,
      application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      parent_id INTEGER REFERENCES documentation(id) ON DELETE SET NULL,
      content TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(application_id, slug)
    )
  `;

  console.log("Creating contact_submissions table...");
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      subject VARCHAR(500) NOT NULL,
      message TEXT NOT NULL,
      ip_address VARCHAR(45),
      role_type VARCHAR(50) NOT NULL DEFAULT 'anonymous' CHECK (role_type IN ('anonymous', 'user', 'developer')),
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  console.log("Creating indexes...");
  await sql`CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_applications_slug ON applications(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_documentation_app_id ON documentation(application_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_documentation_parent ON documentation(parent_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_documentation_slug ON documentation(application_id, slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_role_type ON contact_submissions(role_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_is_read ON contact_submissions(is_read)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_ip ON contact_submissions(ip_address)`;

  console.log("Migration complete!");
}

migrate().catch(console.error);
