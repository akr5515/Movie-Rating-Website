import React from "react";
import { Link } from "react-router-dom";
import './footer.style.scss';

const Footer=()=>{
    return(
        <footer className="footer-distributed">

			<div className="footer-right">

				<a href="#"><i className="fa fa-facebook"></i></a>
				<a href="#"><i className="fa fa-twitter"></i></a>
				<a href="#"><i className="fa fa-linkedin"></i></a>
				<a href="#"><i className="fa fa-github"></i></a>

			</div>

			<div className="footer-left">

				<p className="footer-links">
					<Link activeClassName="navactive" to='/home'>
					Home
					</Link>

					
						
							<Link activeClassName="navactive" to='/category'>
								Categories
							</Link>
					

					
						<Link activeClassName="navactive" to='/newsfeed'>
							NewsFeed
						</Link>
					
					
					

					
           		 
				</p>

				<p className="creator">Creator Name &copy; Angkon Kumar Roy </p>
			</div>

		</footer>
    );
}

export default Footer;