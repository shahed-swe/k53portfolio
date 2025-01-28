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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

interface Skill {
  id: number
  name: string
  category: string
  proficiency: number
  description: string
}

const categories = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Database', 'Other']

const SkillsManager = () => {
  const [open, setOpen] = useState(false)
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: 'React',
      category: 'Frontend',
      proficiency: 90,
      description: 'Modern React with Hooks and Context',
    },
  ])
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null)

  const handleOpen = (skill?: Skill) => {
    if (skill) {
      setCurrentSkill(skill)
    } else {
      setCurrentSkill(null)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentSkill(null)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    handleClose()
  }

  const handleDelete = (id: number) => {
    // TODO: Implement delete functionality
    setSkills(skills.filter(skill => skill.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Skills</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Proficiency</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.proficiency}%</TableCell>
                <TableCell>{skill.description}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(skill)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDelete(skill.id)}
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
          {currentSkill ? 'Edit Skill' : 'Add Skill'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            defaultValue={currentSkill?.name}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={currentSkill?.category || ''}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Proficiency (%)"
            type="number"
            fullWidth
            defaultValue={currentSkill?.proficiency}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            defaultValue={currentSkill?.description}
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

export default SkillsManager
