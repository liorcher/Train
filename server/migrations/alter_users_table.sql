CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE IF EXISTS "trAIn".users
    ALTER COLUMN password SET NOT NULL;

ALTER TABLE IF EXISTS "trAIn".users
    ALTER COLUMN email SET NOT NULL;

ALTER TABLE IF EXISTS "trAIn".users
    ADD COLUMN user_id uuid NOT NULL DEFAULT uuid_generate_v4();

ALTER TABLE IF EXISTS "trAIn".users
    ADD COLUMN tokens text[];