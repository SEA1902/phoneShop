import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductList from '~/components/ProductList';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [company, setCompany] = useState('Samsung');

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                <button className={company === 'Samsung' ? cx('active') : cx('')} onClick={() => setCompany('Samsung')}>
                    Samsung
                </button>
                <button className={company === 'Google' ? cx('active') : cx('')} onClick={() => setCompany('Google')}>
                    Iphone
                </button>
            </nav>
            <ProductList company={company} />
        </div>
    );
}

export default Home;
