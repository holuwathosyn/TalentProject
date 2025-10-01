import { useState } from 'react';

const Settings = () => {
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [instructors, setInstructors] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' }
  ]);

  const [branding, setBranding] = useState({
    logo: '',
    primaryColor: '#4f46e5',
    secondaryColor: '#f9fafb'
  });

  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleBrandingChange = (e) => {
    const { name, value } = e.target;
    setBranding(prev => ({ ...prev, [name]: value }));
  };

  const handleInstructorChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor(prev => ({ ...prev, [name]: value }));
  };

  const addInstructor = (e) => {
    e.preventDefault();
    const instructor = {
      id: instructors.length + 1,
      name: newInstructor.name,
      email: newInstructor.email,
      status: 'Active'
    };
    setInstructors([...instructors, instructor]);
    setNewInstructor({ name: '', email: '' });
  };

  const toggleInstructorStatus = (id) => {
    setInstructors(instructors.map(instructor => 
      instructor.id === id 
        ? { ...instructor, status: instructor.status === 'Active' ? 'Inactive' : 'Active' } 
        : instructor
    ));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Admin Settings</h2>

      {/* Admin Profile */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Admin Profile</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={adminProfile.name}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={adminProfile.email}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-lg font-medium mb-3">Change Password</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={adminProfile.currentPassword}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={adminProfile.newPassword}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={adminProfile.confirmPassword}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Instructor Management */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Instructor Management</h3>
        
        {/* Add Instructor Form */}
        <form onSubmit={addInstructor} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newInstructor.name}
                onChange={handleInstructorChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={newInstructor.email}
                onChange={handleInstructorChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full"
              >
                Add Instructor
              </button>
            </div>
          </div>
        </form>
        
        {/* Instructors Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {instructors.map(instructor => (
                <tr key={instructor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{instructor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{instructor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      instructor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {instructor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => toggleInstructorStatus(instructor.id)}
                      className={`mr-3 ${instructor.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {instructor.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Branding Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Branding</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Logo</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                {branding.logo ? (
                  <img src={branding.logo} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-400">Logo</span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  onChange={(e) => setBranding({...branding, logo: URL.createObjectURL(e.target.files[0])})}
                />
                <label
                  htmlFor="logo-upload"
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Upload New Logo
                </label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="primaryColor"
                  value={branding.primaryColor}
                  onChange={handleBrandingChange}
                  className="w-12 h-12 cursor-pointer"
                />
                <span className="ml-2">{branding.primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Secondary Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="secondaryColor"
                  value={branding.secondaryColor}
                  onChange={handleBrandingChange}
                  className="w-12 h-12 cursor-pointer"
                />
                <span className="ml-2">{branding.secondaryColor}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Branding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;