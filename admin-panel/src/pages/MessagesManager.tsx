import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import {
  getContactMessages,
  deleteContactMessage,
  markMessageAsRead,
  updateMessageStatus,
} from '../services/api';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  is_read: boolean;
  created_at: string;
}

const statusColors = {
  NEW: 'error',
  IN_PROGRESS: 'warning',
  COMPLETED: 'success',
  ARCHIVED: 'default',
} as const;

const MessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getContactMessages();
      // Ensure response.data is an array
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      setError(error.response?.data?.detail || 'Error loading messages. Please try again.');
      setMessages([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markMessageAsRead(id);
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateMessageStatus(id, newStatus);
      fetchMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(id);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleOpenMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setOpenDialog(true);
    if (!message.is_read) {
      handleMarkAsRead(message.id);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchMessages}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>

      {messages.length === 0 ? (
        <Alert severity="info">No messages found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {messages.map((message) => (
            <Grid item xs={12} sm={6} md={4} key={message.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                  position: 'relative',
                  bgcolor: message.is_read ? 'background.paper' : 'action.hover',
                }}
                onClick={() => handleOpenMessage(message)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" noWrap>
                      {message.subject}
                    </Typography>
                    <Chip
                      label={message.status}
                      color={statusColors[message.status as keyof typeof statusColors]}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    From: {message.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Email: {message.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2,
                    }}
                  >
                    {message.message}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(message.created_at).toLocaleDateString()}
                    </Typography>
                    <Box>
                      {!message.is_read && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(message.id);
                          }}
                        >
                          <MarkEmailReadIcon />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedMessage && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon />
                {selectedMessage.subject}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  From: {selectedMessage.name} ({selectedMessage.email})
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Received: {new Date(selectedMessage.created_at).toLocaleString()}
                </Typography>
              </Box>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedMessage.status}
                  label="Status"
                  onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value)}
                >
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="ARCHIVED">Archived</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={selectedMessage.message}
                InputProps={{ readOnly: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MessagesManager;
