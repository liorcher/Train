ALTER TABLE IF EXISTS "trAIn".goals DROP COLUMN IF EXISTS current_weight;

ALTER TABLE IF EXISTS "trAIn".goals DROP COLUMN IF EXISTS goal_type;

ALTER TABLE IF EXISTS "trAIn".goals
    ADD COLUMN workouts text[];

ALTER TABLE IF EXISTS "trAIn".goals
    ADD COLUMN days text[];

ALTER TABLE IF EXISTS "trAIn".goals
    ADD COLUMN goals text[];

ALTER TABLE IF EXISTS "trAIn".goals
    ADD COLUMN workout_duration_in_minutes integer;

ALTER TABLE IF EXISTS "trAIn".goals
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();