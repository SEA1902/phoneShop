import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useState } from 'react';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('search')}>
            <input
                ref={inputRef}
                value={searchValue}
                placeholder="Search Products"
                spellCheck={false}
                onChange={handleChange}
            />
            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                <SearchIcon />
            </button>
        </div>
    );
}

export default Search;
