import React from 'react';
import { IModelResponseObject } from '../common/Interfaces';
import Typewriter from './TypeWriter';
import AIcon from './AIcon';
import UserIcon from './UserIcon';

export interface ResponseProps {
    response: IModelResponseObject
}

export function ResponseItem({ response }: ResponseProps) {
    return (
        <>
            <article className="ring-indigo-50">
                <div className="flex items-start">
                    <div
                        className="hidden sm:grid sm:h-20 sm:w-50 sm:shrink-0 sm:place-content-center sm:border-indigo-500"
                        aria-hidden="true"
                    >
                        <div className="flex">
                            <p className="text-xs font-medium">
                                {response.entity == 'Model' ? <AIcon /> : <UserIcon />}
                            </p>
                        </div>
                    </div>

                    <div className="sm:ml-20 mt-3">

                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                            <a href="#"> {response.entity} </a>
                        </h3>

                        <div className="mt-1 text-sm text-gray-700 line-clamp-3">
                            {response.entity == 'Model' ? <Typewriter text={response.quote} delay={200} /> : response.quote}
                        </div>
                    </div>
                </div>

            </article>
        </>
    );
}
