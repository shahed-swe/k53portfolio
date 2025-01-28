import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
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
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/api';

interface Employee {
  id: number;
  name: string;
  designation: string;
  department: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
}

const departments = ['MANAGEMENT', 'DEVELOPMENT', 'DESIGN', 'MARKETING', 'SALES'];

const TeamManager = () => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (employee?: Employee) => {
    if (employee) {
      setCurrentEmployee(employee);
    } else {
      setCurrentEmployee(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee(null);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const employeeData = {
      name: formData.get('name'),
      designation: formData.get('designation'),
      department: formData.get('department'),
      bio: formData.get('bio'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      linkedin_url: formData.get('linkedin_url'),
      twitter_url: formData.get('twitter_url'),
      github_url: formData.get('github_url'),
    };

    try {
      if (currentEmployee) {
        await updateEmployee(currentEmployee.id, employeeData);
      } else {
        await createEmployee(employeeData);
      }
      fetchEmployees();
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Team Members</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Team Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={employee.image}
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{employee.name}</Typography>
                    <Typography color="textSecondary">{employee.designation}</Typography>
                  </Box>
                </Box>
                <Chip
                  label={employee.department}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {employee.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => handleOpen(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    size="small"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSave}>
          <DialogTitle>
            {currentEmployee ? 'Edit Team Member' : 'Add Team Member'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  defaultValue={currentEmployee?.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="designation"
                  label="Designation"
                  fullWidth
                  defaultValue={currentEmployee?.designation}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    defaultValue={currentEmployee?.department || ''}
                    label="Department"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue={currentEmployee?.bio}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  defaultValue={currentEmployee?.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone"
                  fullWidth
                  defaultValue={currentEmployee?.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="linkedin_url"
                  label="LinkedIn URL"
                  fullWidth
                  defaultValue={currentEmployee?.linkedin_url}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="twitter_url"
                  label="Twitter URL"
                  fullWidth
                  defaultValue={currentEmployee?.twitter_url}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="github_url"
                  label="GitHub URL"
                  fullWidth
                  defaultValue={currentEmployee?.github_url}
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
    </Box>
  );
};

export default TeamManager;
