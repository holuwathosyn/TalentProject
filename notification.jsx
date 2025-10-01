import { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New course published',
      message: 'The "Advanced React" course is now available',
      date: '2023-06-15',
      read: false,
      recipients: 'All students'
    },
    {
      id: 2,
      title: 'System maintenance',
      message: 'Scheduled maintenance on June 20th from 2-4 AM',
      date: '2023-06-10',
      read: true,
      recipients: 'All users'
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    recipients: 'all'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification(prev => ({ ...prev, [name]: value }));
  };

  const sendNotification = (e) => {
    e.preventDefault();
    const notification = {
      id: notifications.length + 1,
      title: newNotification.title,
      message: newNotification.message,
      date: new Date().toISOString().split('T')[0],
      read: false,
      recipients: newNotification.recipients === 'all' ? 'All students' : 'Selected courses'
    };
    setNotifications([notification, ...notifications]);
    setNewNotification({ title: '', message: '', recipients: 'all' });
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notifications & Announcements</h2>

      {/* Send Notification Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Send New Announcement</h3>
        <form onSubmit={sendNotification} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={newNotification.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={newNotification.message}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              rows="3"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Recipients</label>
            <select
              name="recipients"
              value={newNotification.recipients}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="all">All Students</option>
              <option value="selected">Selected Courses</option>
            </select>
          </div>
          
          {newNotification.recipients === 'selected' && (
            <div>
              <label className="block text-gray-700 mb-2">Select Courses</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600" />
                  <span className="ml-2">React Fundamentals</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-indigo-600" />
                  <span className="ml-2">Advanced JavaScript</span>
                </label>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Send Announcement
            </button>
          </div>
        </form>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Recent Announcements</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between">
                <h4 className="font-medium">{notification.title}</h4>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>
              <p className="text-gray-600 mt-1">{notification.message}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  Sent to: {notification.recipients}
                </span>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;