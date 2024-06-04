import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { loadArticles, ILoadArticlesParams } from './api/apis';

import Button from '@/components/Button';
import ArticleListItem from '@/components/ArticlesListItem';
import Container from '@/components/Container';
import FilterBox from '@/components/FilterBox';

import ICON_MAGNIFY from '@/public/icon-magnify.svg';
import BestArticleItem from '@/components/BestArticleItem';

export interface IArticle {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

type TDisplaySize = 'desktop' | 'tablet' | 'mobile';

export default function Board() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [bestArticles, setBestArticles] = useState<IArticle[]>([]);
  const [params, setParams] = useState<ILoadArticlesParams>({
    page: 1,
    pageSize: 99,
    orderBy: 'recent',
    keyword: '',
  });

  const [displaySize, setDisplaySize] = useState<TDisplaySize>();

  const fetchArticles = async () => {
    const articleList = await loadArticles(params);
    setArticles(articleList || []);
  };
  const fetchBestArticles = async () => {
    const BestArticleList = await loadArticles({
      pageSize: 3,
      orderBy: 'like',
    });
    setBestArticles(BestArticleList || []);
  };

  function paramsHandler(
    key: keyof ILoadArticlesParams,
    value: string | number,
  ) {
    setParams((prevParams) => ({ ...prevParams, [key]: value }));
  }

  function getResponseBestArticleSize(
    displaySize: TDisplaySize | undefined,
  ): number {
    let articlesToDisplay;
    switch (displaySize) {
      case 'desktop':
        articlesToDisplay = 3;
        break;
      case 'tablet':
        articlesToDisplay = 2;
        break;
      default:
        articlesToDisplay = 1;
    }
    return articlesToDisplay;
  }

  useEffect(() => {
    function getDisplaySize() {
      const width = window.innerWidth;
      if (width < 768) {
        return 'mobile';
      } else if (width < 1200) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    }

    fetchArticles();
    fetchBestArticles();
    setDisplaySize(getDisplaySize());

    window.addEventListener('resize', () => {
      setDisplaySize(getDisplaySize());
    });

    return () => {
      window.removeEventListener('resize', () => {
        setDisplaySize(getDisplaySize());
      });
    };
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [params.orderBy]);

  return (
    <>
      <Head>
        <title>판다마켓 - 자유게시판</title>
      </Head>
      <div className="flex items-center justify-center">
        <Container>
          <section>
            <h1 className="font-bold text-[20px] mb-[20px]">베스트 게시글</h1>
            <div className="flex justify-around md:gap-[10px] mb-[30px]">
              {bestArticles
                ?.slice(0, getResponseBestArticleSize(displaySize))
                .map((article) => (
                  <BestArticleItem
                    key={`BestArticle-${article.id}`}
                    article={article}
                  />
                ))}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mb-[20px]">
              <h1 className="font-bold text-[20px]">게시글</h1>
              <div className="w-[88px] h-[42px] rounded-lg overflow-hidden">
                <Button>글쓰기</Button>
              </div>
            </div>
            <div className="flex justify-between gap-[15px] h-[42px]">
              <div className="relative flex-1">
                <input
                  className="w-[100%] h-[100%] pl-[35px] bg-[#f3f4f6] rounded-xl"
                  type="text"
                  value={params.keyword}
                  onChange={(e) => {
                    paramsHandler('keyword', e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      fetchArticles();
                    }
                  }}
                  placeholder="검색할 상품을 입력해주세요"
                />
                <Image
                  className="absolute top-[13px] left-[10px]"
                  src={ICON_MAGNIFY}
                  alt="검색 아이콘 이미지"
                />
              </div>
              <FilterBox
                orderBy={params.orderBy || 'recent'}
                paramsHandler={paramsHandler}
                displaySize={displaySize || 'desktop'}
              />
            </div>
            <div>
              {articles?.map((article) => (
                <ArticleListItem
                  key={`article-${article.id}`}
                  article={article}
                />
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
