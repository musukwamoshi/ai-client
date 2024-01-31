import { Field, Formik } from 'formik';
import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/api';
import { timeout } from '../../utils/common/delay';
import { notifyOnFailure, notifyOnSuccess } from '../../utils/common/notifications';
import { AuthContext } from '../../utils/context/auth';

export function PasswordReset() {
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
                        Reset Password
                    </h1>
                    <Formik
                        initialValues={{ email: '', password: '', password2: '' }}
                        validate={(values) => {
                            const errors: any = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            }

                            if (!values.password) {
                                errors.password = 'Required';
                            }

                            if (!values.password2) {
                                errors.password = 'Required';
                            }

                            if (values.password != values.password2) {
                                errors.password = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            const resetRequest = { email: `${values.email}`, password: `${values.password}` };
                            try {
                                const response = await post('/password/reset', resetRequest);
                                if (response.success) {
                                    const successMessage = 'Reset successful.';
                                    setSession(response.data);
                                    notifyOnSuccess(successMessage);
                                    resetForm({ values: { email: '', password: '', password2: '' } });
                                    setSubmitting(false);
                                    await timeout(2000);
                                    return navigate('/sentinel/ukwingila', { replace: true });
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
                                <p className="text-lg font-medium">Reset your password</p>

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

                                <div>
                                    <label htmlFor="password2" className="text-sm font-medium">Password</label>

                                    <div className="relative mt-1">
                                        <Field
                                            name="password2"
                                            type="password"
                                            id="password2"
                                            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                            placeholder="Re-enter password"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                    disabled={isSubmitting}
                                >
                                    Reset Password
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    No account?
                                    <a className="underline" href="/admin/signup">Sign up</a>
                                </p>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        </>
    );
}
