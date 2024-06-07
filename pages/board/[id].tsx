import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';

import Container from '@/components/Container';

import { IArticle, IArticleComment } from '@/interface/interface';
import { loadArticlesDetail, loadCommentsList } from '@/pages/api/apis';
import { formatDate } from '@/utils/utils';

import ICON_KEBAB from '@/public/icon-kebab.svg';
import IMG_PROFILE from '@/public/profile.svg';
import ICON_HEART from '@/public/icon-heart.svg';

export default function BoardDetail() {
  const router = useRouter();
  const [article, setArticle] = useState<IArticle>();
  const [comments, setComments] = useState<IArticleComment[]>([]);

  const fetchArticleDetail = async () => {
    if (typeof router.query.id === 'string') {
      const articleDetail: IArticle = await loadArticlesDetail(router.query.id);
      setArticle(articleDetail);
    }
  };

  const fetchCommentsList = async () => {
    if (typeof router.query.id === 'string') {
      const commentsList: IArticleComment[] = await loadCommentsList(
        router.query.id,
      );
      setComments(commentsList);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
    fetchCommentsList();
  }, [router.query.id]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <>
      <Head>
        <title>{`${article?.title}`}</title>
      </Head>
      <div className="flex items-center justify-center">
        <Container>
          <div className="border-b pb-[20px]">
            <div className="flex justify-between mb-[20px]">
              <h1 className="text-[20px] text-[#1f2937] font-bold">
                {article?.title}
              </h1>
              <Image
                className="cursor-pointer"
                src={ICON_KEBAB}
                alt="더보기 아이콘"
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <Image src={IMG_PROFILE} alt="프로필 이미지" />
              <p className="text-[#4B5563] text-[14px]">
                {article?.writer.nickname}
              </p>
              <p className="text-[#9CA3AF] text-[12px]">
                {formatDate(article ? article?.updatedAt : '')}
              </p>
              <div className="bg-[#E5E7EB] w-[1px] h-[24px]"></div>
              <Image src={ICON_HEART} alt="좋아요 아이콘" />
              <p className="text-[14px] text-[#6B7280]">{article?.likeCount}</p>
            </div>
          </div>
          <div className="py-[20px]">{article?.content}</div>
        </Container>
      </div>
    </>
  );
}
