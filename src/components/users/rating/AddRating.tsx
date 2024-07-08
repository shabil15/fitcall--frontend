// src/components/AddRating.tsx
import React, { useState } from 'react';
import { useAddRatingMutation } from '../../../slices/ratingApiSlice';
import { toast } from 'react-toastify';
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";


const AddRating: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [addRating] = useAddRatingMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async () => {
    try {
      const userId = userInfo?._id; 
      const trainerId = userInfo?.trainerId; 

      const response = await addRating({ user: userId, trainerId, rating, comment }).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error('Failed to submit rating');
      }
    }
  };

  return (
    <div className="flex items-center flex-col max-w-xl p-8 shadow-xl rounded-xl lg:p-12 bg-secondary text-white">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center">How was your experience?</span>
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                title={`Rate ${star} stars`}
                aria-label={`Rate ${star} stars`}
                onClick={() => setRating(star)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-10 h-10 ${rating >= star ? 'dark:text-yellow-500' : 'dark:text-gray-400'}`}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <textarea
            rows={3}
            placeholder="Message..."
            className="p-4 rounded-md resize-none bg-secondary shadow-lg"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="py-4 my-8 font-semibold rounded-md text-secondary bg-primary"
            onClick={handleSubmit}
          >
            Leave feedback
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <a rel="noopener noreferrer" href="#" className="text-sm dark:text-gray-600">Maybe later</a>
      </div>
    </div>
  );
};

export default AddRating;
