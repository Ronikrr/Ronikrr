import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/image/new_1.jpg'
import img2 from '../assets/image/new_2.jpg'
import img3 from '../assets/image/new_3.jpg'
import img4 from '../assets/image/new_4.jpg'

function New() {

    return (
        <div>
            <section className="new text-bg-light py-5 ">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-column flex-md-row  align-items-center justify-content-center">
                            <div className="col-3 col-md-3 flex-column d-flex flex-wrap mb-4 mb-md-0">
                                <Link to="" className='d-block mb-4' >
                                    <img src={img1} alt="" className='img-fluid' />
                                </Link>
                                <Link to="" className='d-block' >
                                    <img src={img2} alt="" className='img-fluid' />
                                </Link>
                            </div>
                            <div className="col-12 col-md-9 d-flex flex-column flex-md-row justify-content-center">
                                <div className="cms_bannr2 mx-0 mx-md-4 mb-4 mb-md-4">
                                    <Link to=""  >
                                        <img src={img3} alt=""className='img-fluid' />
                                    </Link>
                                </div>
                                <div className="cms_bannr3">
                                    <Link to="">
                                        <img src={img4} alt=""className='img-fluid' />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default New