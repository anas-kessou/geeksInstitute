import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { getUser } from '../utils/auth';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      // Load courses
      const coursesResponse = await api.get('/courses/');
      setCourses(coursesResponse.data.courses);

      // Load grades
      const gradesResponse = await api.get(`/grades/student/${user.id}`);
      setGrades(gradesResponse.data.grades);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate average grade
  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.percentage, 0);
    return (total / grades.length).toFixed(2);
  };

  // Group grades by course
  const gradesByCourse = grades.reduce((acc, grade) => {
    if (!acc[grade.course_name]) {
      acc[grade.course_name] = [];
    }
    acc[grade.course_name].push(grade);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">View your courses and grades</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-600 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                    <p className="text-2xl font-bold text-gray-900">{grades.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-600 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Grade</p>
                    <p className="text-2xl font-bold text-gray-900">{calculateAverage()}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 ${
                      activeTab === 'overview'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
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
                    All Grades
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Grades by Course</h2>

                    {Object.keys(gradesByCourse).length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>No grades available yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {Object.entries(gradesByCourse).map(([courseName, courseGrades]) => {
                          const courseAvg =
                            courseGrades.reduce((sum, g) => sum + g.percentage, 0) / courseGrades.length;

                          return (
                            <div key={courseName} className="bg-gray-50 rounded-lg p-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">{courseName}</h3>
                                <span
                                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    courseAvg >= 90
                                      ? 'bg-green-100 text-green-800'
                                      : courseAvg >= 70
                                      ? 'bg-blue-100 text-blue-800'
                                      : courseAvg >= 50
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  Average: {courseAvg.toFixed(2)}%
                                </span>
                              </div>

                              <div className="space-y-3">
                                {courseGrades.map((grade) => (
                                  <div
                                    key={grade.id}
                                    className="bg-white rounded-lg p-4 flex justify-between items-center"
                                  >
                                    <div>
                                      <p className="font-medium text-gray-900">{grade.assignment_name}</p>
                                      {grade.comments && (
                                        <p className="text-sm text-gray-600 mt-1">{grade.comments}</p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <p className="text-lg font-bold text-gray-900">
                                        {grade.score} / {grade.max_score}
                                      </p>
                                      <p
                                        className={`text-sm font-semibold ${
                                          grade.percentage >= 90
                                            ? 'text-green-600'
                                            : grade.percentage >= 70
                                            ? 'text-blue-600'
                                            : grade.percentage >= 50
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                        }`}
                                      >
                                        {grade.percentage}%
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">My Enrolled Courses</h2>

                    {courses.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>You are not enrolled in any courses yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {course.code}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                            <p className="text-sm text-gray-500 mb-2">
                              <strong>Teacher:</strong> {course.teacher_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              <strong>Grade Level:</strong> {course.grade_level}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* All Grades Tab */}
                {activeTab === 'grades' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">All My Grades</h2>

                    {grades.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>No grades available yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
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
                                Comments
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {grades.map((grade) => (
                              <tr key={grade.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{grade.course_name}</div>
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
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-500">{grade.comments || '-'}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
