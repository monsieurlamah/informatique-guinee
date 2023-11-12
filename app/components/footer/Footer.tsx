import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import {MdFacebook} from 'react-icons/md'
import {AiFillTwitterCircle, AiFillInstagram, AiFillYoutube} from 'react-icons/ai'

const Footer = () => {
    return ( 
        <footer className="
        bg-slate-700
        text-slate-200
        text-sm
        mt-16
        ">
            <Container>
                <div className="
                flex flex-col md:flex-row
                justify-between pt-16 pb-8
                ">
                    <FooterList>
                        <h3  className="text-base font-bold mb-2">Nos Catégories</h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Desktops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">Tvs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3  className="text-base font-bold mb-2">Service client</h3>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">Shipping Policy</Link>
                        <Link href="#">Returns & Exchanges</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3  className="text-base font-bold mb-2">About us</h3>
                        <p className="mb-2">Lorem Ipsum is simply dummy 
                        text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy 
                        text ever since the 1500s, when an unknown printer 
                        took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries,
                        Lorem Ipsum.</p>
                        <p>&copy; {new Date().getFullYear()} Tömou. All rights reserved</p>
                    </div>
                    <FooterList>
                    <h3  className="text-base font-bold mb-2">Follow Us</h3>
                    <div className="flex gap-2">
                        <Link href="#">
                            <MdFacebook size={24} />
                        </Link>
                        <Link href="#">
                            <AiFillTwitterCircle size={24} />
                        </Link>
                        <Link href="#">
                            <AiFillInstagram size={24} />
                        </Link>
                        <Link href="#">
                            <AiFillYoutube size={24} />
                        </Link>
                    </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
     );
}
 
export default Footer;