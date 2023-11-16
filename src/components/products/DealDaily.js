// import React, { useState, useEffect, memo } from 'react';
// import icons from '../ultils/icons';
// import { apiGetProducts } from '../apis/product';
// import { formatModey, renderStarFromNumber } from '../ultils/helpers';
// import Countdown from './Countdown';

// const { AiFillStar, IoMenu } = icons;
// let idInterval;
// const DealDaily = () => {
//     const [DealDaily, setDealDaily] = useState(null);
//     const [hour, setHour] = useState(0);
//     const [minute, setMinute] = useState(0);
//     const [second, setSecond] = useState(0);
//     const [expireTime, setExpireTime] = useState(false);

//     const fetchDealDaily = async () => {
//         const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 5), totalRatings: 5 });
//         if (response.success) {
//             setDealDaily(response.products[0]);
//             setHour(1);
//             setMinute(1);
//             setSecond(1);
//             setExpireTime(false); // Đặt lại expireTime thành false
//         }
//     }

//     useEffect(() => {
//         idInterval && clearInterval(idInterval);
//         fetchDealDaily()
//     }, [expireTime]);

//     useEffect(() => {
//         idInterval = setInterval(() => {
//             if (second > 0) {
//                 setSecond((prev) => prev - 1);
//             } else {
//                 if (minute > 0) {
//                     setMinute((prev) => prev - 1);
//                     setSecond(1);
//                 } else {
//                     if (hour > 0) {
//                         setHour((prev) => prev - 1);
//                         setMinute(1);
//                         setSecond(1);
//                     } else {
//                         setExpireTime(!expireTime);
//                     }
//                 }
//             }
//         }, 1000);

//         return () => {
//             clearInterval(idInterval);
//         };
//     }, [hour, minute, second, expireTime]);

//     const price = DealDaily?.price || 0;

//     return (
//         <div className="border w-full flex-auto">
//             <div className="flex items-center justify-between p-4">
//                 <span className="flex-1 flex justify-center">
//                     <AiFillStar size={20} color="#DD1111" />
//                 </span>
//                 <span className="flex-8 font-semibold text-2xl text-gray-700 text-center">
//                     DEAL DAILY
//                 </span>
//                 <span className="flex-1"></span>
//             </div>
//             <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
//                 <img src={DealDaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
//                     alt="" className='w-full object-contain ' />
//                 <span className='line-clamp-1 text-center hover:text-main'>{DealDaily?.title}</span>
//                 <span className='flex h-4'>{renderStarFromNumber(DealDaily?.totalRatings, 22)?.map((el, index) => (
//                     <span key={index}>{el}</span>
//                 ))}</span>
//                 <span>{`${formatModey(price)} VNĐ`} </span>
//             </div>
//             <div className='px-4 mt-8'>
//                 <div className='flex justify-center gap-2 items-center mb-4'>
//                     <Countdown unit={'Hours'} number={hour} />
//                     <Countdown unit={'Minutes'} number={minute} />
//                     <Countdown unit={'Seconds'} number={second} />
//                 </div>

//                 <button type='button' className='flex gap-2 items-center justify-center w-full bg-main hover:bg-slate-800 text-white font-medium py-2'>
//                     <IoMenu />
//                     <span>Options</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default memo(DealDaily);




import React, { useState, useEffect, memo, } from 'react';
import icons from 'ultils/icons';
import { apiGetProducts } from 'apis/product';
import { formatModey, renderStarFromNumber, secondsToHms } from 'ultils/helpers';
import Countdown from '../common/Countdown';
import moment from 'moment';

const { AiFillStar, IoMenu } = icons;
let idInterval;
const DealDaily = () => {
    const [DealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 5), totalRatings: 5 });
        if (response.success) {
            setDealDaily(response.products[0]);

            const today = `${moment().format('MM/DD/YYYY')} 00:00:00`
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
            const number = secondsToHms(seconds)
            setHour(number.h)
            setMinute(number.m)
            setSecond(number.s)
        } else {
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }
    useEffect(() => {
        idInterval && clearInterval(idInterval);
        fetchDealDaily()
    }, [expireTime]);

    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) {
                setSecond((prev) => prev - 1);
            } else {
                if (minute > 0) {
                    setMinute((prev) => prev - 1);
                    setSecond(59);
                } else {
                    if (hour > 0) {
                        setHour((prev) => prev - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(idInterval);
        };
    }, [hour, minute, second, expireTime]);

    const price = DealDaily?.price || 0;

    return (
        <div className="border w-full flex-auto">
            <div className="flex items-center justify-between p-4">
                <span className="flex-1 flex justify-center">
                    <AiFillStar size={20} color="#DD1111" />
                </span>
                <span className="flex-8 font-semibold text-2xl text-gray-700 text-center">
                    DEAL DAILY
                </span>
                <span className="flex-1"></span>
            </div>
            <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                <img src={DealDaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt="" className='w-full object-contain ' />
                <span className='line-clamp-1 text-center hover:text-main'>{DealDaily?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(DealDaily?.totalRatings, 22)?.map((el, index) => (
                    <span key={index}>{el}</span>
                ))}</span>
                <span>{`${formatModey(price)} VND`} </span>
            </div>
            <div className='px-4 mt-8'>
                <div className='flex justify-center gap-2 items-center mb-4'>
                    <Countdown unit={'Hours'} number={hour} />
                    <Countdown unit={'Minutes'} number={minute} />
                    <Countdown unit={'Seconds'} number={second} />
                </div>
                <button type='button' className='flex gap-2 items-center justify-center w-full bg-main hover:bg-slate-800 text-white font-medium py-2'>
                    <IoMenu />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);
