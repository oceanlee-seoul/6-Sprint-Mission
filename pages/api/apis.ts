import axios from '@/lib/axios';

export interface ILoadArticlesParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
}

export async function loadArticles({
  page = 1,
  pageSize = 99,
  orderBy = 'recent',
  keyword = '',
}: ILoadArticlesParams) {
  try {
    const res = await axios.get('/articles', {
      params: { page, pageSize, orderBy, keyword },
    });
    return res.data.list;
  } catch (error) {
    console.error('Error get Articles', error);
  }
}

export async function loadArticlesDetail(articleId: string) {
  try {
    const res = await axios.get(`/articles/${articleId}`);
    return res.data;
  } catch (error) {
    console.error('Error get Articles Detail', error);
  }
}

export async function loadCommentsList(articleId: string) {
  try {
    const res = await axios.get(`/articles/${articleId}/comments`, {
      params: { articleId, limit: 99 },
    });
    return res.data.list;
  } catch (error) {
    console.error('Error get Articles Detail', error);
  }
}
