# Admin dashboard

Build a protected `/admin` workspace for the confirmed administrator account.

## User-facing work
- Add editors for projects and project images, services, editable page copy, FAQs, and blog posts.
- Add publishing controls and clear save/upload feedback.
- Connect the public projects, solutions, FAQ, and blog pages to published saved content.

## Technical approach
- Add structured content tables with explicit grants and RLS: public visitors can read published content; only administrators can manage it.
- Keep the administrator check server/database-enforced with the existing separate role table.
- Use Lovable Storage for project images, with public viewing and administrator-only upload policies. If workspace settings block public image buckets, surface the needed setting and keep that dependency explicit.
- Use the existing TanStack Start, Supabase client, and UI patterns; validate with the project typecheck, tests, and preview flow.