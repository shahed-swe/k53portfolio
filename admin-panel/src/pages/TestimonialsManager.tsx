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
  Rating,
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../services/api';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  is_active: boolean;
}

const TestimonialsManager = () => {
  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await getTestimonials();
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (testimonial?: Testimonial) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
    } else {
      setCurrentTestimonial(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTestimonial(null);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const testimonialData = {
      name: formData.get('name'),
      position: formData.get('position'),
      company: formData.get('company'),
      content: formData.get('content'),
      rating: Number(formData.get('rating')),
      is_active: formData.get('is_active') === 'true',
    };

    try {
      if (currentTestimonial) {
        await updateTestimonial(currentTestimonial.id, testimonialData);
      } else {
        await createTestimonial(testimonialData);
      }
      fetchTestimonials();
      handleClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Testimonials</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Testimonial
        </Button>
      </Box>

      <Grid container spacing={3}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
            <Card
              sx={{
                height: '100%',
                opacity: testimonial.is_active ? 1 : 0.7,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={testimonial.image}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.position} at {testimonial.company}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {testimonial.content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={testimonial.is_active}
                        onChange={async () => {
                          try {
                            await updateTestimonial(testimonial.id, {
                              ...testimonial,
                              is_active: !testimonial.is_active,
                            });
                            fetchTestimonials();
                          } catch (error) {
                            console.error('Error updating testimonial:', error);
                          }
                        }}
                      />
                    }
                    label="Active"
                  />
                  <Box>
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                      onClick={() => handleOpen(testimonial)}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      color="error"
                      size="small"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSave}>
          <DialogTitle>
            {currentTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  defaultValue={currentTestimonial?.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="position"
                  label="Position"
                  fullWidth
                  defaultValue={currentTestimonial?.position}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="company"
                  label="Company"
                  fullWidth
                  defaultValue={currentTestimonial?.company}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="content"
                  label="Content"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue={currentTestimonial?.content}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  defaultValue={currentTestimonial?.rating || 5}
                  precision={1}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="is_active"
                      defaultChecked={currentTestimonial?.is_active ?? true}
                    />
                  }
                  label="Active"
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

export default TestimonialsManager;
