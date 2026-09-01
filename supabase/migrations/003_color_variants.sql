-- Migration: 003_color_variants.sql
-- Add image_url and color_code to product_variants table for direct relational access

DO $$ BEGIN
    ALTER TABLE public.product_variants ADD COLUMN IF NOT EXISTS image_url TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.product_variants ADD COLUMN IF NOT EXISTS color_code TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;
