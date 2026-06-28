export type SignupReqRes = {
    name: string;
    email: string;
    password: string;
    gender: string;
    date_of_birth: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access: string;
};

export type RefreshResponse = {
    access: string;
};

export type LogoutResponse = {
    message: string;
};

export type Profile = {
    name: string;
    gender: string;
    date_of_birth: string;
    phone_number?: string;
};
