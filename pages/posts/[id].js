import Layout from "@/components/Layout";
import { getAllpostIds, getPostData } from "@/lib/post";
import utilStyles from '../../styles/utils.module.css';
import { useRouter } from "next/router";

export async function getStaticPaths() {
    const paths = getAllpostIds();

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);
    return {
        props : {
            postData,
        },
    };

}

export default function Post({postData}) {

    const router = useRouter();
    if(router.isFallback) {
        return <div>読み込み中...</div>
    }

    return (
        <Layout>
            <article>
                <h1 className={utilStyles.handingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}/>
            </article>
        </Layout>
    );
}