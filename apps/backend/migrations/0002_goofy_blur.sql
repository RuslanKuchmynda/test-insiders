CREATE TABLE "tripInvite" (
	"id" text PRIMARY KEY NOT NULL,
	"trip_id" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"accepted" timestamp
);
