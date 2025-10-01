const EnrollmentManagement = () => {
  const enrollmentsData = [
    { id: 1, course: 'React Fundamentals', student: 'Alice Johnson', date: '2023-05-15', status: 'Active' },
    { id: 2, course: 'React Fundamentals', student: 'Bob Smith', date: '2023-05-18', status: 'Active' },
    { id: 3, course: 'UI/UX Design', student: 'Charlie Brown', date: '2023-06-01', status: 'Completed' },
  ];

  const courseEnrollments = {
    'React Fundamentals': 45,
    'Advanced JavaScript': 0,
    'UI/UX Design': 32
  };

  const totalEnrollments = Object.values(courseEnrollments).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Enrollment Management</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Enrollments</h3>
          <p className="text-3xl font-bold">{totalEnrollments}</p>
        </div>
        {Object.entries(courseEnrollments).map(([course, count]) => (
          <div key={course} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 truncate">{course}</h3>
            <p className="text-3xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Recent Enrollments</h3>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
            Export as CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollmentsData.map(enrollment => (
                <tr key={enrollment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{enrollment.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{enrollment.student}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {enrollment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      enrollment.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentManagement;