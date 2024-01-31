import { Request, Response } from "express";
import { toNumber } from "lodash";
import { dbClient } from "../db";
import { v4 as uuidv4 } from "uuid";


export async function createArticle(req: Request, res: Response): Promise<void> {
    const { title, slug, content, userId } = req.body;
    try {
        const result = await dbClient.article.create({
            data: {
                title,
                content,
                slug,
                uuid: uuidv4(),
                authorId: userId,
                approved: false
            }
        })
        res.send({ data: result, success: true });
    } catch (err: any) {
        res.send({ message: "Something went wrong please try again!", success: false });
    }
}

export async function deleteArticle(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
        const deletedArticle = await dbClient.article.delete({
            where: {
                id: toNumber(id),
            },
        })
        res.send({ data: deletedArticle, success: true });
    } catch (err: any) {
        res.send({ message: "Something went wrong please try again!", success: false });
    }
}

export async function updateArticleStatus(req: Request, res: Response): Promise<void> {
    const { id, status } = req.body;
    try {
        const updateArticle = await dbClient.article.update(
            {
                where: {
                    id: toNumber(id)
                },
                data: {
                    approved: status
                },
            },
        )
        res.send({ data: updateArticle, success: true });
    } catch (err: any) {
        res.send({ message: "Something went wrong please try again!", success: false });
    }
}

export async function updateArticle(req: Request, res: Response): Promise<void> {
    const { id, title, slug, platform, content } = req.body;
    try {
        const updateArticle = await dbClient.article.update(
            {
                where: {
                    id: toNumber(id)
                },
                data: {
                    title: title,
                    content: content,
                    slug: slug
                },
            },
        )
        console.log(updateArticle);
        res.send({ data: updateArticle, success: true });
    } catch (error: any) {
        console.log(error);
        res.send({ message: "Something went wrong please try again!", success: false });
    }

}

export async function getAllArticles(req: Request, res: Response): Promise<void> {
    try {
        const articles = await dbClient.article.findMany({ orderBy: { createdAt: 'desc' }, include: { author: true } });
        res.send(articles);
    } catch (err: any) {
        res.send({ message: "Something went wrong please try again!", success: false });
    }
}

export async function getArticleById(req: Request, res: Response): Promise<void> {
    const { slug } = req.body;
    try {
        const article = await dbClient.article.findUnique({
            where: {
                slug: slug
            },
            include: { comments: true },

        });
        res.send({ data: article, success: true });
    } catch (err: any) {
        res.send({ message: "Something went wrong please try again!", success: false });
    }
}

export async function getArticleBySearchTerm(req: Request, res: Response): Promise<void> {
    const { searchTerm } = req.body;
    try {
        const article = await dbClient.article.findMany({
            where: {
                title: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            },
            include: { author: true },

        });
        res.send({ data: article, success: true });
    } catch (err: any) {
        res.send({ message: "Something went wrong please try again!", success: false });
    }
}