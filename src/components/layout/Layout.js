import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./Footer";
import Navbar from "./Navbar";

const useStyles = makeStyles({
  Layout: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",

    '& .content': {
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
    }
  }
})

const Layout = (props) => {
  const classes = useStyles();
  
  return (
    <div className={classes.Layout}>
      <Navbar />
      <main className="content">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;
