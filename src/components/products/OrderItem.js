// OrderItem.js
import SelectQuantity from 'components/common/SelectQuantity';
import React, { useEffect, useState } from 'react';
import { formatModey } from 'ultils/helpers';
import { updateCart } from 'store/user/userSlice';
import withBaseComponent from 'hocs/withBaseComponent';

const OrderItem = ({ dispatch, color, defaultQuantity = 1, price, title, thumbnail, pid }) => {
    const [quantity, setQuantity] = useState(() => defaultQuantity);
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number);
    };
    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return;
        if (flag === 'minus') setQuantity((prev) => +prev - 1);
        if (flag === 'plus') setQuantity((prev) => +prev + 1);
    };
    useEffect(() => {
        dispatch(updateCart({ pid, quantity, color }));
    }, [quantity]);

    return (
        <div className='w-main mx-auto font-bold  py-3 grid grid-cols-10'>
            <span className='col-span-6 w-full text-center'>
                <div className='flex gap-2 px-4 py-3'>
                    <img src={thumbnail} alt='thumb' className='w-40 h-40 object-cover' />
                    <div className='flex flex-col items-start gap-1'>
                        <span className='text-sm text-main'>{title}</span>
                        <span className='text-[13px] font-main'>{color}</span>
                    </div>
                </div>
            </span>
            <span className='col-span-1 w-full text-center '>
                <div className='flex items-center h-full'>
                    <SelectQuantity
                        quantity={quantity}
                        handleQuantity={handleQuantity}
                        handleChangeQuantity={handleChangeQuantity}
                    />
                </div>
            </span>
            <span className='col-span-3 w-full flex items-center justify-center text-center'>
                <span className='text-lg'>{formatModey(price * quantity) + 'VND'}</span>
            </span>
        </div>
    );
};

export default withBaseComponent(OrderItem);
