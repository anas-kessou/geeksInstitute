import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { getUser } from '../utils/auth';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = getUser();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'courses') {
        const response = await api.get('/courses/');
        setCourses(response.data.courses);
      } else if (activeTab === 'grades') {
        const response = await api.get('/grades/');
        setGrades(response.data.grades);
      } else if (activeTab === 'students') {
        const response = await api.get('/users/students');
        setStudents(response.data.students);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, course = null) => {
    setModalType(type);
    setSelectedCourse(course);
    setShowModal(true);
    setError('');
    setSuccess('');

    if (type === 'createCourse') {
      setFormData({
        name: '',
        code: '',
        description: '',
        teacher_id: user.id,
        grade_level: '',
      });
    } else if (type === 'createGrade') {
      setFormData({
        student_id: '',
        course_id: course?.id || '',
        score: '',
        max_score: '100',
        assignment_name: '',
        comments: '',
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedCourse(null);
    setFormData({});
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (modalType === 'createCourse') {
        await api.post('/courses/', formData);
        setSuccess('Course created successfully');
        loadData();
        setTimeout(closeModal, 1500);
      } else if (modalType === 'createGrade') {
        await api.post('/grades/', formData);
        setSuccess('Grade added successfully');
        loadData();
        setTimeout(closeModal, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'course') {
        await api.delete(`/courses/${id}`);
      } else if (type === 'grade') {
        await api.delete(`/grades/${id}`);
      }
      setSuccess('Item deleted successfully');
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your courses and student grades</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'courses'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Courses
              </button>
              <button
                onClick={() => setActiveTab('grades')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'grades'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Grades
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'students'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Students
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            ) : (
              <>
                {/* Courses Tab */}
                {activeTab === 'courses' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                      <button
                        onClick={() => openModal('createCourse')}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        + Create Course
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map((course) => (
                        <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {course.code}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                          <p className="text-sm text-gray-500 mb-4">
                            <strong>Grade:</strong> {course.grade_level}
                          </p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal('createGrade', course)}
                              className="flex-1 bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Add Grade
                            </button>
                            <button
                              onClick={() => handleDelete('course', course.id)}
                              className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {courses.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <p>No courses found. Create your first course!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Grades Tab */}
                {activeTab === 'grades' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Student Grades</h2>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Student
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Course
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Assignment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Score
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Percentage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {grades.map((grade) => (
                            <tr key={grade.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{grade.student_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{grade.course_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{grade.assignment_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {grade.score} / {grade.max_score}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    grade.percentage >= 90
                                      ? 'bg-green-100 text-green-800'
                                      : grade.percentage >= 70
                                      ? 'bg-blue-100 text-blue-800'
                                      : grade.percentage >= 50
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {grade.percentage}%
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleDelete('grade', grade.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {grades.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <p>No grades found.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">All Students</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {students.map((student) => (
                        <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-4">
                            <div className="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                              {student.first_name[0]}{student.last_name[0]}
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {student.first_name} {student.last_name}
                              </h3>
                              <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            <strong>Username:</strong> {student.username}
                          </p>
                        </div>
                      ))}
                    </div>

                    {students.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <p>No students found.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {modalType === 'createCourse' && 'Create New Course'}
                {modalType === 'createGrade' && `Add Grade for ${selectedCourse?.name}`}
              </h3>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {modalType === 'createCourse' && (
                  <>
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Course Code"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                    />
                    <input
                      type="text"
                      placeholder="Grade Level (e.g., Grade 10)"
                      value={formData.grade_level || ''}
                      onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </>
                )}

                {modalType === 'createGrade' && (
                  <>
                    <input
                      type="number"
                      placeholder="Student ID"
                      value={formData.student_id || ''}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Assignment Name"
                      value={formData.assignment_name || ''}
                      onChange={(e) => setFormData({ ...formData, assignment_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Score"
                        value={formData.score || ''}
                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Max Score"
                        value={formData.max_score || ''}
                        onChange={(e) => setFormData({ ...formData, max_score: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Comments (optional)"
                      value={formData.comments || ''}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                    />
                  </>
                )}

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {modalType === 'createCourse' ? 'Create' : 'Add Grade'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
