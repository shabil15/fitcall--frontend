import { useState } from "react";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Leroy Jenkins",
      date: "2 days ago",
      rating: 4.5,
      avatarUrl: "https://source.unsplash.com/100x100/?portrait",
      reviewText:
        "Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu dictum lectus consequat vitae. Etiam ut dolor id justo fringilla finibus.",
    },
    {
      name: "John Doe",
      date: "1 week ago",
      rating: 3.8,
      avatarUrl: "",
      reviewText:
        "Donec eget ultricies diam, eu molestie arcu. Etiam nec lacus eu mauris cursus venenatis. Maecenas gravida urna vitae accumsan feugiat. Vestibulum commodo, ante sit urna purus rutrum sem.",
    },
    {
      name: "Jane Smith",
      date: "3 weeks ago",
      rating: 4.2,
      avatarUrl: "",
      reviewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec est sit amet magna rutrum pharetra. Cras lacinia fringilla mauris, vitae ullamcorper nisl aliquet nec.",
    },
  ]);

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md bg-secondary shadow-2xl text-white">
          <div className="flex justify-between p-4">
            <div className="flex space-x-4">
              <div>
                <img
                  src={ "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}
                  alt=""
                  className="object-cover w-12 h-12 rounded-full d"
                />
              </div>
              <div>
                <h4 className="font-bold">{review.name}</h4>
                <span className="text-xs ">{review.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
              </svg>
              <span className="text-xl font-bold">{review.rating}</span>
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm ">
            <p>{review.reviewText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
