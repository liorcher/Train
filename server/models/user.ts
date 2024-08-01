interface User {
    userId: string;
    email: string;
    password: string;
    tokens: string[];
}

interface TestUser {
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
}

export { User, TestUser };
