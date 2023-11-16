import React, { useCallback, useEffect, useState } from 'react'
import { CustomizeVarriants, InputForm, Pagination } from 'components'
import { useForm } from 'react-hook-form'
import { apiGetProducts, apiDeleteProduct } from 'apis/product'
import moment from 'moment'
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce';
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import icons from 'ultils/icons'




const { BiEdit, RiDeleteBin6Line, BiCustomize } = icons
const ManageProducts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const { register, formState: { errors }, watch } = useForm();
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [editProduct, setEditProduct] = useState(null)
  const [update, setUpdate] = useState(false)
  const [customizeVarriants, setCustomizeVarriants] = useState(null)
  const render = useCallback(() => {
    setUpdate(!update)
  })

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT })
    if (response.success) {
      setCounts(response.counts)
      setProducts(response.products)
    }
  }
  const queryDecounce = useDebounce(watch('q'), 800)

  useEffect(() => {
    if (queryDecounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDecounce }).toString()
      })
    } else navigate({
      pathname: location.pathname,
    })
  }, [queryDecounce])
  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure remove this product',
      icon: 'warning',
      showCancelButton: true
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid)
        if (response.success) toast.success(response.mes)
        else toast.error(response.mes)
        render()
      }
    })
  }

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchProducts(searchParams)
  }, [params, update])

  return (
    <div className='w-full flex flex-col gap-4 relative '>
      {editProduct && <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
        <UpdateProduct
          editProduct={editProduct}
          render={render}
          setEditProduct={setEditProduct}

        />
      </div>}
      {customizeVarriants && <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
        <CustomizeVarriants
          customizeVarriants={customizeVarriants}
          render={render}
          setCustomizeVarriants={setCustomizeVarriants}

        />
      </div>}
      <div className='h-[69px] w-full'></div>
      <div className='p-4 border-b w-full flex bg-gray-100 justify-between items-center fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Manage products</h1>
      </div>
      <div className='flex w-full justify-end items-center px-4'>
        <form className='w-[45%]' >
          <InputForm
            id='q'
            register={register}
            errors={errors}
            fullwidth
            placeholder='Search products by title, description,...'
          />
        </form>
      </div>
      <table className='table-auto'>
        <thead>
          <tr className='border bg-sky-900 text-white border-white '>
            <th className='text-center py-2'>Order</th>
            <th className='text-center py-2'>Thumb</th>
            <th className='text-center py-2'>Title</th>
            <th className='text-center py-2'>Brand</th>
            <th className='text-center py-2'>Category</th>
            <th className='text-center py-2'>Price</th>
            <th className='text-center py-2'>Quantity</th>
            <th className='text-center py-2'>Sold</th>
            <th className='text-center py-2'>Color</th>
            <th className='text-center py-2'>Ratings</th>
            <th className='text-center py-2'>Varriants</th>
            <th className='text-center py-2'>UpdatedAt</th>
            <th className='text-center py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
            <tr className='border-b' key={el._id}>
              <td className='text-center py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + idx + 1}</td>
              <td className='text-center py-2'>
                <img src={el.thumb} alt="thumb" className='w-12 h-12 object-cover' />
              </td>
              <td className='text-center py-2'>{el.title}</td>
              <td className='text-center py-2'>{el.brand}</td>
              <td className='text-center py-2'>{el.category}</td>
              <td className='text-center py-2'>{el.price}</td>
              <td className='text-center py-2'>{el.quantity}</td>
              <td className='text-center py-2'>{el.sold}</td>
              <td className='text-center py-2'>{el.color}</td>
              <td className='text-center py-2'>{el.totalRatings}</td>
              <td className='text-center py-2'>{el?.varriants?.length || 0}</td>
              <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
              <td className='text-center py-2'>
                <span onClick={() => setEditProduct(el)} className='text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1'><BiEdit size={25} /></span>
                <span onClick={() => handleDeleteProduct(el._id)} className='text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1'><RiDeleteBin6Line size={25} /></span>
                <span onClick={() => setCustomizeVarriants(el)} className='text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1'><BiCustomize size={25} /></span>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts} />
      </div>
    </div>
  );

}

export default ManageProducts
