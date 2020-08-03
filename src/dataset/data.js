import React from 'react';
import './dataset.css';
import { Avatar } from 'antd'

function onChange(e) {
    console.log(`${e.target.id}  checked = ${e.target.checked} `);
}

const Datasets = ({ datasets }) => {

    return (
        <div className="row"  >

            {datasets.map((dataset) => (
                <div className="data text-center" key={dataset._id} >
                    <div className='max-width-150'>
                        <div className="box">
                            <input type="checkbox" id={dataset._id} name='dataset' onChange={onChange} />
                        </div>
                        <div className="avt">
                            <Avatar
                                shape="square"
                                size={150}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgHcNk4oVFWw82Cxa8Q2NKc1_NfcQ8EqPRAA&usqp=CAU"
                            />
                        </div>
                    </div>
                    <p className="text-center size-1-5 padding-top-1">{dataset.name}</p>
                </div>
            ))}
        </div>
    )
}





{/* // <div key={dataset._id} className=" col-xl-2 col-lg-3 col-md-4 col-sm-6 text-center">
                //     <div className="">
                //         <p > <span className="size-8"> <FolderFilled /></span> <br></br>
                //             <span className="size-1-5">
                //                 <input type='checkbox' id={dataset._id} name='dataset' onChange={onChange} />
                //                   &nbsp; {dataset.name}
                //             </span>
                //         </p>
                //     </div>
                // </div>
            ))
        }

    )
}; */}

export default Datasets