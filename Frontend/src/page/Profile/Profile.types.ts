import { Profile } from '@service';

export type ProfileEditForm = {
    name: string;
    gender: string;
    dob: string;
    phoneNumber: string;
};

export type ProfileFormErrorType = Partial<
    Record<keyof ProfileEditForm, string[]>
>;

export type ProfileServerError = Partial<Record<keyof Profile, string[]>>;
