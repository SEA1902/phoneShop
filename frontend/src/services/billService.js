import * as httpRequest from '~/utils/httpRequest';

export const post = async (bill) => {
    try {
        await httpRequest.post('bill/create-bill', bill);
    } catch (error) {
        console.log(error);
    }
};

