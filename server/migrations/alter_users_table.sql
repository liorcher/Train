CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE IF EXISTS "trAIn".users
    ALTER COLUMN password SET NOT NULL;

ALTER TABLE IF EXISTS "trAIn".users
    ALTER COLUMN email SET NOT NULL;

ALTER TABLE IF EXISTS "trAIn".users
    ADD COLUMN user_id uuid NOT NULL DEFAULT uuid_generate_v4();

ALTER TABLE IF EXISTS "trAIn".users
    ADD COLUMN tokens text[];

ALTER TABLE IF EXISTS "trAIn".users
    DROP COLUMN first_name,
    DROP COLUMN last_name,
    ADD COLUMN name text;

ALTER TABLE "trAIn".users
    ALTER COLUMN gender TYPE text;
ALTER TABLE IF EXISTS "trAIn".users DROP CONSTRAINT IF EXISTS users_activity_level_check;

ALTER TABLE IF EXISTS "trAIn".users
    ADD CONSTRAINT users_activity_level_check CHECK (activity_level::text = ANY (ARRAY['Beginner'::character varying, 'Intermediate'::character varying, 'Advanced'::character varying]::text[]))
    NOT VALID;

ALTER TABLE IF EXISTS "trAIn".users DROP CONSTRAINT IF EXISTS users_gender_check;

ALTER TABLE IF EXISTS "trAIn".users
    ADD CONSTRAINT users_gender_check CHECK (gender::text = ANY (ARRAY['Male'::character varying::text, 'Female'::character varying::text]))
    NOT VALID;