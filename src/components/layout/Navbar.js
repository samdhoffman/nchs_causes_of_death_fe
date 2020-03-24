import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  root: {
    color: "#003d71",
  },
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  title: {
    flexGrow: 1
  },
  btn: {
    color: "#f8981d",
  },
  githubLink: {
    textDecoration: "none",
    '&:visited': {
      color: 'inherit',
    }
  }
})

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <nav className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit" underline="none">Image Gallery</Link>
          </Typography>

          <Tooltip title="View The Codebase">
            <Button className={classes.btn} color="inherit" onClick={handleClick}>
                <GitHubIcon/>
            </Button>
          </Tooltip>
          
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            color="#f8981d"
          >
            <MenuItem onClick={handleClose}>
              <a className={classes.githubLink} href="https://github.com/samdhoffman/nchs_causes_of_death_fe" target="_blank" rel="noopener noreferrer" >
                Front End
              </a>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <a className={classes.githubLink} href="https://github.com/samdhoffman/nchs_causes_of_death_be" target="_blank" rel="noopener noreferrer" >
                Back End
              </a>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default Navbar;
