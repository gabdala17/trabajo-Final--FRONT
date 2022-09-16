import React from 'react'
import {useDispatch} from 'react-redux';
import { orderByPrice } from '../../Redux-actions';
import Select from 'react-select'


function OrderByPrice() {
    let dispatch = useDispatch()
    let handleSelect=(value)=>{
      
      dispatch(orderByPrice(value.value))
    }
    const options=[
      {value:'minior', label:'menor precio'},
      {value:'mayor', label:'mayor precio'}
    ]
    return (
      <Select name='select' onChange={handleSelect} options={options} placeholder='Precio'/> 
  )
}

export default OrderByPrice