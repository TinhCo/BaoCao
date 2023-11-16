import React, { memo } from 'react'
import { formatModey, renderStarFromNumber } from '../../ultils/helpers'
import withBaseComponent from 'hocs/withBaseComponent'

const ProductCart = ({ price, totalRatings, title, image, pid, navigate, category }) => {
    return (
        <div
            onClick={(el) =>
                navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
            className='w-1/3 flex-auto cursor-pointer flex px-[10px] mb-[25px]'>
            <div className='flex w-full border'>
                <img src={image} alt="product" className='w-[130px] object-contain p-4' />
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full text-sm'>
                    <span className='line-clamp-1 capitalize text-sm hover:text-main' >{title?.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber(totalRatings, 15)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{`${formatModey(price)} VND`} </span>
                </div>

            </div>
        </div>
    )
}


export default withBaseComponent(memo(ProductCart))
