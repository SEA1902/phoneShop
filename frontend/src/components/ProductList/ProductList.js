import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
import * as productsService from '~/services/productsService';
import Product from '~/components/Product';

const cx = classNames.bind(styles);

function ProductList({ company }) {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productsService.getProductList(page, size, company);
            
            setProducts(result.products);

            var arr = [];

            for (let i = 1; i <= result.totalPages; i++) {
                arr.push(
                    <button key={i} className={page === i ? cx('page-active') : ''} onClick={() => handlePage(i)}>
                        {i}
                    </button>,
                );
            }

            setPages(arr);
        };

        fetchApi();
    }, [page, size, company]);

    useEffect(() => {
        setPage(1);
    }, [company]);


    const handleSize = (size) => {
        setSize(size);
    };

    const handlePage = (i) => {
        setPage(i);
    };
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < pages.length) setPage(page + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('size')}>
                Show
                <select className={cx('select-size')} onChange={(e) => handleSize(e.target.value)} value={size}>
                    <option>8</option>
                    <option>16</option>
                    <option>32</option>
                </select>
                per page
            </div>

            <div className={cx('product-list')}>
                {products.map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </div>

            <div className={cx('pagination')}>
                <button onClick={handlePreviousPage}>&laquo;</button>
                {pages}
                <button onClick={handleNextPage}>&raquo;</button>
            </div>
        </div>
    );
}

export default ProductList;
