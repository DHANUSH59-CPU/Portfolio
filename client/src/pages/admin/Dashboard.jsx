import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { publicAPI, adminAPI } from '../../services/api';
import {
  FiHome, FiUser, FiCode, FiFolder, FiBriefcase,
  FiBookOpen, FiMail, FiLogOut, FiExternalLink, FiPlus, FiTrash2,
} from 'react-icons/fi';
import './Dashboard.css';

const sidebarItems = [
  { key: 'hero', label: 'Hero', icon: <FiHome /> },
  { key: 'about', label: 'About', icon: <FiUser /> },
  { key: 'skills', label: 'Skills', icon: <FiCode /> },
  { key: 'projects', label: 'Projects', icon: <FiFolder /> },
  { key: 'experience', label: 'Experience', icon: <FiBriefcase /> },
  { key: 'education', label: 'Education', icon: <FiBookOpen /> },
  { key: 'contact', label: 'Contact', icon: <FiMail /> },
];

const Dashboard = () => {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/admin');
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [hero, about, skills, projects, experience, education, contact] = await Promise.all([
        publicAPI.getHero(), publicAPI.getAbout(), publicAPI.getSkills(),
        publicAPI.getProjects(), publicAPI.getExperience(), publicAPI.getEducation(),
        publicAPI.getContact(),
      ]);
      setData({
        hero: hero.data.data,
        about: about.data.data,
        skills: skills.data.data || [],
        projects: projects.data.data || [],
        experience: experience.data.data || [],
        education: education.data.data || [],
        contact: contact.data.data,
      });
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUpdateSingleton = async (section, updater) => {
    setSaving(true);
    try {
      await updater(data[section]);
      showMessage(`${section} updated successfully!`);
    } catch (err) {
      showMessage(`Error: ${err.response?.data?.message || err.message}`);
    }
    setSaving(false);
  };

  const handleAddItem = async (section, creator, defaults) => {
    setSaving(true);
    try {
      const res = await creator(defaults);
      setData((prev) => ({ ...prev, [section]: [...(prev[section] || []), res.data.data] }));
      showMessage('Item added!');
    } catch (err) {
      showMessage(`Error: ${err.message}`);
    }
    setSaving(false);
  };

  const handleUpdateItem = async (section, id, updater, itemData) => {
    setSaving(true);
    try {
      const res = await updater(id, itemData);
      setData((prev) => ({
        ...prev,
        [section]: prev[section].map((item) => (item._id === id ? res.data.data : item)),
      }));
      showMessage('Item updated!');
    } catch (err) {
      showMessage(`Error: ${err.message}`);
    }
    setSaving(false);
  };

  const handleDeleteItem = async (section, id, deleter) => {
    if (!confirm('Are you sure?')) return;
    setSaving(true);
    try {
      await deleter(id);
      setData((prev) => ({ ...prev, [section]: prev[section].filter((item) => item._id !== id) }));
      showMessage('Item deleted!');
    } catch (err) {
      showMessage(`Error: ${err.message}`);
    }
    setSaving(false);
  };

  const updateField = (section, field, value) => {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateItemField = (section, id, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  if (authLoading) return <div className="loader"><p>Loading...</p></div>;

  const renderEditor = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">Hero Section</h2>
            <div className="editor-card">
              <div className="form-group">
                <label>Greeting</label>
                <input className="form-input" value={data.hero?.greeting || ''} onChange={(e) => updateField('hero', 'greeting', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input className="form-input" value={data.hero?.name || ''} onChange={(e) => updateField('hero', 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Titles (comma-separated)</label>
                <input className="form-input" value={data.hero?.titles?.join(', ') || ''} onChange={(e) => updateField('hero', 'titles', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <textarea className="form-textarea" value={data.hero?.subtitle || ''} onChange={(e) => updateField('hero', 'subtitle', e.target.value)} />
              </div>
              <div className="editor-actions">
                <button className="btn-save" disabled={saving} onClick={() => handleUpdateSingleton('hero', adminAPI.updateHero)}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">About Section</h2>
            <div className="editor-card">
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-textarea" style={{ minHeight: 150 }} value={data.about?.description || ''} onChange={(e) => updateField('about', 'description', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Profile Image</label>
                {data.about?.image && (
                  <div style={{ marginBottom: 12, position: 'relative', display: 'inline-block' }}>
                    <img src={data.about.image} alt="Preview" style={{ width: 120, height: 150, objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                    <button className="btn-delete" style={{ position: 'absolute', top: 4, right: 4, padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => updateField('about', 'image', '')}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
                <input type="file" accept="image/*" className="form-input" style={{ padding: 8 }} onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => updateField('about', 'image', reader.result);
                    reader.readAsDataURL(file);
                  }
                }} />
              </div>
              <h3 style={{ marginBottom: 12 }}>Highlights</h3>
              {data.about?.highlights?.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <input className="form-input" placeholder="Label" value={h.label} onChange={(e) => {
                    const newH = [...data.about.highlights];
                    newH[i] = { ...newH[i], label: e.target.value };
                    updateField('about', 'highlights', newH);
                  }} />
                  <input className="form-input" placeholder="Value" value={h.value} onChange={(e) => {
                    const newH = [...data.about.highlights];
                    newH[i] = { ...newH[i], value: e.target.value };
                    updateField('about', 'highlights', newH);
                  }} />
                  <button className="btn-delete" style={{ flexShrink: 0, padding: '8px 12px' }} onClick={() => {
                    const newH = data.about.highlights.filter((_, idx) => idx !== i);
                    updateField('about', 'highlights', newH);
                  }}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button className="btn-add" style={{ marginTop: 8 }} onClick={() => updateField('about', 'highlights', [...(data.about?.highlights || []), { label: '', value: '' }])}>
                <FiPlus /> Add Highlight
              </button>
              <div className="editor-actions">
                <button className="btn-save" disabled={saving} onClick={() => handleUpdateSingleton('about', adminAPI.updateAbout)}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">Skills</h2>
            {data.skills?.map((skill) => (
              <div key={skill._id} className="editor-card">
                <div className="item-header">
                  <h3>{skill.name || 'New Skill'}</h3>
                  <button className="btn-delete" onClick={() => handleDeleteItem('skills', skill._id, adminAPI.deleteSkill)}>
                    <FiTrash2 />
                  </button>
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input className="form-input" value={skill.name} onChange={(e) => updateItemField('skills', skill._id, 'name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input className="form-input" value={skill.category} onChange={(e) => updateItemField('skills', skill._id, 'category', e.target.value)} />
                  </div>
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>Proficiency (0-100)</label>
                    <input className="form-input" type="number" min="0" max="100" value={skill.proficiency} onChange={(e) => updateItemField('skills', skill._id, 'proficiency', parseInt(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label>Order</label>
                    <input className="form-input" type="number" value={skill.order || 0} onChange={(e) => updateItemField('skills', skill._id, 'order', parseInt(e.target.value))} />
                  </div>
                </div>
                <div className="editor-actions">
                  <button className="btn-save" disabled={saving} onClick={() => handleUpdateItem('skills', skill._id, adminAPI.updateSkill, skill)}>Save</button>
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={() => handleAddItem('skills', adminAPI.createSkill, { name: 'New Skill', category: 'General', proficiency: 50 })}>
              <FiPlus /> Add Skill
            </button>
          </div>
        );

      case 'projects':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">Projects</h2>
            {data.projects?.map((project) => (
              <div key={project._id} className="editor-card">
                <div className="item-header">
                  <h3>{project.title || 'New Project'}</h3>
                  <button className="btn-delete" onClick={() => handleDeleteItem('projects', project._id, adminAPI.deleteProject)}>
                    <FiTrash2 />
                  </button>
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input className="form-input" value={project.title} onChange={(e) => updateItemField('projects', project._id, 'title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-textarea" value={project.description} onChange={(e) => updateItemField('projects', project._id, 'description', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Project Image</label>
                  {project.image && (
                    <div style={{ marginBottom: 12, position: 'relative', display: 'inline-block' }}>
                      <img src={project.image} alt="Preview" style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                      <button className="btn-delete" style={{ position: 'absolute', top: 4, right: 4, padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => updateItemField('projects', project._id, 'image', '')}>
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="form-input" style={{ padding: 8 }} onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => updateItemField('projects', project._id, 'image', reader.result);
                      reader.readAsDataURL(file);
                    }
                  }} />
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input className="form-input" value={project.githubUrl || ''} onChange={(e) => updateItemField('projects', project._id, 'githubUrl', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Live URL</label>
                    <input className="form-input" value={project.liveUrl || ''} onChange={(e) => updateItemField('projects', project._id, 'liveUrl', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tech Stack (comma-separated)</label>
                  <input className="form-input" value={project.techStack?.join(', ') || ''} onChange={(e) => updateItemField('projects', project._id, 'techStack', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>Featured?</label>
                    <select className="form-input" value={project.featured ? 'true' : 'false'} onChange={(e) => updateItemField('projects', project._id, 'featured', e.target.value === 'true')}>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Order</label>
                    <input className="form-input" type="number" value={project.order || 0} onChange={(e) => updateItemField('projects', project._id, 'order', parseInt(e.target.value))} />
                  </div>
                </div>
                <div className="editor-actions">
                  <button className="btn-save" disabled={saving} onClick={() => handleUpdateItem('projects', project._id, adminAPI.updateProject, project)}>Save</button>
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={() => handleAddItem('projects', adminAPI.createProject, { title: 'New Project', description: 'Describe your project here...' })}>
              <FiPlus /> Add Project
            </button>
          </div>
        );

      case 'experience':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">Experience</h2>
            {data.experience?.map((exp) => (
              <div key={exp._id} className="editor-card">
                <div className="item-header">
                  <h3>{exp.role || 'New Entry'} {exp.company ? `@ ${exp.company}` : ''}</h3>
                  <button className="btn-delete" onClick={() => handleDeleteItem('experience', exp._id, adminAPI.deleteExperience)}>
                    <FiTrash2 />
                  </button>
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>Role</label>
                    <input className="form-input" value={exp.role} onChange={(e) => updateItemField('experience', exp._id, 'role', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input className="form-input" value={exp.company} onChange={(e) => updateItemField('experience', exp._id, 'company', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input className="form-input" value={exp.duration} onChange={(e) => updateItemField('experience', exp._id, 'duration', e.target.value)} placeholder="e.g. Jan 2024 - Present" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-textarea" value={exp.description || ''} onChange={(e) => updateItemField('experience', exp._id, 'description', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Tech Stack (comma-separated)</label>
                  <input className="form-input" value={exp.techStack?.join(', ') || ''} onChange={(e) => updateItemField('experience', exp._id, 'techStack', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
                </div>
                <div className="editor-actions">
                  <button className="btn-save" disabled={saving} onClick={() => handleUpdateItem('experience', exp._id, adminAPI.updateExperience, exp)}>Save</button>
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={() => handleAddItem('experience', adminAPI.createExperience, { role: 'New Role', company: 'Company', duration: '2024 - Present' })}>
              <FiPlus /> Add Experience
            </button>
          </div>
        );

      case 'education':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">Education</h2>
            {data.education?.map((edu) => (
              <div key={edu._id} className="editor-card">
                <div className="item-header">
                  <h3>{edu.degree || 'New Entry'}</h3>
                  <button className="btn-delete" onClick={() => handleDeleteItem('education', edu._id, adminAPI.deleteEducation)}>
                    <FiTrash2 />
                  </button>
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>Degree</label>
                    <input className="form-input" value={edu.degree} onChange={(e) => updateItemField('education', edu._id, 'degree', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Field of Study</label>
                    <input className="form-input" value={edu.field || ''} onChange={(e) => updateItemField('education', edu._id, 'field', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Institution</label>
                  <input className="form-input" value={edu.institution} onChange={(e) => updateItemField('education', edu._id, 'institution', e.target.value)} />
                </div>
                <div className="editor-row">
                  <div className="form-group">
                    <label>Duration</label>
                    <input className="form-input" value={edu.duration} onChange={(e) => updateItemField('education', edu._id, 'duration', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Grade / CGPA</label>
                    <input className="form-input" value={edu.grade || ''} onChange={(e) => updateItemField('education', edu._id, 'grade', e.target.value)} />
                  </div>
                </div>
                <div className="editor-actions">
                  <button className="btn-save" disabled={saving} onClick={() => handleUpdateItem('education', edu._id, adminAPI.updateEducation, edu)}>Save</button>
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={() => handleAddItem('education', adminAPI.createEducation, { degree: 'New Degree', institution: 'Institution', duration: '2020 - 2024' })}>
              <FiPlus /> Add Education
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="editor-section">
            <h2 className="dashboard-title">Contact</h2>
            <div className="editor-card">
              <div className="editor-row">
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-input" value={data.contact?.email || ''} onChange={(e) => updateField('contact', 'email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input className="form-input" value={data.contact?.phone || ''} onChange={(e) => updateField('contact', 'phone', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input className="form-input" value={data.contact?.location || ''} onChange={(e) => updateField('contact', 'location', e.target.value)} />
              </div>
              <div className="editor-row">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input className="form-input" value={data.contact?.github || ''} onChange={(e) => updateField('contact', 'github', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input className="form-input" value={data.contact?.linkedin || ''} onChange={(e) => updateField('contact', 'linkedin', e.target.value)} />
                </div>
              </div>
              <div className="editor-row">
                <div className="form-group">
                  <label>Twitter URL</label>
                  <input className="form-input" value={data.contact?.twitter || ''} onChange={(e) => updateField('contact', 'twitter', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>LeetCode URL</label>
                  <input className="form-input" value={data.contact?.leetcode || ''} onChange={(e) => updateField('contact', 'leetcode', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Tagline</label>
                <input className="form-input" value={data.contact?.tagline || ''} onChange={(e) => updateField('contact', 'tagline', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Resume (PDF)</label>
                {data.contact?.resume && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '10px 16px', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,212,255,0.15)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', flex: 1 }}>
                      📄 {data.contact?.resumeFileName || 'resume.pdf'} uploaded
                    </span>
                    <button className="btn-delete" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => { updateField('contact', 'resume', ''); updateField('contact', 'resumeFileName', ''); }}>
                      <FiTrash2 />
                    </button>
                  </div>
                )}
                <input type="file" accept=".pdf" className="form-input" style={{ padding: 8 }} onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = reader.result.split(',')[1];
                      updateField('contact', 'resume', base64);
                      updateField('contact', 'resumeFileName', file.name);
                    };
                    reader.readAsDataURL(file);
                  }
                }} />
              </div>
              <div className="editor-actions">
                <button className="btn-save" disabled={saving} onClick={() => handleUpdateSingleton('contact', adminAPI.updateContact)}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="gradient-text">Portfolio Admin</h2>
          <p>Manage your content</p>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              className={`sidebar-link ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" target="_blank"><FiExternalLink /> View Portfolio</Link>
          <button onClick={() => { logout(); navigate('/admin'); }}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {message && <div className="success-msg">{message}</div>}
        {renderEditor()}
      </main>
    </div>
  );
};

export default Dashboard;
