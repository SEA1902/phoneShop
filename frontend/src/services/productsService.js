import * as httpRequest from '~/utils/httpRequest';

export const getProductList = async (page, size, company) => {
    try {
        const res = await httpRequest.get('product/get-product-list', {
            params: {
                page,
                size,
                company,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (productId) => {
    try {
        const res = await httpRequest.get('product/get-product/' + productId);
        return res;
    } catch (error) {
        console.log(error);
    }
};
