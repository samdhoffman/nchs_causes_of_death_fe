import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
  Footer: {
    textAlign: "center",
    flexShrink: 0,
    background: "rgba(0, 0, 0, 1)",
    color: "white",
  },
  author: {
    ...theme.typography.subtitle1,
    display: "flex",
    justifyContent: "center",
  },
  footerBtn: {
    border: "none",
  },
  footerLink: {
    '&:visited': {
      color: 'inherit',
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.Footer}>
      <section className={classes.author}>
        <p>Sam Hoffman</p>
      </section>
      
      <ButtonGroup color="inherit" aria-label="button group">
        <Button className={classes.footerBtn}>
          <a className={classes.footerLink} href="https://github.com/samdhoffman" target="_blank" rel="noopener noreferrer" >
            <GitHubIcon/>
          </a>
        </Button>
        <Button className={classes.footerBtn}>
          <a className={classes.footerLink} href="https://www.linkedin.com/in/samdhoffman/" target="_blank" rel="noopener noreferrer" >
            <LinkedInIcon/>
          </a>
        </Button>
      </ButtonGroup>
    </footer>
  )
}

export default Footer;
