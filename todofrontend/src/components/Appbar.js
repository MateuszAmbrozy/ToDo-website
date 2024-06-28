import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Appbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/view">
          <ListItemText primary="View Todo" />
        </ListItem>
        <ListItem button component={Link} to="/add">
          <ListItemText primary="Add Todo" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            Menu
          </Button>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            TODO
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="primary" component={Link} to="/view" fullWidth>
              View Todo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="primary" component={Link} to="/add" fullWidth>
              Add Todo
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" color="primary" component={Link} to="/about" fullWidth>
              About
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
