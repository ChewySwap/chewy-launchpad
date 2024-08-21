'use client'
import { twitter, chartPage, telegram, website, pageTitle, footerLink, footerExt } from '../constants';


export default function Footer() {

    const home = () => {
        window.open(website);
    }

    const tweet = () => {
        window.open(twitter);
    }

    const dex = () => {
        window.open(chartPage);
    }

    const tg = () => {
        window.open(telegram);
    }

    return (

        <div className="boxWrap2Footer w-full">

            <div className="footer">
                <div className="logoF"><a href={footerLink}><img src={`/images/footerlogo.${footerExt}`} className="w-1/2 md:w-1/6" /></a></div>
                <div className="footer2 pt-5">
                    <div className="footerImg">
                        { /* <img onClick={home} src={homeL} /> */ }
                        <img onClick={home} src='/images/default/home.png' className="mr-3 transition-all hover:scale-110 hover:cursor-pointer" alt="Home" />
                        {chartPage && (<img onClick={dex} src='/images/default/dexscreener.png' className="mr-3 transition-all hover:scale-110 hover:cursor-pointer" alt="Chart Page" />)}
                        <img onClick={tweet} src='/images/default/twitter.png' className="mr-3 transition-all hover:scale-110 hover:cursor-pointer" alt="Twitter" />
                        <img onClick={tg} src='/images/default/telegram.png' className="transition-all hover:scale-110 hover:cursor-pointer" alt="Telegram" />

                    </div>
                    <div className="copyright pt-5">Copyright © {new Date().getFullYear()} {pageTitle}. All Rights Reserved</div>
                </div>

            </div>

        </div>
    )
}
