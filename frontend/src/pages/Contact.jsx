import React from 'react';
import Title from './../components/Title';
import contact from "../assets/contactus.png";
import NewsLetterBox from './../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="pt-10 border-t">
      
      {/* Title */}
      <div className="text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Image area */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img 
          className="w-full md:max-w-[480px]" 
          src={contact} 
          alt="Contact Us" 
        />
        <div className="flex flex-col justify-center items-start gap-6">
        <p className="font-semibold  text-xl text-gray-600">Our Store</p>
        <p className="text-gray-500">54709 Willms Station <br/> Suite 350 cité Nasser</p>
        <p className="text-gray-500">Tel: (+216) 22 222 222 <br /> Email: flipearn@gmail.com</p>
        <p className="font-semibold text-xl text-gray-600">Careers at Flipearn</p>
        <p className="text-gray-500">Learn more about our teams ans job openings.</p>
        <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white  transition-all duration-500">Explore Jobs</button>

        </div>
      </div>
    <NewsLetterBox/>
    </div>
  );
};

export default Contact;
