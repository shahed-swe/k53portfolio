import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Autocomplete,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { getProjects, createProject, updateProject, deleteProject, getEmployees } from '../services/api';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  client: string;
  start_date: string;
  end_date: string | null;
  status: string;
  technologies: string[];
  project_url: string;
  github_url: string;
  team_members: number[];
}

interface Employee {
  id: number;
  name: string;
  designation: string;
}

const STATUS_CHOICES = [
  { value: 'ONGOING', label: 'Ongoing' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
];

const CATEGORIES = [
  'Web Development',
  'Mobile App',
  'Desktop Application',
  'UI/UX Design',
  'Cloud Infrastructure',
  'DevOps',
];

const COMMON_TECHNOLOGIES = [
  'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Django',
  'Flask', 'Java', 'Spring Boot', 'PHP', 'Laravel', 'MySQL',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'Google Cloud', 'TypeScript', 'JavaScript',
  'HTML/CSS', 'Swift', 'Kotlin', 'Flutter', 'React Native'
];

const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  return date.toISOString().split('T')[0];
};

const parseDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;
  return new Date(dateStr);
};

const ProjectsManager = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleOpen = (project?: Project) => {
    if (project) {
      setCurrentProject(project);
      setSelectedTechnologies(project.technologies);
      setSelectedTeamMembers(project.team_members);
      setStartDate(parseDate(project.start_date));
      setEndDate(parseDate(project.end_date));
    } else {
      setCurrentProject(null);
      setSelectedTechnologies([]);
      setSelectedTeamMembers([]);
      setStartDate(null);
      setEndDate(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProject(null);
    setSelectedTechnologies([]);
    setSelectedTeamMembers([]);
    setStartDate(null);
    setEndDate(null);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      client: formData.get('client') as string,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      status: formData.get('status') as string,
      technologies: selectedTechnologies,
      project_url: formData.get('project_url') as string,
      github_url: formData.get('github_url') as string,
      team_members: selectedTeamMembers,
    };

    try {
      if (currentProject) {
        await updateProject(currentProject.id, projectData);
      } else {
        await createProject(projectData);
      }
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return 'primary';
      case 'COMPLETED':
        return 'success';
      case 'MAINTENANCE':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Typography>Loading projects...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ m: 0 }}>Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card sx={{ height: '100%' }}>
              {project.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
              )}
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status) as any}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip label={project.category} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Client: {project.client}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {new Date(project.start_date).toLocaleDateString()} - 
                  {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Present'}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => handleOpen(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    size="small"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSave}>
          <DialogTitle>
            {currentProject ? 'Edit Project' : 'Add Project'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  fullWidth
                  defaultValue={currentProject?.title}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue={currentProject?.description}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    label="Category"
                    defaultValue={currentProject?.category || ''}
                  >
                    {CATEGORIES.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="client"
                  label="Client"
                  fullWidth
                  defaultValue={currentProject?.client}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    label="Status"
                    defaultValue={currentProject?.status || ''}
                  >
                    {STATUS_CHOICES.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={COMMON_TECHNOLOGIES}
                  value={selectedTechnologies}
                  onChange={(_, newValue) => setSelectedTechnologies(newValue)}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Technologies"
                      placeholder="Add technology"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={employees}
                  value={employees.filter(emp => selectedTeamMembers.includes(emp.id))}
                  onChange={(_, newValue) => {
                    setSelectedTeamMembers(newValue.map(emp => emp.id));
                  }}
                  getOptionLabel={(option) => `${option.name} (${option.designation})`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Team Members"
                      placeholder="Add team member"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="project_url"
                  label="Project URL"
                  fullWidth
                  defaultValue={currentProject?.project_url}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="github_url"
                  label="GitHub URL"
                  fullWidth
                  defaultValue={currentProject?.github_url}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProjectsManager;
