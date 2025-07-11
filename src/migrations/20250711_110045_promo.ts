import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_category_slider_category_card_type" AS ENUM('card01', 'card02', 'card03', 'card04', 'card05', 'card06', 'card07');
  CREATE TYPE "public"."enum_pages_blocks_promo_block_promo_type" AS ENUM('promo1', 'promo2', 'promo3');
  CREATE TYPE "public"."enum__pages_v_blocks_category_slider_category_card_type" AS ENUM('card01', 'card02', 'card03', 'card04', 'card05', 'card06', 'card07');
  CREATE TYPE "public"."enum__pages_v_blocks_promo_block_promo_type" AS ENUM('promo1', 'promo2', 'promo3');
  CREATE TABLE "pages_blocks_category_slider_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_category_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_card_type" "enum_pages_blocks_category_slider_category_card_type" DEFAULT 'card07',
  	"heading" varchar,
  	"sub_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promo_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"promo_type" "enum_pages_blocks_promo_block_promo_type",
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"image_dark_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_slider_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_card_type" "enum__pages_v_blocks_category_slider_category_card_type" DEFAULT 'card07',
  	"heading" varchar,
  	"sub_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promo_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"promo_type" "enum__pages_v_blocks_promo_block_promo_type",
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"image_dark_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "settings" ADD COLUMN "logo_search_input_id" integer;
  ALTER TABLE "pages_blocks_category_slider_data" ADD CONSTRAINT "pages_blocks_category_slider_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_category_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_slider" ADD CONSTRAINT "pages_blocks_category_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_block" ADD CONSTRAINT "pages_blocks_promo_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_block" ADD CONSTRAINT "pages_blocks_promo_block_image_dark_id_media_id_fk" FOREIGN KEY ("image_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_promo_block" ADD CONSTRAINT "pages_blocks_promo_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_slider_data" ADD CONSTRAINT "_pages_v_blocks_category_slider_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_category_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_slider" ADD CONSTRAINT "_pages_v_blocks_category_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promo_block" ADD CONSTRAINT "_pages_v_blocks_promo_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promo_block" ADD CONSTRAINT "_pages_v_blocks_promo_block_image_dark_id_media_id_fk" FOREIGN KEY ("image_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promo_block" ADD CONSTRAINT "_pages_v_blocks_promo_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_category_slider_data_order_idx" ON "pages_blocks_category_slider_data" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_slider_data_parent_id_idx" ON "pages_blocks_category_slider_data" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_slider_order_idx" ON "pages_blocks_category_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_slider_parent_id_idx" ON "pages_blocks_category_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_slider_path_idx" ON "pages_blocks_category_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_promo_block_order_idx" ON "pages_blocks_promo_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_promo_block_parent_id_idx" ON "pages_blocks_promo_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promo_block_path_idx" ON "pages_blocks_promo_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_promo_block_image_idx" ON "pages_blocks_promo_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_promo_block_image_dark_idx" ON "pages_blocks_promo_block" USING btree ("image_dark_id");
  CREATE INDEX "_pages_v_blocks_category_slider_data_order_idx" ON "_pages_v_blocks_category_slider_data" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_slider_data_parent_id_idx" ON "_pages_v_blocks_category_slider_data" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_slider_order_idx" ON "_pages_v_blocks_category_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_slider_parent_id_idx" ON "_pages_v_blocks_category_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_slider_path_idx" ON "_pages_v_blocks_category_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_promo_block_order_idx" ON "_pages_v_blocks_promo_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promo_block_parent_id_idx" ON "_pages_v_blocks_promo_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promo_block_path_idx" ON "_pages_v_blocks_promo_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_promo_block_image_idx" ON "_pages_v_blocks_promo_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_promo_block_image_dark_idx" ON "_pages_v_blocks_promo_block" USING btree ("image_dark_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_search_input_id_media_id_fk" FOREIGN KEY ("logo_search_input_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_rels_product_categories_id_idx" ON "pages_rels" USING btree ("product_categories_id");
  CREATE INDEX "_pages_v_rels_product_categories_id_idx" ON "_pages_v_rels" USING btree ("product_categories_id");
  CREATE INDEX "settings_logo_search_input_idx" ON "settings" USING btree ("logo_search_input_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_category_slider_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_category_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_promo_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_category_slider_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_category_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_promo_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_category_slider_data" CASCADE;
  DROP TABLE "pages_blocks_category_slider" CASCADE;
  DROP TABLE "pages_blocks_promo_block" CASCADE;
  DROP TABLE "_pages_v_blocks_category_slider_data" CASCADE;
  DROP TABLE "_pages_v_blocks_category_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_promo_block" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_product_categories_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_product_categories_fk";
  
  ALTER TABLE "settings" DROP CONSTRAINT "settings_logo_search_input_id_media_id_fk";
  
  DROP INDEX "pages_rels_product_categories_id_idx";
  DROP INDEX "_pages_v_rels_product_categories_id_idx";
  DROP INDEX "settings_logo_search_input_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "product_categories_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "product_categories_id";
  ALTER TABLE "settings" DROP COLUMN "logo_search_input_id";
  DROP TYPE "public"."enum_pages_blocks_category_slider_category_card_type";
  DROP TYPE "public"."enum_pages_blocks_promo_block_promo_type";
  DROP TYPE "public"."enum__pages_v_blocks_category_slider_category_card_type";
  DROP TYPE "public"."enum__pages_v_blocks_promo_block_promo_type";`)
}
