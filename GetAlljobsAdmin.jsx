// src/components/TalentsList.jsx
import React, { useEffect, useState } from "react";

const TalentsList = () => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/talents`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch talents");

        setTalents(data.talents || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  // Extract unique skills and job types for filters
  const allSkills = [...new Set(talents.flatMap(talent => talent.skills || []))];
  const allJobTypes = [...new Set(talents.flatMap(talent => talent.jobTypes || []))];

  // Filter talents based on search and filters
  const filteredTalents = talents.filter(talent => {
    const matchesSearch = talent.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = !filterSkill || (talent.skills && talent.skills.includes(filterSkill));
    const matchesJobType = !filterJobType || (talent.jobTypes && talent.jobTypes.includes(filterJobType));
    
    return matchesSearch && matchesSkill && matchesJobType;
  });

  // Handle view full profile
  const handleViewProfile = (talent) => {
    setSelectedTalent(talent);
    setShowModal(true);
  };

  // Loading skeleton component
  const SkeletonCard = () => (
    <div className="border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  // Talent Profile Modal
  const TalentProfileModal = ({ talent, onClose }) => {
    if (!talent) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{talent.fullName}'s Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column */}
              <div className="md:w-1/3">
                <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4 mx-auto">
                  {talent.fullName ? talent.fullName.charAt(0) : 'T'}
                </div>
                
                <h1 className="text-2xl font-bold text-center text-gray-900">{talent.fullName}</h1>
                <p className="text-gray-600 text-center">{talent.jobTitle}</p>
                <p className="text-gray-500 text-center">{talent.location}</p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-900">{talent.email || 'Not provided'}</p>
                  </div>
                  
                  {talent.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      <p className="text-gray-900">{talent.phone}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Job Types</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {talent.jobTypes?.length > 0 ? (
                        talent.jobTypes.map((type, i) => (
                          <span key={i} className="inline-block bg-purple-50 text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="md:w-2/3">
                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {talent.skills?.length > 0 ? (
                      talent.skills.map((skill, i) => (
                        <span key={i} className="inline-block bg-blue-50 text-primary text-sm font-medium px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
                
                {/* Education */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                  {talent.educations?.length > 0 ? (
                    <div className="space-y-4">
                      {talent.educations.map((edu, i) => (
                        <div key={i} className="border-l-4 border-primary pl-4 py-1">
                          <h4 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No education information</p>
                  )}
                </div>
                
                {/* Projects */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Projects</h3>
                  {talent.projects?.length > 0 ? (
                    <div className="space-y-4">
                      {talent.projects.map((proj, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900">{proj.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">{proj.year}</p>
                          <p className="text-gray-700 mb-3">{proj.description}</p>
                          {proj.projectUrl && (
                            <a
                              href={proj.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-primary hover:text-primary-dark text-sm"
                            >
                              View Project
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No projects listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Directory</h1>
            <p className="text-lg text-gray-600">Discover skilled professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">Error loading talents</h3>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Directory</h1>
          <p className="text-lg text-gray-600">Discover skilled professionals for your projects</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, title, or email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <select
                className="block w-full md:w-40 bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
              >
                <option value="">All Skills</option>
                {allSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              
              <select
                className="block w-full md:w-40 bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={filterJobType}
                onChange={(e) => setFilterJobType(e.target.value)}
              >
                <option value="">All Job Types</option>
                {allJobTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredTalents.length}</span> of <span className="font-semibold">{talents.length}</span> talents
          </p>
        </div>

        {/* Talents Grid */}
        {filteredTalents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No talents found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent) => (
              <div
                key={talent.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {talent.fullName ? talent.fullName.charAt(0) : 'T'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-gray-900 truncate">{talent.fullName || 'Unknown Talent'}</h2>
                    <p className="text-gray-600 truncate">{talent.jobTitle || 'No title provided'}</p>
                    <p className="text-sm text-gray-500 truncate">{talent.location || 'Location not specified'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="truncate">{talent.email || 'No email provided'}</span>
                  </div>
                  
                  {talent.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{talent.phone}</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                {talent.skills?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Skills</h3>
                    <div className="flex flex-wrap">
                      {talent.skills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="inline-block bg-blue-50 text-primary text-xs font-medium mr-1 mb-1 px-2.5 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                      {talent.skills.length > 4 && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          +{talent.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Job Types */}
                {talent.jobTypes?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Job Types</h3>
                    <div className="flex flex-wrap">
                      {talent.jobTypes.map((type, i) => (
                        <span key={i} className="inline-block bg-purple-50 text-secondary text-xs font-medium mr-1 mb-1 px-2.5 py-0.5 rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {talent.educations?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Education</h3>
                    <ul className="space-y-1">
                      {talent.educations.slice(0, 2).map((edu, i) => (
                        <li key={i} className="text-xs text-gray-600">
                          {edu.degree} in {edu.field} ({edu.year})
                        </li>
                      ))}
                      {talent.educations.length > 2 && (
                        <li className="text-xs text-gray-500">+{talent.educations.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <button 
                    onClick={() => handleViewProfile(talent)}
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    View Full Profile
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile Modal */}
        {showModal && (
          <TalentProfileModal 
            talent={selectedTalent} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default TalentsList;