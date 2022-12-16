import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper";
const LandingPage = () => {
  return (
    <div className="">
      <div className=" flex flex-col">
        <div className="hero mt-12 ">
          <div className="mt-12 hero-content text-center">
            <div>
              <h1 className="text-6xl  text-black">Issue soulbound credentials</h1>
              <h1 className="text-3xl text-black mt-2">on XDC network</h1>

              <a href="/create" className="relative inline-block px-4 py-2 font-medium group mt-4 w-[200px] mx-auto">
                <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#eba5a6] border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#eba5a6]"></span>
                <span className="relative text-lg text-black">Create a credential</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-72">
          <div className="mb-24 ">
            <h1 className="text-2xl text-black ml-8">Featured Credentials</h1>
            <Swiper slidesPerView={5} spaceBetween={30} freeMode={true} modules={[FreeMode, Pagination]} className="mySwiper bg-white mt-2 border-t-[2px] border-b-[2px] border-[#f2dbd0] cursor-grab">
              <div className="py-12 px-12 grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-2 ">
                <div className="mt-4 ">
                  <SwiperSlide className="pt-12 pl-12 pb-12 ">
                    <label htmlFor="my-modal-1" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/logo-dark.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl  text-black mt-4">Dev Bootcamp by XDC </h1>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide className="pt-12 pl-12 pb-12">
                    <label htmlFor="my-modal-2" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/Globiance.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl  text-black mt-4">Globiance summit</h1>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide className="pt-12 pl-12 pb-12">
                    <label htmlFor="my-modal-3" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/ghostNFT.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl  text-black mt-4">Ghost Protocol lunch</h1>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide className="pt-12 pl-12 pb-12">
                    <label htmlFor="my-modal-4" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/ghostNFT2.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl text-black mt-4">Ghost Protocol airdrop </h1>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide className="pt-12 pl-12 pb-12">
                    <label htmlFor="my-modal-5" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/spring.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl  text-black mt-4">Spring Hackthon 2023 by XDC</h1>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide className="pt-12 pl-12 pb-12">
                    <label htmlFor="my-modal-6" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/festival.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl text-black mt-4">Developers Festival 2023 </h1>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide className="pt-12 pl-12 pb-12">
                    <label htmlFor="my-modal-7" className="col-span-1 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Image src="/gal.png" width={200} height={200} alt="yo" />
                        <h1 className="text-xl text-black mt-4">Story By ghost</h1>
                      </div>
                    </label>
                  </SwiperSlide>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Dev Bootcamp by XDC</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-1" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Globiance Summit</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-2" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">ghost Protocol lunch</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-3" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">ghost Protocol airdrop</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-4" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Spring Hackthon 2023 by XDC</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Developers Festival 2023</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">story by ghost</h3>
          <p className="py-4">more info here</p>
          <div className="modal-action">
            <label htmlFor="my-modal-7" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#bfbfbf] group-hover:-translate-x-0 group-hover:-translate-y-0 border-[2px] border-black"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#bfbfbf]"></span>
              <span className="relative text-black group-hover:text-black">close</span>
            </label>
          </div>
        </div>
      </div>

      <footer className="bg-[#ffffff]">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <h1 className="text-xl text-black">Made for XDC DEFI hackthon</h1>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
