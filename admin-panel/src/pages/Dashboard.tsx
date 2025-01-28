import { Box, Typography, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Projects</Typography>
            <Typography variant="h4">12</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Skills</Typography>
            <Typography variant="h4">24</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Experience</Typography>
            <Typography variant="h4">5</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Total Views</Typography>
            <Typography variant="h4">1.2K</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
