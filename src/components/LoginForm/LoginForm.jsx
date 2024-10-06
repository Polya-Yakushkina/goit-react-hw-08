import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from '../../redux/auth/operations';
import { TextField, Button, Typography, Box, Container, CssBaseline } from "@mui/material";
import * as Yup from 'yup';
import { selectEmailError, selectPasswordError } from '../../redux/auth/selectors'; // Імпорт селекторів

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
        .required("This field is required"),
    password: Yup.string()
        .min(7, "Password must be at least 7 characters long")
        .required("Password is required"),
});

export default function LoginForm() {
    const dispatch = useDispatch();
    const emailError = useSelector(selectEmailError);
    const passwordError = useSelector(selectPasswordError);

    const handleSubmit = async (values, actions) => {
        dispatch(logIn(values));
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
                        Log in to your account
                    </Typography>

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                            <Form autoComplete="off">
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.email && touched.email) || emailError}
                                    helperText={Boolean(values.email.length > 0) && errors.email}
                                    InputLabelProps={{
                                        style: { fontSize: '20px' },
                                    }}
                                    slotProps={{
                                        input: {
                                            style: {
                                                height: '70px',
                                                fontSize: '24px',
                                            },
                                        },
                                    }}
                                    inputProps={{ style: { fontSize: '20px' } }}
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.password && touched.password) || passwordError}
                                    helperText={touched.password ? errors.password : passwordError ? "Incorrect password." : ""}
                                    InputLabelProps={{
                                        style: { fontSize: '20px' },
                                    }}
                                    slotProps={{
                                        input: {
                                            style: {
                                                height: '70px',
                                                fontSize: '24px',
                                            },
                                        },
                                    }}
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
                                        Log In
                                    </Button>
                                </Box>

                                <Typography align="center" sx={{ mt: 2, mb: 3, fontSize: '24px' }}>
                                    Don't have an account? <a href="/register">Register</a>
                                </Typography>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Container>
    );
}
