export type tUser = {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: string;
    registration_timestamp: number;
    photo: string;
}

export type tUserInitialState = {
    success: boolean;
    fetchStatus: {
        status: 'success' | 'loading' | 'error' | null;
        error: string | null;
    }
    postStatus: {
        status: 'success' | 'loading' | 'error';
        error: string | null;
    }
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: {
        next_url: string | null;
        prev_url: string | null;
    }
    users: Array<tUser>;
}

export type tPosition = {
    id: number;
    name: string;
}

export type tUserFormData = {
    name: string;
    email: string;
    phone: string;
    position_id: number;
    photo: File;
}
