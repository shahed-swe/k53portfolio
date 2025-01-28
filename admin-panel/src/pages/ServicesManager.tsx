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
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Code as CodeIcon,
  Brush as BrushIcon,
  Build as BuildIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { getServices, createService, updateService, deleteService } from '../services/api';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const iconOptions = [
  { name: 'Code', icon: <CodeIcon /> },
  { name: 'Brush', icon: <BrushIcon /> },
  { name: 'Build', icon: <BuildIcon /> },
  { name: 'Storage', icon: <StorageIcon /> },
  { name: 'Cloud', icon: <CloudIcon /> },
  { name: 'Phone', icon: <PhoneIcon /> },
];

const ServicesManager = () => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (service?: Service) => {
    if (service) {
      setCurrentService(service);
    } else {
      setCurrentService(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentService(null);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const serviceData = {
      title: formData.get('title'),
      description: formData.get('description'),
      icon: formData.get('icon'),
    };

    try {
      if (currentService) {
        await updateService(currentService.id, serviceData);
      } else {
        await createService(serviceData);
      }
      fetchServices();
      handleClose();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find((opt) => opt.name.toLowerCase() === iconName.toLowerCase());
    return icon ? icon.icon : <BuildIcon />;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Services</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Service
        </Button>
      </Box>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      mr: 2,
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                  >
                    {getIconComponent(service.icon)}
                  </IconButton>
                  <Typography variant="h6">{service.title}</Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => handleOpen(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    size="small"
                    onClick={() => handleDelete(service.id)}
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
            {currentService ? 'Edit Service' : 'Add Service'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  fullWidth
                  defaultValue={currentService?.title}
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
                  defaultValue={currentService?.description}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="icon"
                  label="Icon Name"
                  fullWidth
                  defaultValue={currentService?.icon}
                  required
                  helperText="Choose from: Code, Brush, Build, Storage, Cloud, Phone"
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

export default ServicesManager;
