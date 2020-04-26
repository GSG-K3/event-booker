import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import { Person, AlternateEmail, Phone, Lock } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

class SignUP extends Component {
  state = {
    userdetails: {
      name: "",
      phone: "",
      email: "",
      password: "",
      password2: "",
    },
  };

  handler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const form = this.state.userdetails;
    form[name] = value;
    this.setState({
      userdetails: form,
    });
  };

  render() {
    return (
      <Box p={3}>
        <form onSubmit={this.handleSubmit}>
          <Grid container item justify="center" direction="column">
            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Person color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Enter your name "
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Phone color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Enter your phone"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AlternateEmail color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Enter your email"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Lock color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Ente your password"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Lock color="primary" />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="re-enter  your password"
                    onChange={this.handler}
                  />
                </Grid>
              </Grid>
            </div>

            <Button size="small" color="primary" variant="contained">
              Sign up
            </Button>
            <Typography variant="h7" color="primary">
              {"Have an account?  "}
              <Link to={`/user/login}`}>Login</Link>
            </Typography>
          </Grid>
        </form>
      </Box>
    );
  }
}

export default signUp;
