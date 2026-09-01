import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  CREATE TYPE "public"."enum_portfolio_experience_entries_kind" AS ENUM('role', 'education');
  CREATE TYPE "public"."enum_portfolio_capabilities_items_icon" AS ENUM('award', 'badge-check', 'blocks', 'clipboard-check', 'drafting-compass', 'file-chart-column', 'hard-hat', 'shield-check');
  CREATE TYPE "public"."enum_portfolio_training_groups_style" AS ENUM('navy', 'paper', 'pale');
  CREATE TYPE "public"."enum_portfolio_training_groups_icon" AS ENUM('award', 'badge-check', 'blocks', 'clipboard-check', 'drafting-compass', 'file-chart-column', 'hard-hat', 'shield-check');
  CREATE TYPE "public"."enum_portfolio_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolio_v_version_experience_entries_kind" AS ENUM('role', 'education');
  CREATE TYPE "public"."enum__portfolio_v_version_capabilities_items_icon" AS ENUM('award', 'badge-check', 'blocks', 'clipboard-check', 'drafting-compass', 'file-chart-column', 'hard-hat', 'shield-check');
  CREATE TYPE "public"."enum__portfolio_v_version_training_groups_style" AS ENUM('navy', 'paper', 'pale');
  CREATE TYPE "public"."enum__portfolio_v_version_training_groups_icon" AS ENUM('award', 'badge-check', 'blocks', 'clipboard-check', 'drafting-compass', 'file-chart-column', 'hard-hat', 'shield-check');
  CREATE TYPE "public"."enum__portfolio_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "email" varchar NOT NULL,
    "reset_password_token" varchar,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" varchar,
    "hash" varchar,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "folder_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric,
    "sizes_thumbnail_url" varchar,
    "sizes_thumbnail_width" numeric,
    "sizes_thumbnail_height" numeric,
    "sizes_thumbnail_mime_type" varchar,
    "sizes_thumbnail_filesize" numeric,
    "sizes_thumbnail_filename" varchar,
    "sizes_square_url" varchar,
    "sizes_square_width" numeric,
    "sizes_square_height" numeric,
    "sizes_square_mime_type" varchar,
    "sizes_square_filesize" numeric,
    "sizes_square_filename" varchar,
    "sizes_small_url" varchar,
    "sizes_small_width" numeric,
    "sizes_small_height" numeric,
    "sizes_small_mime_type" varchar,
    "sizes_small_filesize" numeric,
    "sizes_small_filename" varchar,
    "sizes_medium_url" varchar,
    "sizes_medium_width" numeric,
    "sizes_medium_height" numeric,
    "sizes_medium_mime_type" varchar,
    "sizes_medium_filesize" numeric,
    "sizes_medium_filename" varchar,
    "sizes_large_url" varchar,
    "sizes_large_width" numeric,
    "sizes_large_height" numeric,
    "sizes_large_mime_type" varchar,
    "sizes_large_filesize" numeric,
    "sizes_large_filename" varchar,
    "sizes_xlarge_url" varchar,
    "sizes_xlarge_width" numeric,
    "sizes_xlarge_height" numeric,
    "sizes_xlarge_mime_type" varchar,
    "sizes_xlarge_filesize" numeric,
    "sizes_xlarge_filename" varchar,
    "sizes_og_url" varchar,
    "sizes_og_width" numeric,
    "sizes_og_height" numeric,
    "sizes_og_mime_type" varchar,
    "sizes_og_filesize" numeric,
    "sizes_og_filename" varchar
  );

  CREATE TABLE IF NOT EXISTS "payload_kv" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "data" jsonb NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "executed_at" timestamp(3) with time zone NOT NULL,
    "completed_at" timestamp(3) with time zone NOT NULL,
    "task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
    "task_i_d" varchar NOT NULL,
    "input" jsonb,
    "output" jsonb,
    "state" "enum_payload_jobs_log_state" NOT NULL,
    "error" jsonb
  );

  CREATE TABLE IF NOT EXISTS "payload_jobs" (
    "id" serial PRIMARY KEY NOT NULL,
    "input" jsonb,
    "completed_at" timestamp(3) with time zone,
    "total_tried" numeric DEFAULT 0,
    "has_error" boolean DEFAULT false,
    "error" jsonb,
    "task_slug" "enum_payload_jobs_task_slug",
    "queue" varchar DEFAULT 'default',
    "wait_until" timestamp(3) with time zone,
    "processing" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_folders_folder_type" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" "enum_payload_folders_folder_type",
    "id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_folders" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "folder_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "global_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer,
    "media_id" integer,
    "payload_folders_id" integer
  );

  CREATE TABLE IF NOT EXISTS "payload_preferences" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "users_id" integer
  );

  CREATE TABLE IF NOT EXISTS "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "portfolio_projects_featured_tags" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar
  );

  CREATE TABLE IF NOT EXISTS "portfolio_experience_entries" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "kind" "enum_portfolio_experience_entries_kind" DEFAULT 'role',
    "date_range" varchar,
    "title" varchar,
    "company" varchar,
    "summary" varchar
  );

  CREATE TABLE IF NOT EXISTS "portfolio_capabilities_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" "enum_portfolio_capabilities_items_icon",
    "title" varchar,
    "description" varchar
  );

  CREATE TABLE IF NOT EXISTS "portfolio_capabilities_tools" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar
  );

  CREATE TABLE IF NOT EXISTS "portfolio_training_groups_items" (
    "_order" integer NOT NULL,
    "_parent_id" varchar NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "label" varchar
  );

  CREATE TABLE IF NOT EXISTS "portfolio_training_groups" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "style" "enum_portfolio_training_groups_style",
    "icon" "enum_portfolio_training_groups_icon",
    "eyebrow" varchar,
    "title" varchar,
    "count" varchar
  );

  CREATE TABLE IF NOT EXISTS "portfolio" (
    "id" serial PRIMARY KEY NOT NULL,
    "identity_monogram" varchar,
    "identity_full_name" varchar,
    "identity_profession" varchar,
    "identity_email" varchar,
    "identity_location" varchar,
    "identity_availability" varchar,
    "identity_resume_id" integer,
    "identity_resume_label" varchar,
    "hero_eyebrow" varchar,
    "hero_headline" varchar,
    "hero_description" varchar,
    "hero_primary_action_label" varchar,
    "hero_secondary_action_label" varchar,
    "hero_image_id" integer,
    "hero_current_project_category" varchar,
    "hero_current_project_title" varchar,
    "hero_current_project_role" varchar,
    "hero_current_project_period" varchar,
    "projects_heading" varchar,
    "projects_featured_category" varchar,
    "projects_featured_title" varchar,
    "projects_featured_description" varchar,
    "projects_featured_period" varchar,
    "projects_featured_image_id" integer,
    "projects_additional_code" varchar,
    "projects_additional_category" varchar,
    "projects_additional_title" varchar,
    "projects_additional_description" varchar,
    "experience_heading" varchar,
    "capabilities_exposure" varchar,
    "training_heading" varchar,
    "contact_eyebrow" varchar,
    "contact_heading" varchar,
    "contact_subheading" varchar,
    "contact_footer_motto" varchar,
    "seo_title" varchar,
    "seo_description" varchar,
    "seo_image_id" integer,
    "seed_version" numeric,
    "_status" "enum_portfolio_status" DEFAULT 'draft',
    "updated_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v_version_projects_featured_tags" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v_version_experience_entries" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "kind" "enum__portfolio_v_version_experience_entries_kind" DEFAULT 'role',
    "date_range" varchar,
    "title" varchar,
    "company" varchar,
    "summary" varchar,
    "_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v_version_capabilities_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "icon" "enum__portfolio_v_version_capabilities_items_icon",
    "title" varchar,
    "description" varchar,
    "_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v_version_capabilities_tools" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v_version_training_groups_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "label" varchar,
    "_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v_version_training_groups" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "style" "enum__portfolio_v_version_training_groups_style",
    "icon" "enum__portfolio_v_version_training_groups_icon",
    "eyebrow" varchar,
    "title" varchar,
    "count" varchar,
    "_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_portfolio_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "version_identity_monogram" varchar,
    "version_identity_full_name" varchar,
    "version_identity_profession" varchar,
    "version_identity_email" varchar,
    "version_identity_location" varchar,
    "version_identity_availability" varchar,
    "version_identity_resume_id" integer,
    "version_identity_resume_label" varchar,
    "version_hero_eyebrow" varchar,
    "version_hero_headline" varchar,
    "version_hero_description" varchar,
    "version_hero_primary_action_label" varchar,
    "version_hero_secondary_action_label" varchar,
    "version_hero_image_id" integer,
    "version_hero_current_project_category" varchar,
    "version_hero_current_project_title" varchar,
    "version_hero_current_project_role" varchar,
    "version_hero_current_project_period" varchar,
    "version_projects_heading" varchar,
    "version_projects_featured_category" varchar,
    "version_projects_featured_title" varchar,
    "version_projects_featured_description" varchar,
    "version_projects_featured_period" varchar,
    "version_projects_featured_image_id" integer,
    "version_projects_additional_code" varchar,
    "version_projects_additional_category" varchar,
    "version_projects_additional_title" varchar,
    "version_projects_additional_description" varchar,
    "version_experience_heading" varchar,
    "version_capabilities_exposure" varchar,
    "version_training_heading" varchar,
    "version_contact_eyebrow" varchar,
    "version_contact_heading" varchar,
    "version_contact_subheading" varchar,
    "version_contact_footer_motto" varchar,
    "version_seo_title" varchar,
    "version_seo_description" varchar,
    "version_seo_image_id" integer,
    "version_seed_version" numeric,
    "version__status" "enum__portfolio_v_version_status" DEFAULT 'draft',
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean,
    "autosave" boolean
  );

  UPDATE "media"
  SET "alt" = COALESCE(NULLIF("filename", ''), 'Media asset')
  WHERE "alt" IS NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  DO $$ BEGIN
    ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  ALTER TABLE "portfolio_projects_featured_tags" ADD CONSTRAINT "portfolio_projects_featured_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_experience_entries" ADD CONSTRAINT "portfolio_experience_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_capabilities_items" ADD CONSTRAINT "portfolio_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_capabilities_tools" ADD CONSTRAINT "portfolio_capabilities_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_training_groups_items" ADD CONSTRAINT "portfolio_training_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_training_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_training_groups" ADD CONSTRAINT "portfolio_training_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_identity_resume_id_media_id_fk" FOREIGN KEY ("identity_resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_projects_featured_image_id_media_id_fk" FOREIGN KEY ("projects_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_projects_featured_tags" ADD CONSTRAINT "_portfolio_v_version_projects_featured_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_experience_entries" ADD CONSTRAINT "_portfolio_v_version_experience_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_capabilities_items" ADD CONSTRAINT "_portfolio_v_version_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_capabilities_tools" ADD CONSTRAINT "_portfolio_v_version_capabilities_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_training_groups_items" ADD CONSTRAINT "_portfolio_v_version_training_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v_version_training_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_version_training_groups" ADD CONSTRAINT "_portfolio_v_version_training_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_identity_resume_id_media_id_fk" FOREIGN KEY ("version_identity_resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_projects_featured_image_id_media_id_fk" FOREIGN KEY ("version_projects_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolio_v" ADD CONSTRAINT "_portfolio_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX IF NOT EXISTS "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "portfolio_projects_featured_tags_order_idx" ON "portfolio_projects_featured_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "portfolio_projects_featured_tags_parent_id_idx" ON "portfolio_projects_featured_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "portfolio_experience_entries_order_idx" ON "portfolio_experience_entries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "portfolio_experience_entries_parent_id_idx" ON "portfolio_experience_entries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "portfolio_capabilities_items_order_idx" ON "portfolio_capabilities_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "portfolio_capabilities_items_parent_id_idx" ON "portfolio_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "portfolio_capabilities_tools_order_idx" ON "portfolio_capabilities_tools" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "portfolio_capabilities_tools_parent_id_idx" ON "portfolio_capabilities_tools" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "portfolio_training_groups_items_order_idx" ON "portfolio_training_groups_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "portfolio_training_groups_items_parent_id_idx" ON "portfolio_training_groups_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "portfolio_training_groups_order_idx" ON "portfolio_training_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "portfolio_training_groups_parent_id_idx" ON "portfolio_training_groups" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "portfolio_identity_identity_resume_idx" ON "portfolio" USING btree ("identity_resume_id");
  CREATE INDEX IF NOT EXISTS "portfolio_hero_hero_image_idx" ON "portfolio" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "portfolio_projects_featured_projects_featured_image_idx" ON "portfolio" USING btree ("projects_featured_image_id");
  CREATE INDEX IF NOT EXISTS "portfolio_seo_seo_image_idx" ON "portfolio" USING btree ("seo_image_id");
  CREATE INDEX IF NOT EXISTS "portfolio__status_idx" ON "portfolio" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_projects_featured_tags_order_idx" ON "_portfolio_v_version_projects_featured_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_projects_featured_tags_parent_id_idx" ON "_portfolio_v_version_projects_featured_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_experience_entries_order_idx" ON "_portfolio_v_version_experience_entries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_experience_entries_parent_id_idx" ON "_portfolio_v_version_experience_entries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_capabilities_items_order_idx" ON "_portfolio_v_version_capabilities_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_capabilities_items_parent_id_idx" ON "_portfolio_v_version_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_capabilities_tools_order_idx" ON "_portfolio_v_version_capabilities_tools" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_capabilities_tools_parent_id_idx" ON "_portfolio_v_version_capabilities_tools" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_training_groups_items_order_idx" ON "_portfolio_v_version_training_groups_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_training_groups_items_parent_id_idx" ON "_portfolio_v_version_training_groups_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_training_groups_order_idx" ON "_portfolio_v_version_training_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_training_groups_parent_id_idx" ON "_portfolio_v_version_training_groups" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_identity_version_identity_resume_idx" ON "_portfolio_v" USING btree ("version_identity_resume_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_hero_version_hero_image_idx" ON "_portfolio_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_projects_featured_version_projects__idx" ON "_portfolio_v" USING btree ("version_projects_featured_image_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_seo_version_seo_image_idx" ON "_portfolio_v" USING btree ("version_seo_image_id");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_version_version__status_idx" ON "_portfolio_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_created_at_idx" ON "_portfolio_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_updated_at_idx" ON "_portfolio_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_latest_idx" ON "_portfolio_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_portfolio_v_autosave_idx" ON "_portfolio_v" USING btree ("autosave");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "portfolio_projects_featured_tags" CASCADE;
  DROP TABLE IF EXISTS "portfolio_experience_entries" CASCADE;
  DROP TABLE IF EXISTS "portfolio_capabilities_items" CASCADE;
  DROP TABLE IF EXISTS "portfolio_capabilities_tools" CASCADE;
  DROP TABLE IF EXISTS "portfolio_training_groups_items" CASCADE;
  DROP TABLE IF EXISTS "portfolio_training_groups" CASCADE;
  DROP TABLE IF EXISTS "portfolio" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v_version_projects_featured_tags" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v_version_experience_entries" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v_version_capabilities_items" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v_version_capabilities_tools" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v_version_training_groups_items" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v_version_training_groups" CASCADE;
  DROP TABLE IF EXISTS "_portfolio_v" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_portfolio_experience_entries_kind";
  DROP TYPE IF EXISTS "public"."enum_portfolio_capabilities_items_icon";
  DROP TYPE IF EXISTS "public"."enum_portfolio_training_groups_style";
  DROP TYPE IF EXISTS "public"."enum_portfolio_training_groups_icon";
  DROP TYPE IF EXISTS "public"."enum_portfolio_status";
  DROP TYPE IF EXISTS "public"."enum__portfolio_v_version_experience_entries_kind";
  DROP TYPE IF EXISTS "public"."enum__portfolio_v_version_capabilities_items_icon";
  DROP TYPE IF EXISTS "public"."enum__portfolio_v_version_training_groups_style";
  DROP TYPE IF EXISTS "public"."enum__portfolio_v_version_training_groups_icon";
  DROP TYPE IF EXISTS "public"."enum__portfolio_v_version_status";`)
}
