import { DELETE, GET, PATCH, POST, PUT } from "./api";

export const UploadProductImages = async (product_id: string, images: string[]) => {
    const formData = new FormData();
    formData.append('product_id', product_id);
    
    images.forEach(image => {
        formData.append('images', image);
    });

    const response = await POST('/products/images', formData, true);
    return response.data;
}
export const DeleteProductImages = async (images: string[]) => {
    const response = await POST('/products/images/delete', { images }, true);
    return response.data;
}

export const Read = async (filters?: {
    is_new?: boolean;
    accept_trade?: boolean;
    payment_methods?: ('pix' | 'card' | 'boleto' | 'cash' | 'deposit')[];
    query?: string;
}) => {
    const response = await GET('/products', true, { params: filters });
    return response.data;
}

export const Create = async (
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: ('pix' | 'card' | 'boleto' | 'cash' | 'deposit')[]
) => {
    const response = await POST('/products', {
        name,
        description,
        is_new,
        price,
        accept_trade,
        payment_methods
    }, true);
    return response.data;
}

export const GetProduct = async (id: string) => {
    const response = await GET(`/products/${id}`, true);
    return response.data;
}

export const Update = async (
    id: string,
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: ('pix' | 'card' | 'boleto' | 'cash' | 'deposit')[]
) => {
    const response = await PUT(`/products/${id}`, {
        name,
        description,
        is_new,
        price,
        accept_trade,
        payment_methods
    }, true);
    return response.data;
}

export const UpdateVisibility = async (id: string) => {
    const response = await PATCH(`/products/${id}`, {}, true);
    return response.data;
}

export const Delete = async (id: string) => {
    const response = await DELETE(`/products/${id}`, true);
    return response.data;
}

