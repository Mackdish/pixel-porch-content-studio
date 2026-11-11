CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL CHECK (kind IN ('project', 'service', 'page', 'faq', 'post')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published site content" ON public.site_content FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins can manage all site content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE INDEX site_content_public_order_idx ON public.site_content (kind, published, sort_order);
CREATE POLICY "Public can view project image objects" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'project-images');
CREATE POLICY "Admins can manage project image objects" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));