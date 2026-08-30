-- ============================================================================
-- KURA ESSENTIALS — PHASE 9: STORAGE SETUP & POLICIES
-- ============================================================================

-- 1. Create product-images storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];

-- 2. Storage Policies for 'product-images' bucket

-- 2.1 Public read access for all users (customers and guests)
CREATE POLICY "Public Read Access on product-images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'product-images');

-- 2.2 Admin Insert (upload) policy
CREATE POLICY "Admin Upload Access on product-images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'product-images'
        AND (
            public.is_admin()
            OR (auth.jwt() ->> 'role' = 'service_role')
        )
    );

-- 2.3 Admin Update (replace) policy
CREATE POLICY "Admin Update Access on product-images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'product-images'
        AND (
            public.is_admin()
            OR (auth.jwt() ->> 'role' = 'service_role')
        )
    );

-- 2.4 Admin Delete policy
CREATE POLICY "Admin Delete Access on product-images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'product-images'
        AND (
            public.is_admin()
            OR (auth.jwt() ->> 'role' = 'service_role')
        )
    );
