import path from "path";
//import fs from 'fs';
import matter from "gray-matter/gray-matter.d.ts";
import fs from "fs";
import { remark } from "remark/index.js";
import html from "remark-html/index.js";

const postDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    return allPostData;

}

export function getAllpostIds() {
    const fileNames = fs.readdirSync(postDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);
    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}