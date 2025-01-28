import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Map as MapIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import { getContactInformation, updateContactInformation } from '../services/api';

interface ContactInformation {
  id: number;
  address: string;
  email: string;
  phone: string;
  working_hours: string;
  google_maps_url: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
}

const ContactInfoManager = () => {
  const [contactInfo, setContactInfo] = useState<ContactInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await getContactInformation();
      setContactInfo(response.data); 
    } catch (error) {
      console.error('Error fetching contact information:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactInfo) return;

    const formData = new FormData(event.currentTarget);
    const updatedData = {
      address: formData.get('address'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      working_hours: formData.get('working_hours'),
      google_maps_url: formData.get('google_maps_url'),
      facebook_url: formData.get('facebook_url'),
      twitter_url: formData.get('twitter_url'),
      linkedin_url: formData.get('linkedin_url'),
      instagram_url: formData.get('instagram_url'),
    };

    try {
      await updateContactInformation(contactInfo.id, updatedData);
      fetchContactInfo();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating contact information:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading contact information...</Typography>
      </Box>
    );
  }

  if (!contactInfo) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">No contact information found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Contact Information</Typography>
        <Button
          variant="contained"
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={() => setIsEditing(!isEditing)}
          type={isEditing ? 'submit' : 'button'}
          form={isEditing ? 'contact-form' : undefined}
        >
          {isEditing ? 'Save Changes' : 'Edit Information'}
        </Button>
      </Box>

      <form id="contact-form" onSubmit={handleSave}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      defaultValue={contactInfo.address}
                      disabled={!isEditing}
                      required
                      multiline
                      rows={3}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      defaultValue={contactInfo.email}
                      disabled={!isEditing}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      defaultValue={contactInfo.phone}
                      disabled={!isEditing}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Working Hours"
                      name="working_hours"
                      defaultValue={contactInfo.working_hours}
                      disabled={!isEditing}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* URLs */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Links & Social Media
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Google Maps URL"
                      name="google_maps_url"
                      defaultValue={contactInfo.google_maps_url}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MapIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Facebook URL"
                      name="facebook_url"
                      defaultValue={contactInfo.facebook_url}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FacebookIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Twitter URL"
                      name="twitter_url"
                      defaultValue={contactInfo.twitter_url}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TwitterIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="LinkedIn URL"
                      name="linkedin_url"
                      defaultValue={contactInfo.linkedin_url}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedInIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Instagram URL"
                      name="instagram_url"
                      defaultValue={contactInfo.instagram_url}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <InstagramIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactInfoManager;
