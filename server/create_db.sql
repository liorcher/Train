
CREATE TABLE "trAIn".users (
    user_id UUID PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    age INTEGER,
    weight DOUBLE PRECISION,
    height DOUBLE PRECISION,
    gender BOOLEAN,
    password TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    is_deleted BOOLEAN,
    activity_level VARCHAR(20) CHECK (activity_level IN ('very-active', 'active', 'sometimes active'))
);

CREATE TABLE "trAIn".goals (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES "trAIn".users(user_id),
    target_weight DOUBLE PRECISION,
    current_weight DOUBLE PRECISION,
    goal_type VARCHAR(20), 
    expected_progress_time_in_weeks INTEGER,
    workouts_amount_per_week INTEGER,
    creation_time	timestamp default now(),
    last_update_time timestamp default now(),
	is_deleted	boolean
);

CREATE TABLE "trAIn".preferred_foods (
    food_name TEXT PRIMARY KEY,
    food_type TEXT,
    calories DOUBLE PRECISION
);

CREATE TABLE "trAIn".allergies (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES "trAIn".users(user_id),
    food_type_key TEXT REFERENCES "trAIn".preferred_foods(food_name),
    is_deleted BOOLEAN
);

CREATE TABLE "trAIn".sports (
    name TEXT PRIMARY KEY,
    category VARCHAR(20)
);

CREATE TABLE "trAIn".food_menus (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES "trAIn".users(user_id),
    goal_id UUID REFERENCES "trAIn".goals(id),
    recipe TEXT,
    recipe_name TEXT,
    calories DOUBLE PRECISION,
    chat_prompt TEXT,
    chat_prompt_tokens JSON,
    response JSON,
    date TIMESTAMP,
    menu_time VARCHAR(20) CHECK (menu_time IN ('breakfast', 'lunch', 'dinner', 'snack')),
    is_deleted BOOLEAN
);

CREATE TABLE "trAIn".exercises (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES "trAIn".users(user_id),
    goal_id UUID REFERENCES "trAIn".goals(id),
    chat_prompt TEXT,
    chat_prompt_tokens JSON,
    response JSON,
    calories_burned INTEGER,
    date TIMESTAMP,
    is_deleted BOOLEAN
);