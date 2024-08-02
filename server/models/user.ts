interface User {
    userId: string;
    email: string;
    name: string;
    password: string;
    tokens: string[];
}

interface TestUser {
    email: string;
    password: string;
    name: string;
    accessToken?: string;
    refreshToken?: string;
}

export { User, TestUser };
