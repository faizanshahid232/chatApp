import React from "react";
import Header from "./Header";
import Connector from "./connector";

export default function MainPage() {
    return(
    <div className="bg-[#f5f5f5] relative h-screen">
        <div className="container mx-auto pt-5" style={{ maxWidth: '1530px' }}>
            <Header />
        </div>
        <div className="container mx-auto py-5 px-[2rem] md:px-[6rem] lg:px-[6rem] xl:px-[6rem] 2xl:px-[6rem] flex flex-col text-center" style={{ fontFamily: 'Poppins,sans-serif' }}>
            <h2 className="text-[#002a40] text-[48px] line-height-[56px] font-medium">Egold ANFT Miners</h2>
            <h3 className="text-[#655f7b] text-[30px] font-normal line-height-[45px] my-[25px]">Join the fastest-growing crypto mining network in the world and start collecting Egold instantly.</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3">
                <div></div>
                <div className="selectcurbtnsec pt-[24px]">
                    <a href="/register" className="btn-outline-color-secondary ">Sign Up</a>
                    <a href="/login" className="btn-color-primary">Login</a>
                </div>
                <div></div>
            </div>
            <div className="mt-[20px] grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3">
                <div></div>
                <div>
                    <Connector />
                </div>
                <div></div>
            </div>
        </div>
    </div>
    )
}