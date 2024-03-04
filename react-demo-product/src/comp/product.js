import React, { useEffect, useState } from 'react';
// import ProductData from './productData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";
import './style.css';
import axios from 'axios';

const Product = () => {

    const [detail, setDetail] = useState([]);
    const [displayDetail, setDisplayDetail] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState('');
    const [id, setId] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);
    const detailPage = (Product) =>
    {
        setDisplayDetail([{...Product}])
    }
    useEffect(() =>{
        axios.get("http://localhost:8080/Product-server/api/product").then((res) => setDetail(res.data)).catch((err) => alert(err))
    }, [detail]);
    const handleEdit = (id) => {
        const dt = detail.filter(item => item.id == id)
        if(dt !== undefined)
        {
            setIsUpdate(true);
            setId(id);
            setName(dt[0].name);
            setQuantity(dt[0].quantity);
            setPrice(dt[0].price);
            setDate(dt[0].createDate);

        }
    }
    const handleDelete = async (id) => {
        if(id>=0)
        {
            if(window.confirm ("Are you sure to delete this item?")){
                await axios.delete(`http://localhost:8080/Product-server/api/product?id=${id}`)
            }
        }
        console.log(detail);
        
    }
    const handleSave = (p) => {

        let error = '';
        if(name === '')
        error += 'Name is required, ';

        if(quantity <= 0)
        error += 'Quantity must be more than zero, ';

        if(error === ''){
            p.preventDefault();
        const dt = [...detail];
        const newObject = {
            id: detail.length+1,
		    productName: name,
		    quantity: quantity,
		    price: price,
		    createDate: date,
		    image: ' ./img/logo192.png',
        }
        dt.push(newObject);
        setDetail(dt);
        }else {
            alert(error)
        }
        
    }

    // const handleUpdate = async (id) => {
        // const res = await axios.put(
        //     `/api/products?id=${detail.id}&name=${detail.productName}&quantity=${detail.quantity}&price=${detail.price}`
        //   );
        //   setDetail(res.data)
        // const index = detail.map((item) => {
        //     return item.id
        // }).indexOf(id);
        
        // const dt = [...detail];
        // dt[index].productName = name;
        // dt[index].quantity = quantity;
        // dt[index].price = price;
        // // dt[index].createDate = date;

        // setDetail(dt);
        // handleClear();
    

    // }
    const handleClear = () => {
        setId(0);
            setName('');
            setQuantity(0);
            setPrice(0);
            setDate('');
    }
    return (
        <>  
        <div style = {{display: 'flex', justifyContent:'center', marginTop: '20px'}}>
            <div>
                <label>Product name:
                    <input type = 'text' placeholder='Enter name' onChange={(p) => setName(p.target.value)} value={name}></input>
                </label>
            </div>
            <div>
                <label>Quantity:
                    <input type = 'number' placeholder='Enter quantity' onChange={(p) => setQuantity(p.target.value)} value={quantity}></input>
                </label>
            </div>
            <div>
                <label>Price:
                    <input type = 'number' placeholder='Enter price' onChange={(p) => setPrice(p.target.value)} value={price}></input>
                </label>
            </div>

            <div>
                <label>Create Date:
                    <input type = 'date' placeholder='Enter created date' onChange={(p) => setDate(p.target.value)} value={date}></input>
                </label>
            </div>
            {
                !isUpdate ?
                <button className='btn btn-primary' onClick={(p) => handleSave(p)}>Create</button>
                :
                <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>

            }
            <button className='btn btn-bg-danger' onClick={() => handleClear()}>Clear</button>

        </div>
            <div className='detail_container'>
                <div>
                    {
                        displayDetail && displayDetail.map((x) =>
                        {
                            return(
                                <>
                                <div className='detail_info'>
                                    <h2>{x.productName}</h2>
                                    <h2>{x.quantity}</h2>
                                    <h2>{x.price}</h2>
                                </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className='container'>
                {detail.length > 0 ? detail.map((prod) => {
                    return (
                        <>
                            <div className='box'>
                                <div className='contant'>
                                    <div className="img-box">
                                        <img src={prod.image} style={{width: '300px', height: '300px'}} alt={prod.name}></img>
                                    </div>
                                    <div className='detail'>
                                        <div className='info'>
                                            
                                            <p>{prod.productName}</p>
                                            <p>{prod.price}</p>

                                        </div>
                                        <button className='btn btn-secondary' onClick={() => detailPage(prod)}>View</button>
                                        <button className='btn btn-secondary' onClick={() => handleDelete(prod.id)}>Delete</button>
                                        <button className='btn btn-secondary' onClick={() => handleEdit(prod.id)}>Update</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }) : ""}
            </div>
        </>
    )
}
export default Product;
