
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown, FaRegEye, FaExchangeAlt, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './wishlistcontext'
import { Cartcontext, useCart } from './cartcontext';


const categories = [
    "Boys Cloth",
    "Elactioncs",
    "farnicahr",
    "footwhere",
    "bycycle",
    "Components",
    "Software",
    "Phones & PDAs",
    "Cameras",
    "Keyboards"
];

const Categories = ({ userId }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [product, setProducts] = useState([])
    // const { addtocart } = useContext(Cartcontext)
    const { addtocart } = useCart();
    const { addToWishlist } = useContext(WishlistContext);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
                if (!response.ok) {
                    throw new Error('Network  response was not ok');
                }
                const data = await response.json();
                setProducts(data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, [])
    const fetchDataByCategory = async (category) => {
        try {
            const url = category === 'All'
                ? `https://api.escuelajs.co/api/v1/products`
                : `https://api.escuelajs.co/api/v1/products?categoryId=${category}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        // Map categories to IDs if the API requires it
        const categoryIdMap = {
            'Phones': 1,  // Example category IDs
            'Tablets': 2,
            'Smartphones': 3,
            'iPhone': 4,
            'Laptops': 5,
            'Components': 6,
            'Software': 7,
            'Phones & PDAs': 8,
            'Cameras': 9,
            'Keyboards': 10
        };

        // Fetch data based on selected category
        const selectedCategoryId = selectedCategory === 'All' ? 'All' : categoryIdMap[selectedCategory];
        fetchDataByCategory(selectedCategoryId);
    }, [selectedCategory]);


    return (
        <div>
            <section className="Categories product ">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay'></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Categories</h1> {/* Content on top of the overlay */}
                </div>
                <div className="container">
                    <div className="row col-12 flex-column flex-md-row flex-sm-row flex-xs-row">
                        <div className="col-12 col-md-4 col-sm-6 col-xs-12 text-decoration-none pt-5">
                            <div className=" border col-9 m-2 ">
                                <h3 className='text-bg-secondary text-center' >Categories</h3>
                                <ul>
                                    <li className="list_data" >
                                        <Link
                                            onClick={() => setSelectedCategory('All')}
                                            style={{ textDecoration: "none", color: "black" }}
                                        >
                                            All
                                        </Link>
                                    </li>
                                    {categories.map((cat, i) => (
                                        <li className="list_data" key={i}>
                                            <Link
                                                onClick={() => setSelectedCategory(cat)}
                                                style={{ textDecoration: "none", color: "black" }}
                                            >
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12  col-md-8 d-flex flex-wrap align-items-center flex-wrap mb-5 pt-5">
                            {
                                product.map((v, i) => (
                                    <Link key={i} to={`/category/${v.category.id}/productpage/${v.id}`} className="card col-12 col-sm-6 col-md-4 col-lg-3  m-3 text-decoration-none">
                                        <img src={v.images} className="card-img-top" alt={v.src} />
                                        <div className="card-body">
                                            <h5 className="card-title " >
                                                {v.title}</h5>
                                            <p className="card-text">
                                                ${v.price}
                                            </p>
                                            <div className="button-group d-flex align-items-center justify-content-center w-100">
                                                <Link onClick={() => addtocart(userId, v)} className='box border-0 mx-1 text-bg-light'>
                                                    <FaCartArrowDown />
                                                </Link>
                                                <Link to={`/productpage/${v.id}`} className='box border-0 mx-1 text-bg-light'>
                                                    <FaRegEye />
                                                </Link>
                                                <Link className='box border-0 mx-1 text-bg-light' onClick={addToWishlist}>
                                                    <FaHeart />
                                                </Link>
                                                <Link className='box border-0 mx-1 text-bg-light'>
                                                    <FaExchangeAlt />
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Categories;
