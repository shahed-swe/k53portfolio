import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string
}

const ExperienceManager = () => {
  const [open, setOpen] = useState(false)
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior Developer',
      startDate: '2020-01',
      endDate: '2023-01',
      description: 'Led development team in creating enterprise applications',
      responsibilities: 'Team leadership, Architecture design, Code reviews',
    },
  ])
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null)

  const handleOpen = (experience?: Experience) => {
    if (experience) {
      setCurrentExperience(experience)
    } else {
      setCurrentExperience(null)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentExperience(null)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    handleClose()
  }

  const handleDelete = (id: number) => {
    // TODO: Implement delete functionality
    setExperiences(experiences.filter(exp => exp.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Experience</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Experience
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((experience) => (
              <TableRow key={experience.id}>
                <TableCell>{experience.company}</TableCell>
                <TableCell>{experience.position}</TableCell>
                <TableCell>{`${experience.startDate} - ${experience.endDate}`}</TableCell>
                <TableCell>{experience.description}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(experience)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDelete(experience.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentExperience ? 'Edit Experience' : 'Add Experience'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Company"
            fullWidth
            defaultValue={currentExperience?.company}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            defaultValue={currentExperience?.position}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="month"
            fullWidth
            defaultValue={currentExperience?.startDate}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="month"
            fullWidth
            defaultValue={currentExperience?.endDate}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            defaultValue={currentExperience?.description}
          />
          <TextField
            margin="dense"
            label="Responsibilities"
            fullWidth
            multiline
            rows={4}
            defaultValue={currentExperience?.responsibilities}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ExperienceManager
