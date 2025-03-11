import React from "react";
import Slider from "react-slick";
import '../Style/Review.css'

const reviews = [
  {id:1,
    name: "Anna",
    date: "June 1, 2022",
    review: "Delicious baked goods, friendly service, and a warm and inviting atmosphere. I highly recommend the croissants and chocolate chip cookies!",
    likes: 5
  },
  {id:2,
    name: "David",
    date: "May 15, 2022",
    review: "The almond croissants are to die for! This place is a hidden gem in the heart of the city.",
    likes: 3,
    dislikes: 1
  },
  {id:3,
    name: "Emily",
    date: "April 28, 2022",
    review: "I'm obsessed with the cranberry walnut bread. It's the perfect balance of sweet and savory. I'll definitely be back for more!",
    likes: 4
  },
  {id:4,
    name: "Michael",
    date: "April 10, 2022",
    review: "The cinnamon rolls are absolute perfection. They're soft, fluffy, and loaded with gooey cinnamon goodness. Each bite is pure bliss!",
    likes: 6
  }
];

const ReviewSlider = () => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    slidesToShow: 2, // Show two reviews at a time
    slidesToScroll: 1, // Scroll one review at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500, // Transition interval (in milliseconds)
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show one review at a time on smaller screens
        },
      },
    ],
  };

  return (
    <div className="review-slider mt-7 shadow-xl">
 <h2 className="text-[#201A09] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">What Our Customers Say</h2> 
 <hr/>
 <br/>
      <Slider {...settings} className="shadow-lg">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
          <div className="flex-1">
              <p className="text-[#201A09] text-base font-bold leading-normal">@ {review.name}</p>
              <p className="text-[#A07D1C] text-sm font-normal leading-normal">{review.date}</p>
            </div>
            <p>- {review.review}</p>
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-12">
    <button className="max-w-fit px-4 py-2 bg-[#FAC638] text-[#AB2217] text-lg font-bold rounded-full">
      ➕ Add Your Review
    </button>
  </div>
    </div>
  );
};

export default ReviewSlider;
