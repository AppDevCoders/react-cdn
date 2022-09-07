const {
  colors,
  CssBaseline,
  ThemeProvider,  
  createTheme,
  Typography,
  Container,
  Box,
  // SvgIcon,
  Link,
  // IconButton,
  Button,
  Alert,
  Grid,
  Item,
  Card,
  Paper,
  // Stack
} = MaterialUI;

// Material UI - Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
  },
});

// Class Component
class TimerLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: props.id,
      running: false,
      start: null, 
      end: null, 
      milliseconds: 0
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);  
    // this.padTo2Digits = this.padTo2Digits.bind(this);   
    this.getTimeFormatted = this.getTimeFormatted.bind(this);   
  }

  tick() {
    this.setState({      
      milliseconds: this.state.milliseconds + 1
    }); 
  }

  componentDidMount() {
    this.handleStart();
  }

  componentWillUnmount() {
    this.handleStop();
  }

  handleStart() {
    this.setState({    
      running: true,
      start: new Date().getTime(),
      end: null,
      milliseconds: 0
    });
    this.interval = setInterval(() => this.tick(), 1);
  }

  handleStop() {
    this.setState({
      running: false, 
      end: new Date().getTime()
    });
    clearInterval(this.interval);
  }

  // padTo2Digits(num) {
  //   return num.toString().padStart(2, '0');
  // }

  getTimeFormatted() {
    const current = this.state.end ?? new Date().getTime(); 
    const date = new Date(current - this.state.start); 
    // 1970-01-01T00:00:01.586Z
    return date.toISOString().slice(11, 23); // 00:00:01.586
  }

  render() {
    return (        
        <Alert
          variant="outlined" severity={this.state.running ? 'info' : 'success'}
          action={
            <Button color="error" size="small" variant="outlined"
                onClick={() => this.handleStop()}
                startIcon={<i className="material-icons">stop</i>}
                disabled={!this.state.running}>
              STOP
            </Button>
          } >
          <strong>[{this.state.id}] Timer {this.getTimeFormatted()}</strong>
          {/* hh:mm:ss.zzz <br /> */}
        </Alert>
    );
  }
}

// Functional Component
function TimerTable() {
  const { useState, useEffect } = React;
  const [timers, setTimers] = useState([]);
  
  useEffect(() => {
    console.log('table');
    // setTimers([]);
  }, []);

  const addStartTimer = (e) => {
    console.log('start');
    setTimers([...timers, timers.length+1]);
  }

  const clearTimers = (e) => {
    console.log('clear');
    setTimers([]);
  }

  return (
    <Paper sx={{ p: 2, bgcolor: 'aliceblue', }}>  

        <Box display="flex" justifyContent="flex-end"> 
          <Button color="info" variant="contained" sx={{ mr: 1 }}
            startIcon={<i className="material-icons">clear_all</i>}
            onClick={() => clearTimers()}>            
            Clear 
          </Button>          
          <Button color="success" variant="contained" 
            startIcon={<i className="material-icons">play_arrow</i>}
            onClick={() => addStartTimer()}>            
            Start Timer
          </Button>
        </Box>
          
        {timers.length > 0 && (
          <Card variant="outlined" sx={{ mt: 2 }}>        
            <Grid container spacing={1} p={1}>
              {timers.map((i, index) => (
                <Grid item key={index} xs={12}>
                  <TimerLine id={i}/>
                </Grid>              
              ))}
            </Grid> 
          </Card>
        )}
    </Paper>
  );
}

// Functional Component
function Copyright() {
  return (
    <Container>        
        <Typography variant="body2" color="text.secondary" align="center">               
          Demo: React / MaterialUI / Babel       
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            This Website 2022.
          </Link>
        </Typography>
    </Container>
  );
}

// Functional Component (main)
function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Stopwatch App
        </Typography>
        
        <TimerTable />

        <br />
        <Copyright />
      </Box>
    </Container>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
