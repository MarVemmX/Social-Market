import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { default as React, useMemo } from 'react';
// import MessengerCustomerChat from "react-messenger-customer-chat";
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import routers from './routes/index';
import { themeConfig } from './themes/theme';
// import { themeConfig } from './theme/themes';
// import Footer from './components/Footer';

export default function App(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  function ScrollTop(props) {
    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }
  const isDarkMode = useSelector((state) => state.system.isDarkMode);
  const theme = useMemo(() => themeConfig({ isDarkMode }), [isDarkMode]);
  const showRouter = (routes) => {
    let result = routes.map((route, index) => {
      return <Route path={route.path} exact={route.exact} component={route.main} key={index} />;
    });
    return <Switch>{result}</Switch>;
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" />
        <CssBaseline />
        <Header />
        {showRouter(routers)}
        {/* <Footer /> */}
        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </Router>
  );
}
