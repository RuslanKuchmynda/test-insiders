ALTER TABLE "user" ADD COLUMN "isEmailVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerifyToken" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerifyTokenExpiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "passwordResetToken" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "passwordResetExpires" timestamp;