import React, { ReactNode, useRef } from 'react';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import { WithSideNav } from '../navigation/WithSideNav';
// import WithAuth from '../authentication/WithAuth';
import { notifyOnFailure, notifyOnSuccess } from '../../utils/common/notifications';
import { timeout } from '../../utils/common/delay';
import { useNavigate } from 'react-router-dom';
import { put } from '../../utils/api';
// import { AuthContext } from '../../utils/context/auth';
import { Toaster } from 'react-hot-toast';


export function Embedding() {
    // const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            model: '', platform: '',
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const articleRequest = { model: `${values.model}`, content: `${editorRef.current.getContent()}` };
                const response = await put('/article', articleRequest);
                if (response.success) {
                    const successMessage = 'Article was updated successfully!';
                    notifyOnSuccess(successMessage);
                    resetForm({ values: { model: '', platform: '' } });
                    setSubmitting(false);
                    await timeout(2000);
                    navigate('/sentinel/articles/review');
                } else {
                    setSubmitting(false);
                    notifyOnFailure(response.message);
                }
            } catch (err) {
                setSubmitting(false);
                notifyOnFailure('There was an error submitting the article.Please try again!');
            }
        },
    });

    const editorRef: any = useRef(null);
    const renderAddArticleForm = (): ReactNode => {
        return (
            <>
                <div className="max-w-7xl mx-auto px-8 sm:px-6 md:px-8">
                    <Toaster toastOptions={{
                        duration: 5000,
                        // Default options for specific types
                        success: {
                            duration: 3000,
                        },
                    }} />
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <FormikProvider value={formik}>
                            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model
                                        <Field as="select" id="model" name="model" autoComplete="model-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option>Select platform</option>
                                            <option>mistralai/Mistral-7B-Instruct-v0.2</option>
                                            <option>TheBloke/Mistral-7B-OpenOrca-AWQ</option>
                                        </Field>
                                    </label>
                                    <ErrorMessage name="model" />
                                </div>
                                <div>
                                    <label htmlFor="safe_prompt" className="block text-sm font-medium text-gray-700">Safe Prompt
                                        <Field as="select" id="safe_prompt" name="prompt" autoComplete="m-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option>Select safety prompt</option>
                                            <option>True</option>
                                            <option>False</option>
                                        </Field>
                                    </label>
                                    <ErrorMessage name="model" />
                                </div>
                                <div className="py-4">
                                    <div>
                                        <Editor
                                            apiKey="40q3t7wp28c78x0wqg1zyvs4t3psv0dna1rez169fv4z913w"
                                            onInit={(evt, editor) => { editorRef.current = editor; }}
                                            initialValue="<p>embed your sentence here.</p>"
                                            init={{
                                                height: 500,
                                                menubar: true,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            className=" mt-4 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-white sm:w-auto bg-indigo-800"
                                            disabled={formik.isSubmitting}
                                        >
                                            <span className="font-medium"> Send </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ml-3 h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="max_tokens">Max Tokens<Field
                                            name="max_tokens"
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="max_tokens"
                                            type="text"
                                            id="max_tokens"
                                        />
                                        </label>
                                        <ErrorMessage name="max_tokens" />
                                    </div>
                                </div>
                            </form>
                        </FormikProvider>
                    </div>

                </div >
            </>
        );
    };

    return <WithSideNav>{renderAddArticleForm()}</WithSideNav>;
}
