import React from 'react';

/* Styles */
import { CoverImage } from "./styles";


function Signup() {
    return (
        <div className="d-md-flex h-md-100 align-items-center">

            <div className="col-md-6 p-0  h-md-100">
                <CoverImage className="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                </CoverImage>
            </div>

            <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
                <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                    Second half content here
                </div>
            </div>

        </div>
    );
}

export default Signup;