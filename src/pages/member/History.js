import { apiGetUserOrders } from 'apis';
import { CustomSelect, InputForm, Pagination } from 'components';
import withBaseComponent from 'hocs/withBaseComponent';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { statusOrders } from 'ultils/contants';

const History = ({ navigate, location }) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams()
  const { register, formState: { errors }, watch } = useForm();
  const q = watch('q');
  const status = watch('status');

  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params])
    fetchOrders(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString()
    });
  };


  return (
    <div className='w-full flex flex-col gap-4 relative '>
      <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>
        History
      </header>
      <div className='flex justify-end items-center px-4 '>
        <form className='w-[45%] grid grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <InputForm
              id='q'
              register={register}
              errors={errors}
              fullwidth
              placeholder='Search order by status,...'
            />
          </div>
          <div className='col-span-1 flex items-center'>
            <CustomSelect
              options={statusOrders}
              value={status}
              onChange={(value) => handleSearchStatus(value)}
              wrapClassname='w-full'
            />
          </div>
        </form>
      </div>

      <table className='table-auto w-full'>
        <thead>
          <tr className='border bg-sky-900 text-white border-white '>
            <th className='text-center py-2'>#</th>
            <th className='text-center py-2'>Products</th>
            <th className='text-center py-2'>Total</th>
            <th className='text-center py-2'>Status</th>
            <th className='text-center py-2'>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr className='border-b' key={el._id}>
              <td className='text-center py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + idx + 1}</td>

              <td className='text-center max-w-[500px] py-2'>
                <span className='grid grid-cols-4 gap-4'>
                  {el.products?.map(item => (
                    <div key={item._id} className='flex col-span-1 items-center gap-2'>
                      <img
                        src={item.thumbnail}
                        alt="thumb"
                        className='w-8 h-8 rounded-md object-cover'
                      />
                      <div className='flex flex-col'>
                        <span className='text-main text-sm'>{item.title}</span>
                        <span className='flex items-center text-xs gap-2'>
                          <span>Quantity:</span>
                          <span className='text-main'>{item.quantity}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </span>
              </td>

              <td className='text-center py-2'>{el.total + '💲'}</td>
              <td className='text-center py-2'>{el.status}</td>
              <td className='text-center py-2'>{moment(el.createdAt)?.format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBaseComponent(History);
