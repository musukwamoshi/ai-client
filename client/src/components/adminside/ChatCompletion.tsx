import { Formik } from 'formik';
import React, { ReactNode, useState } from 'react';
// import { post } from '../../utils/api';
import { notifyOnFailure } from '../../utils/common/notifications';
import { CustomTextArea } from '../common/textarea';
// import { Loader } from '../common/Loader';
import { ResponseItem } from './ResponseItem';
import { WithSideNav } from '../navigation/WithSideNav';
// import { timeout } from '../../utils/common/delay';


// const [input, setInput] = useState([<input defaultValue={1} />]);
//   return (
//     <div>
//       {input.map((item, index) => (
//         <div key={`input-${index}`}>{item}</div>
//       ))}
//       <button
//         className="block p-5 mx-4 rounded-lg bg-emerald-600"
//         onClick={() => {
//           setInput([...input, <input defaultValue={input.length + 1} />]);
//         }}
//       >
//         Append
//       </button>
//     </div>
//   );

// {
//     id: "cmpl-eb3e4a281b3b45c7b9edde33430b440e",
//         object: "text_completion",
//             created: 7985,
//                 model: "TheBloke/Mistral-7B-OpenOrca-AWQ",
//                     choices: [
//                         {
//                             index: 0,
//                             text: " and is it really a condiment? More of a sauce to be honest.\n\nYou might have gathered that my food",
//                             logprobs: null,
//                             finish_reason: "length"
//                         }
//                     ],
//                         usage: {
//         prompt_tokens: 7,
//             total_tokens: 32,
//                 completion_tokens: 25
//     }
// }

export function ChatCompletion() {
    const [conversation, setConversation] = useState<Array<any>>([]);
    // const [isArticleLoading, setIsArticleLoading] = useState<boolean>(false);

    // const renderLoader = (): ReactNode => {
    //     return (
    //         <>
    //             <Loader />
    //         </>
    //     );
    // };

    const renderDefault = (): ReactNode => {
        return (
            <>
                <p>Ask the model something.</p>
            </>
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
    const renderViewArticle = () => {
        return (
            <>
                <section>
                    <div className="mx-auto max-w-screen-lg px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <section>
                            <div className="items-center">
                                {/* <a
                            href="#"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                        >
                            Sign up
                        </a> */}
                            </div>
                            <div className="mx-auto max-w-screen-lg px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-1 lg:gap-16">
                                    {conversation.length > 0 ? renderResponses() : renderDefault()}
                                </div>
                            </div>
                        </section>

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
                                    // const promptRequest = { model: 'TheBloke/Mistral-7B-OpenOrca-AWQ', safe_prompt: true, prompt: `${values.prompt}` };
                                    // generate timestamp, formulate conversation item and add it to conversation array
                                    // const timestamp = Date.now().toString();
                                    const conversationPiece = {
                                        id: conversation.length + 1,
                                        entity: 'You',
                                        quote: values.prompt,
                                    };
                                    setConversation([...conversation, <ResponseItem key={conversationPiece.id} response={conversationPiece} />]);
                                    // direct api call or through localhost api
                                    // get response, add timestamp, formulate conversation item and add it conversation array
                                    // const response = await post('/completions', promptRequest);
                                    const response = {
                                        id: 'cmpl-eb3e4a281b3b45c7b9edde33430b440e',
                                        object: 'text_completion',
                                        created: 7985,
                                        model: 'TheBloke/Mistral-7B-OpenOrca-AWQ',
                                        choices: [
                                            {
                                                index: 0,
                                                text: ' and is it really a condiment? More of a sauce to be honest.\n\nYou might have gathered that my food',
                                                logprobs: null,
                                                finish_reason: 'length',
                                            },
                                        ],
                                        usage: {
                                            prompt_tokens: 7,
                                            total_tokens: 32,
                                            completion_tokens: 25,
                                        },
                                    };
                                    console.log(response);
                                    if (response) {
                                        console.log(response.choices[0].text);
                                        console.log('We are here');
                                        // const successMessage = 'Prompt was submitted successfully.You can now review';
                                        // notifyOnSuccess(successMessage);
                                        resetForm({ values: { model: '', safe_prompt: '', prompt: '' } });
                                        // const timestampM = Date.now().toString();
                                        const conversationResponse = {
                                            id: conversation.length + 1,
                                            entity: 'Model',
                                            quote: response.choices[0].text,
                                        };
                                        // conversation.push(<ResponseItem key={conversationResponse.id} response={conversationResponse} />);
                                        console.log(conversation.length);
                                        console.log(conversation);
                                        setConversation([...conversation, <ResponseItem key={conversationResponse.id} response={conversationResponse} />]);
                                        console.log('updated state');
                                        setSubmitting(false);
                                    } else {
                                        setSubmitting(false);
                                        // notifyOnFailure(response.message);
                                    }
                                } catch (err) {
                                    setSubmitting(false);
                                    notifyOnFailure('There was an error submitting the prompt.Please try again!');
                                }
                            }}
                        >
                            {({
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {/* <div>
                                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Model
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
                                            <Field as="select" id="safe_prompt" name="safe_prompt" autoComplete="m-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option>Select safety prompt</option>
                                                <option>True</option>
                                                <option>False</option>
                                            </Field>
                                        </label>
                                        <ErrorMessage name="safe_prompt" />
                                    </div> */}
                                    <div className="py-4">
                                        <div>
                                            <div className="relative mt-1">
                                                <CustomTextArea
                                                    name="prompt"
                                                    rows="6"
                                                    placeholder="Prompt the model...?" />
                                            </div>
                                            <button
                                                type="submit"
                                                className=" mt-4 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-white sm:w-auto bg-indigo-800"
                                                disabled={isSubmitting}
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
                                </form>
                            )}
                        </Formik>
                    </div>
                </section>

            </>
        );
    };
    return <WithSideNav>{renderViewArticle()}</WithSideNav>;
}
