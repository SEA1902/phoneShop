import * as httpRequest from '~/utils/httpRequest'

export const search = async (query) => {
    try {
        const res = await httpRequest.post('product/search', {
            query: query
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}