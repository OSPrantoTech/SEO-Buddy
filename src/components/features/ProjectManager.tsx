/**
 * ============================================
 * PROJECT MANAGER COMPONENT
 * ============================================
 * Manage SEO projects, track history, and generate reports
 */

import { useState } from 'react';
import { 
  FolderOpen, Plus, Globe, Calendar, TrendingUp, TrendingDown, 
  Minus, MoreVertical, Trash2, Edit, BarChart3, FileText, X, Check
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import type { Project } from '../../types';

export function ProjectManager() {
  const { projects, addProject, deleteProject, activeProject, setActiveProject } = useApp();
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleCreateProject = () => {
    if (!newProjectName.trim() || !newProjectUrl.trim()) return;
    
    const project = addProject({
      name: newProjectName,
      url: newProjectUrl.startsWith('http') ? newProjectUrl : `https://${newProjectUrl}`,
      status: 'active'
    });
    
    setActiveProject(project);
    setShowNewProject(false);
    setNewProjectName('');
    setNewProjectUrl('');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      if (activeProject?.id === id) {
        setActiveProject(null);
      }
    }
  };

  const getScoreTrend = (project: Project) => {
    if (project.seoHistory.length < 2) return { trend: 'neutral', change: 0 };
    const latest = project.seoHistory[project.seoHistory.length - 1].score;
    const previous = project.seoHistory[project.seoHistory.length - 2].score;
    const change = latest - previous;
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      change: Math.abs(change)
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📁 Project Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your SEO projects and track progress over time
          </p>
        </div>
        <Button onClick={() => setShowNewProject(true)}>
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <Card className="p-6 border-2 border-indigo-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Create New Project</h3>
            <button 
              onClick={() => setShowNewProject(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="My Awesome Website"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website URL
              </label>
              <input
                type="url"
                value={newProjectUrl}
                onChange={(e) => setNewProjectUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateProject} className="flex-1">
                <Check className="w-4 h-4" />
                Create Project
              </Button>
              <Button variant="secondary" onClick={() => setShowNewProject(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Projects Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Create your first project to start tracking your website's SEO performance over time.
          </p>
          <Button onClick={() => setShowNewProject(true)}>
            <Plus className="w-4 h-4" />
            Create Your First Project
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const latestScore = project.seoHistory.length > 0 
              ? project.seoHistory[project.seoHistory.length - 1].score 
              : null;
            const trend = getScoreTrend(project);
            const isSelected = selectedProject === project.id;

            return (
              <Card 
                key={project.id} 
                className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  activeProject?.id === project.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setActiveProject(project)}
              >
                {/* Status Badge */}
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-lg ${
                  project.status === 'active' ? 'bg-green-500 text-white' :
                  project.status === 'completed' ? 'bg-blue-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {project.status}
                </div>

                <div className="p-6">
                  {/* Project Icon & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {project.name}
                      </h3>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline truncate block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.url.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>

                  {/* Score */}
                  {latestScore !== null ? (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-3xl font-bold ${getScoreColor(latestScore)}`}>
                          {latestScore}
                        </span>
                        <span className="text-gray-400">/100</span>
                      </div>
                      {trend.change > 0 && (
                        <div className={`flex items-center gap-1 text-sm ${
                          trend.trend === 'up' ? 'text-green-500' :
                          trend.trend === 'down' ? 'text-red-500' :
                          'text-gray-500'
                        }`}>
                          {trend.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                          {trend.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                          {trend.trend === 'neutral' && <Minus className="w-4 h-4" />}
                          <span>{trend.change > 0 ? `+${trend.change}` : trend.change}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        No analysis yet
                      </span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      <span>{project.seoHistory.length} analyses</span>
                    </div>
                    {project.lastAnalyzed && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.lastAnalyzed).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(isSelected ? null : project.id);
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Would navigate to report
                        }}
                      >
                        <FileText className="w-4 h-4" />
                        Report
                      </Button>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {isSelected && (
                    <div className="absolute bottom-20 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Would open edit modal
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Project
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Project
                      </button>
                    </div>
                  )}
                </div>

                {/* Score History Mini Chart */}
                {project.seoHistory.length > 1 && (
                  <div className="px-6 pb-4">
                    <div className="h-12 flex items-end gap-1">
                      {project.seoHistory.slice(-7).map((entry, index) => (
                        <div
                          key={entry.id}
                          className="flex-1 rounded-t"
                          style={{
                            height: `${entry.score}%`,
                            backgroundColor: entry.score >= 80 ? '#22c55e' :
                                           entry.score >= 60 ? '#eab308' :
                                           entry.score >= 40 ? '#f97316' : '#ef4444',
                            opacity: 0.5 + (index / 14)
                          }}
                          title={`${new Date(entry.date).toLocaleDateString()}: ${entry.score}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Active Project Detail */}
      {activeProject && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              {activeProject.name} - History
            </h3>
            <Button variant="secondary" size="sm" onClick={() => setActiveProject(null)}>
              <X className="w-4 h-4" />
              Close
            </Button>
          </div>

          {activeProject.seoHistory.length > 0 ? (
            <div className="space-y-4">
              {/* History Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Score</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Grade</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Critical</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Warnings</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Passed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeProject.seoHistory.slice().reverse().map((entry) => (
                      <tr key={entry.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">
                          {new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className={`py-3 px-4 text-center font-bold ${getScoreColor(entry.score)}`}>
                          {entry.score}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            entry.grade.startsWith('A') ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                            entry.grade === 'B' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                            'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                          }`}>
                            {entry.grade}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-red-500">{entry.summary.critical}</td>
                        <td className="py-3 px-4 text-center text-yellow-500">{entry.summary.warnings}</td>
                        <td className="py-3 px-4 text-center text-green-500">{entry.summary.passed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="secondary">
                  <BarChart3 className="w-4 h-4" />
                  View Full Report
                </Button>
                <Button variant="secondary">
                  <FileText className="w-4 h-4" />
                  Export PDF
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No analysis history yet. Run an SEO check on this project to start tracking.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
