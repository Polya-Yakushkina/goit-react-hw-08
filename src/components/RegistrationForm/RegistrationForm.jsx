import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { TextField, Button, Container, CssBaseline, Box, Typography } from "@mui/material";
import * as Yup from 'yup';


const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s.'-]+$/, "Only letters, spaces, dots, hyphens and apostrophes allowed")
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("This field is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("This field is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters long")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            width: '60%',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Register your account
          </Typography>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, isSubmitting }) => (
              <Form>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.name && values.name.length > 0)}
                  helperText={Boolean(values.name.length > 0) && errors.name}
                  slotProps={{
                    input: {
                      style: {
                        height: '70px',
                        fontSize: '24px',
                      },
                    },
                }}
                InputLabelProps={{
                    style: { fontSize: '20px' },
                  }}
                  placeholder="Enter your name"
                  inputProps={{ style: { fontSize: '20px' } }}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email && values.email.length > 0)}
                  helperText={Boolean(values.email.length > 0) && errors.email}
                  slotProps={{
                    input: {
                      style: {
                        height: '70px',
                        fontSize: '24px',
                      },
                      },
                  }}
                InputLabelProps={{
                    style: { fontSize: '20px' },
                  }}
                  placeholder="Enter your e-mail"
                  inputProps={{ style: { fontSize: '20px' } }}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.password && values.password.length > 0)}
                  helperText={Boolean(values.password.length > 0) && errors.password}
                  slotProps={{
                    input: {
                      style: {
                        height: '70px',
                        fontSize: '24px',
                      },
                    },
                }}
                InputLabelProps={{
                    style: { fontSize: '20px' },
                  }}
                  placeholder="Enter your password"
                  inputProps={{ style: { fontSize: '20px' } }}                 
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      height: '70px',
                      px: 5,
                      fontSize: '24px',
                      borderRadius: '5px',
                      backgroundColor: '#7783ff',
                      border: '1px solid transparent',
                      boxShadow: '0px 2px 5px 0px grey',
                      transition: 'background-color 0.25s, transform 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgb(250, 253, 255)',
                        transform: 'scale(1.05)',
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </Box>

                <Typography align="center" sx={{ mt: 2, mb: 3, fontSize: '24px' }}>
                  Already have an account? <a href="/login">Log in</a>
                </Typography>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
}
