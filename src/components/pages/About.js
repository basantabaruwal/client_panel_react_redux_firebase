import React from "react";
import { APP_NAME } from "../../config/app-constants";

export default () => {
  return (
    <div className="about-wrapper" style={{ width: "50%", margin: "0 auto" }}>
      <div className="col-md-12">
        {/* <!-- Card --> */}
        <div className="card card-cascade wider reverse my-4">
          {/* <!-- Card image --> */}
          <div className="view view-cascade overlay">
            <img
              className="card-img-top"
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
              alt="Card image cap"
            />
            <a href="#!">
              <div className="mask rgba-white-slight waves-effect waves-light"></div>
            </a>
          </div>

          {/* <!-- Card content --> */}
          <div className="card-body card-body-cascade text-center">
            {/* <!-- Title --> */}
            <h4 className="card-title text-danger">
              <strong>{APP_NAME}</strong>
            </h4>
            {/* <!-- Subtitle --> */}
            <h6 className="font-weight-bold purple-text py-2">
              React / Redux / Firebase
            </h6>
            {/* <!-- Text --> */}
            <p className="lead">
              This is a simple client management app based on react, redux and
              firebase.
            </p>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem perspiciatis voluptatum a, quo nobis, non commodi
              quia repellendus sequi nulla voluptatem dicta reprehenderit,
              placeat laborum ut beatae ullam suscipit veniam.
            </p>

            <p className="text-grey">Version: 1.0.0</p>

            {/* <!-- Linkedin --> */}
            <a className="px-2 fa-lg li-ic text-info">
              <i className="fab fa-linkedin-in"></i>
            </a>
            {/* <!-- Twitter --> */}
            <a className="px-2 fa-lg tw-ic text-info">
              <i className="fab fa-twitter"></i>
            </a>
            {/* <!-- Dribbble --> */}
            <a className="px-2 fa-lg fb-ic text-info">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
        {/* <!-- Card --> */}
      </div>
    </div>
  );
};
