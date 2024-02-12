import { Formik } from 'formik';
import React, { ReactNode, useState } from 'react';
// import { post } from '../../utils/api';
import { notifyOnFailure } from '../../utils/common/notifications';
import { CustomTextArea } from '../common/textarea';
// import { Loader } from '../common/Loader';
import { ResponseItem } from './ResponseItem';
import { WithSideNav } from '../navigation/WithSideNav';
import { post } from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { Loader } from '../common/Loader';

export function ChatCompletion() {
    const [conversation, setConversation] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const renderLoader = (): ReactNode => {
        return (
            <>
                <Loader />
            </>
        );
    };

    const renderDefault = (): ReactNode => {
        return (
            <article className="ring-indigo-50">
                <div className="flex items-center">

                    <div className="mt-1 text-sm text-gray-700 line-clamp-3">
                        The model is not perfect and can make mistakes or give false information. Make sure you verify the answers.
                    </div>
                </div>
            </article>
        );
    };

    const renderResponses = (): ReactNode => {
        return (
            <>
                {conversation.map((token: any, index: number) => {
                    return (
                        <div key={`input-${index}`}>{token}</div>
                    );
                })
                }
            </>
        );
    };
    const renderViewMessage = () => {
        return (
            <>
                <section>

                    <div className="mx-auto max-w-screen-lg px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
                        <Toaster toastOptions={{
                            duration: 5000,
                            // Default options for specific types
                            success: {
                                duration: 3000,
                            },
                        }} />
                        {isLoading ? renderLoader() : null}
                        <Formik
                            initialValues={{ model: '', safe_prompt: '', prompt: '' }}
                            validate={(values) => {
                                const errors: any = {};

                                if (!values.prompt) {
                                    errors.prompt = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    setIsLoading(true);
                                    const promptRequest = { model: 'TheBloke/Mistral-7B-Instruct-v0.2-AWQ', safe_prompt: true, max_tokens: 200, prompt: `${values.prompt}` };
                                    // const timestamp = Date.now().toString();
                                    const conversationPiece = {
                                        id: conversation.length + 1,
                                        entity: 'You',
                                        quote: values.prompt,
                                    };
                                    conversation.push(<ResponseItem key={conversationPiece.id} response={conversationPiece} />);
                                    const response = await post('/completions', promptRequest);
                                    if (response) {
                                        // const successMessage = 'Prompt was submitted successfully.You can now review';
                                        // notifyOnSuccess(successMessage);
                                        resetForm({ values: { model: '', safe_prompt: '', prompt: '' } });
                                        // const timestampM = Date.now().toString();
                                        const conversationResponse = {
                                            id: conversation.length + 1,
                                            entity: 'Model',
                                            quote: response.choices[0].text,
                                        };
                                        conversation.push(<ResponseItem key={conversationResponse.id} response={conversationResponse} />);
                                        console.log(conversation.length);
                                        console.log(conversation);
                                        setConversation([...conversation]);
                                        console.log('updated state');
                                        setSubmitting(false);
                                        setIsLoading(false);
                                    } else {
                                        setSubmitting(false);
                                        const conversationResponse = {
                                            id: conversation.length + 1,
                                            entity: 'Model',
                                            quote: 'Sorry there was an error retrieving the response',
                                        };
                                        conversation.push(<ResponseItem key={conversationResponse.id} response={conversationResponse} />);
                                        setConversation([...conversation]);
                                        notifyOnFailure('There was an error submitting the prompt.Please try again!');
                                    }
                                } catch (err) {
                                    console.log(err);
                                    setSubmitting(false);
                                    const conversationResponse = {
                                        id: conversation.length + 1,
                                        entity: 'Model',
                                        quote: 'Sorry there was an error retrieving the response',
                                    };
                                    conversation.push(<ResponseItem key={conversationResponse.id} response={conversationResponse} />);
                                    setConversation([...conversation]);
                                    notifyOnFailure('There was an error submitting the prompt.Please try again!');
                                }
                            }}
                        >
                            {({
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div className="py-4">
                                        <div>
                                            <div className="relative mt-1">
                                                <CustomTextArea
                                                    name="prompt"
                                                    rows="6"
                                                    placeholder="Ask me anything..." />
                                            </div>
                                            <button
                                                type="submit"
                                                className=" mt-4 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-white sm:w-auto bg-violet-800"
                                                disabled={isSubmitting}
                                            >
                                                <span className="font-medium"> Generate Response </span>
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
                                </form>
                            )}
                        </Formik>
                        <div className="items-center">
                            {conversation.length > 0 ? renderResponses() : renderDefault()}

                        </div>
                    </div>
                </section>

            </>
        );
    };
    return <WithSideNav>{renderViewMessage()}</WithSideNav>;
}
