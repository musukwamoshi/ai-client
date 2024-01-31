import { Field, Formik } from 'formik';
import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { get, post } from '../../utils/api';
import { timeout } from '../../utils/common/delay';
import { notifyOnFailure, notifyOnSuccess } from '../../utils/common/notifications';
import { AuthContext } from '../../utils/context/auth';

export function Login() {
    const { setSession } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <Toaster toastOptions={{
                        duration: 5000,
                        // Default options for specific types
                        success: {
                            duration: 3000,
                        },
                    }} />
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Login
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Login as admin to post articles
                    </p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={(values) => {
                            const errors: any = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            const loginRequest = { email: `${values.email}`, password: `${values.password}` };
                            try {
                                const response = await post('/sessions', loginRequest);
                                if (response.success) {
                                    const successMessage = 'Login successful.';
                                    const newSession = await get('/sessions');
                                    setSession(newSession);
                                    notifyOnSuccess(successMessage);
                                    resetForm({ values: { email: '', password: '' } });
                                    setSubmitting(false);
                                    await timeout(5000);
                                    navigate('/sentinel/articles/review', { replace: true });
                                } else {
                                    setSubmitting(false);
                                    notifyOnFailure(response.error);
                                }
                            } catch (err) {
                                console.log(err);
                                setSubmitting(false);
                                notifyOnFailure('There was an error signing you in please try again');
                            }
                        }}
                    >
                        {({
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
                                <p className="text-lg font-medium">Sign in to your account</p>

                                <div>
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>

                                    <div className="relative mt-1">
                                        <Field
                                            name="email"
                                            type="email"
                                            id="email"
                                            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="text-sm font-medium">Password</label>

                                    <div className="relative mt-1">
                                        <Field
                                            name="password"
                                            type="password"
                                            id="password"
                                            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                    disabled={isSubmitting}
                                >
                                    Sign in
                                </button>

                                {/* <p className="text-center text-sm text-gray-500">
                                    No account?
                                    <a className="underline" href="/admin/signup">Sign up</a>
                                </p> */}
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        </>
    );
}
