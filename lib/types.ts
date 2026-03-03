export interface DbUser {
  id: number;
  clerk_id: string;
  name: string;
  email: string;
  role: "user" | "developer" | "admin";
  created_at: string;
}

export interface Application {
  id: number;
  name: string;
  slug: string;
  introduction: string | null;
  hero_image: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;
}

export interface Documentation {
  id: number;
  application_id: number;
  title: string;
  slug: string;
  parent_id: number | null;
  content: string | null;
  sort_order: number;
  created_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string | null;
  subject: string;
  message: string;
  ip_address: string | null;
  role_type: "anonymous" | "user" | "developer";
  is_read: boolean;
  created_at: string;
}

export interface DocTreeNode extends Documentation {
  children: DocTreeNode[];
}
