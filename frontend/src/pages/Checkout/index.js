import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Checkout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import config from '~/config';
import * as cartService from '~/services/cartService';
import * as billService from '~/services/billService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Checkout() {
    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(10);
    const [orderTotal, setOrderTotal] = useState(0);
    const [address, setAddress] = useState("");

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) navigate(config.routes.login);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await cartService.get(user._id);

            setItems(result.items);

            let subtotal = 0;
            result.items.forEach((item) => {
                subtotal += Number(item.product.price * item.quantity);
            });

            setSubtotal(subtotal);
        };
        setOrderTotal(subtotal + shipping);
        fetchApi();
    }, [user]);

    const handleDropdown = () => {
        const nextElement = document.getElementById('list-item');
        if (nextElement.style.display === 'block') {
            nextElement.style.display = 'none';
        } else {
            nextElement.style.display = 'block';
        }
    };

    const handleChangeShipMethod = (e) => {
        setShipping(Number(e.target.value));
        setOrderTotal(subtotal + Number(e.target.value));
    };

    const handlePlaceOrder = () => {
        const deleteCart = async () => {
            await cartService.deleteCart(user._id);
        }

        deleteCart();

        const addBill = async () => {
            let bill = {
                user: user,
                items: items,
                total: orderTotal,
                state: "0",
                address: address
            };
            await billService.post(bill);
        };
        addBill();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shipping')}>
                <div className={cx('shipping-address')}>
                    <label className={cx('shipping-address-label')}>Shipping Address</label>
                </div>
                <div className={cx('shipping-method')}>
                    <label className={cx('shipping-method-label')}>Shipping Method</label>
                    {subtotal >= 500 ? (
                        <div className={cx('method-options')}>
                            <div className={cx('option')}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="0"
                                    checked={shipping == 0}
                                    onChange={(e) => handleChangeShipMethod(e)}
                                />
                                <span>$0.00</span>
                                <label>Free Ship</label>
                            </div>
                            <div className={cx('option')}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="10"
                                    checked={shipping == 10}
                                    onChange={(e) => handleChangeShipMethod(e)}
                                />
                                <span>$10</span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('method-options')}>
                            <div className={cx('option')}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="10"
                                    checked={shipping == 10}
                                    onChange={(e) => handleChangeShipMethod(e)}
                                />
                                <label>$10</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('order-summary')}>
                <label className={cx('order-label')}>Order Summary</label>

                <div className={cx('money-group')}>
                    <span>Cart Subtotal</span>
                    <span>{subtotal}</span>
                </div>
                <div className={cx('money-group')}>
                    <span>Shipping</span>
                    <span>{shipping}</span>
                </div>
                <div className={cx('order-total')}>
                    <span>Order Total</span>
                    <span>${orderTotal}</span>
                </div>

                <div className={cx('item-dropdown')}>
                    <div className={cx('dropdown-label')} onClick={handleDropdown}>
                        {items.length} Items in Cart
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    <div className={cx('list-item')} id="list-item">
                        {items.map((item, index) => (
                            <div className={cx('item')} key={index}>
                                <img src={item.product.image} alt={item.product.name}></img>
                                <div className={cx('product-info')}>
                                    <span>{item.product.name}</span>
                                    <span>Qty: {item.quantity}</span>
                                    <span>${item.product.price * item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('btn-submit')}>
                    <Button to={config.routes.home} primary large onClick={handlePlaceOrder}>
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
