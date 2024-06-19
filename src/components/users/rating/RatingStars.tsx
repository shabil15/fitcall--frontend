import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <span key={i} className="text-yellow-500">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.832L19.336 24 12 20.412 4.664 24 6 15.582 0 9.75l8.332-1.595z" />
          </svg>
        </span>
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <span key={i} className="text-yellow-500">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="gold" />
                <stop offset="50%" stopColor="lightgray" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M12 .587l3.668 7.568L24 9.75l-6 5.832L19.336 24 12 20.412 4.664 24 6 15.582 0 9.75l8.332-1.595z" />
          </svg>
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.832L19.336 24 12 20.412 4.664 24 6 15.582 0 9.75l8.332-1.595z" />
          </svg>
        </span>
      );
    }
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
