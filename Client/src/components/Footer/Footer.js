import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './Footer.css'
export default function Footer() {
    return(
        <>
        


	<div class="footer">
		<div class="inner-footer">

			<div class="footer-items">
				<h1>Computers & Codes</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>

			<div class="footer-items">
				<h2>Quick Links</h2>
				<div class="border"></div>
				<ul>
					<a href=""><li>Home</li></a>
					<a href=""><li>About Us</li></a>
					<a href=""><li>Services</li></a>
					<a href=""><li>Portfolio</li></a>
					<a href=""><li>Contact Us</li></a>
				</ul>
			</div>

			<div class="footer-items">
				<h2>Tutorials</h2>
				<div class="border"></div>
				<ul>
					<a href=""><li>HTML/CSS</li></a>
					<a href=""><li>Javascript</li></a>
					<a href=""><li>PHP</li></a>
					<a href=""><li>C</li></a>
					<a href=""><li>Java</li></a>
				</ul>
			</div>

			<div class="footer-items">
				<h2>Contact Us</h2>
				<div class="border"></div>
				<ul>
					<li><i class="fa fa-map-marker" aria-hidden="true"></i>1, XYZ Street, New Delhi</li>
					<li><i class="fa fa-phone" aria-hidden="true"></i>1234567890</li>
					<li><i class="fa fa-envelope" aria-hidden="true"></i>support@computers&codes.com</li>
				</ul>
				<div class="social-media">
					<a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
					<a href=""><i class="fa fa-twitter" aria-hidden="true"></i></a>
					<a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
					<a href=""><i class="fa fa-google-plus" aria-hidden="true"></i></a>
				</div>
			</div>
			
		</div>
		<div class="footer-bottom">
			Copyright &copy; Computers & Codes 2019. All rights reserved.
		</div>
	</div>
        </>
    )
}