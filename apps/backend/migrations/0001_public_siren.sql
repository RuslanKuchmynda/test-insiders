CREATE TABLE "place" (
	"id" text PRIMARY KEY NOT NULL,
	"trip_id" text NOT NULL,
	"location_name" varchar(255) NOT NULL,
	"notes" text,
	"day_number" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tripCollaborator" (
	"id" text PRIMARY KEY NOT NULL,
	"trip_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" "roles" DEFAULT 'collaborator' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"start_date" timestamp,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'::text;--> statement-breakpoint
ALTER TABLE "tripCollaborator" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tripCollaborator" ALTER COLUMN "role" SET DEFAULT 'collaborator'::text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('user', 'owner', 'collaborator');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'::"public"."roles";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";--> statement-breakpoint
ALTER TABLE "tripCollaborator" ALTER COLUMN "role" SET DEFAULT 'collaborator'::"public"."roles";--> statement-breakpoint
ALTER TABLE "tripCollaborator" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";