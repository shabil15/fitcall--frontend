
import React, { useEffect, useState } from 'react';
import { useGetUserNotificationsMutation } from '../../slices/userApiSlice';
import {timeAgo} from '../../utils/timeAgo';

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string; 
}

interface NotificationsProps {
  userId: string;
}

const Notifications: React.FC<NotificationsProps> = ({ userId }) => {
  const [getUserNotifications, { isLoading, data, error }] = useGetUserNotificationsMutation();
  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await getUserNotifications(userId).unwrap();
        console.log("Fetched notifications:", result); // Debugging line

        setNotificationsData(result.user);
      } catch (err) {
        console.error("Failed to fetch notifications: ", err);
      }
    };

    fetchNotifications();
  }, [getUserNotifications, userId]);


  return (
    <div className='absolute right-0 shadow-lg bg-white py-4 z-[1000] min-w-full rounded-lg w-[410px] max-h-[50vh] overflow-auto mt-2 custom-scrollbar'>
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: none; /* For Firefox */
            -ms-overflow-style: none; /* For Internet Explorer and Edge */
          }

          .custom-scrollbar::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}
      </style>
      <div className="flex items-center justify-between px-4 mb-4">
        <p className="text-xs text-blue-600 cursor-pointer">Clear all</p>
        <p className="text-xs text-blue-600 cursor-pointer">Mark as read</p>
      </div>

      <ul className="divide-y">
        {notificationsData.length === 0 ? (
          <p className="text-center text-gray-500">No notifications</p>
        ) : (
          notificationsData.map((notification) => (
            <li key={notification._id} className='p-4 flex items-center hover:bg-gray-50 cursor-pointer'>
              <div className="ml-6">
                <h3 className="text-sm text-[#333] font-semibold">{notification.title}</h3>
                <p className="text-xs text-gray-500 mt-2">{notification.message}</p>
                <p className="text-xs text-blue-600 leading-3 mt-2">
                  {timeAgo(notification.createdAt)}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
      <p className="text-xs px-4 mt-6 mb-4 inline-block text-blue-600 cursor-pointer">View all Notifications</p>
    </div>
  );
};

export default Notifications;
