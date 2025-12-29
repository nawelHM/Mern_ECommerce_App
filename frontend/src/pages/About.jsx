import React from 'react'
import Title from './../components/Title';
import logo from '../assets/logo.svg';
import NewsLetterBox from './../components/NewsLetterBox';

const About = () => {
  return (
    <div className="pt-8 border-t">
      <div className="text-2xl text-center">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img 
          className="w-full md:max-w-[450px]"
          src={logo}
          alt="About Logo"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Flipearn is a modern shopping platform built to offer a smooth, fast,
            and secure experience. Our goal is to make your shopping easier by
            providing carefully selected products with trusted quality and fair
            pricing.
          </p>
          <p>
            We focus on transparency, safe payments, and reliable delivery to ensure
            a seamless experience from order to doorstep. With constant innovation,
            Flipearn aims to create an online shopping journey that is simple,
            smart, and enjoyable for everyone.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            We are dedicated to building a shopping experience where users feel
            confident, informed, and inspired. Flipearn combines quality products,
            modern design, and trusted service to redefine online shopping.
          </p>
        </div>
      </div>

      <div className="text-2xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">

        {/* Quality */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance :</b>
          <p className="text-gray-600">
            Every item on Flipearn is hand-selected to ensure excellent quality.
            We collaborate with trusted suppliers and evaluate each product for
            durability, comfort, and performance. You receive items that truly
            deliver value — no surprises, no compromises.
          </p>
        </div>

        {/* Convenience */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience :</b>
          <p className="text-gray-600">
            From browsing to checkout, everything is designed to be simple and
            intuitive. Easy navigation, secure payments, and fast delivery allow
            you to shop with complete comfort and peace of mind.
          </p>
        </div>

        {/* Customer Service */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service :</b>
          <p className="text-gray-600">
            Our support team is always ready to help. Whether it’s guidance,
            product information, or resolving an issue, we ensure that you receive
            fast, friendly, and reliable assistance at every step.
          </p>
        </div>

      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
