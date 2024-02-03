import { Request, Response } from "express";


export const chatCompletion = (req: Request, res: Response): any => {
    return res.send({
        id: 'cmpl-eb3e4a281b3b45c7b9edde33430b440e',
        object: 'text_completion',
        created: 7985,
        model: 'TheBloke/Mistral-7B-instruct-v0.2-AWQ',
        choices: [
            {
                index: 0,
                text: 'dont have personal preferences or the ability to taste, so I dont have a favorite food. However, I can provide information and answer questions about a wide variety of foods if that would be helpful to you. Is there a specific food or cuisine you would like to know more about?',
                logprobs: null,
                finish_reason: 'length',
            },
        ],
        usage: {
            prompt_tokens: 7,
            total_tokens: 32,
            completion_tokens: 25,
        },
    });
}