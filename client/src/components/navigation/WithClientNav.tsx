import React, { ReactElement } from 'react';
import { Footer } from './Footer';


export function WithClientNav({ children }: any): ReactElement {
    return (
        <>
            <header aria-label="Site Header" className="shadow-sm">
                <div
                    className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4"
                >
                    {/* <div className="flex w-0 flex-1 lg:hidden">
                        <button className="rounded-full bg-gray-100 p-2 text-gray-600" type="button">
                            <span className="sr-only">Account</span>
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                ></path>
                            </svg>
                        </button>
                    </div> */}

                    <div className="flex items-center gap-4">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg> */}
                        <button className="rounded-full bg-gray-100 text-gray-600" type="button">
                            <span className="sr-only">Account</span>
                            <div className="relative w-12 h-12">
                                <img className="rounded-full object-fill w-12 h-12 border border-gray-100 shadow-sm" src="https://yoruikitenkai.s3.amazonaws.com/1570569620413.jpeg" alt="user image" />
                                {/* <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div> */}
                            </div>
                        </button>
                        <a href="/">
                            <span className="sr-only">Logo</span>
                            <span className="h-10 w-20 font-medium text-indigo-800">moshimusukwa.dev</span>
                        </a>
                    </div>

                    <div className="flex w-0 flex-1 justify-end lg:hidden">
                        {/* <button className="rounded-full bg-gray-100 p-2 text-gray-500" type="button">
                            <span className="sr-only">Menu</span>
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </button> */}
                    </div>

                    <nav
                        aria-label="Site Nav"
                        className="hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1"
                    >
                        <a className="text-indigo-800" href="/">Articles</a>
                        <a className="text-indigo-800" href="/about">About</a>
                        <a className="text-indigo-800" href="/tools">Tools</a>
                    </nav>

                    {/* <div className="hidden items-center gap-4 lg:flex">
                        <form className="mb-0 hidden lg:flex">
                            <div className="relative">
                                <input
                                    className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
                                    placeholder="Search..."
                                    type="text"
                                />

                                <button
                                    type="submit"
                                    className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600"
                                >
                                    <span className="sr-only">Submit Search</span>
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <a
                            href="#"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                        >
                            Sign up
                        </a>
                    </div> */}
                </div>

                <div className="border-t border-gray-100 lg:hidden">
                    <nav
                        className="flex items-center justify-center overflow-x-auto p-4 text-sm font-medium"
                    >
                        <a className="flex-shrink-0 pl-4 text-gray-900" href="/">Articles</a>
                        <a className="flex-shrink-0 pl-4 text-gray-900" href="/about">About</a>
                        <a className="flex-shrink-0 pl-4 text-gray-900" href="/tools">Tools</a>
                    </nav>
                </div>
            </header>
            <div>{children}</div>
            <Footer />
        </>
    );
}
