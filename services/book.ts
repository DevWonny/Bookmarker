import axios from 'axios';

// ! Local
// const key = process.env.NEXT_PUBLIC_ALADIN_KEY;
// ! Deployment
const key = process.env.NEXT_PUBLIC_ALADIN_DEPLOYMENT_KEY;
// 책 검색
export const BookSearch = async (query: string, queryType: string) => {
  try {
    const res = await axios.get('/api/aladin/bookSearch', { params: { ttbkey: key, query, cover: 'MidBig', queryType } });
    const { status, data } = res;
    if (status !== 200) {
      return 'Book Search Error';
    }

    return data.item
  } catch (err) {
    console.error('err - ', err)
  }
}

export const BookList = async (type: string, start: number | null = 1) => {
  try {
    // * Main Banner 사용 용도
    if (type === 'ItemNewSpecial') {
      const res = await axios.get('/api/aladin/bookList', {
        params: { ttbkey: key, queryType: type, searchTarget: 'Book', Version: 20131101, maxResults: 10, Cover: 'Big' }
      });

      const { data, status } = res;
      if (status !== 200) {

        return 'Book List Main Banner Error';
      }
      return data.item.filter((el: any) => el.description).slice(0, 3);
    }

    // * Main 하단 Bestseller List
    const res = await axios.get('/api/aladin/bookList', {
      params: { ttbkey: key, queryType: type, searchTarget: 'Book', Version: 20131101, start, cover: 'MidBig' }
    });
    const { data, status } = res;
    if (status !== 200) {
      return 'Book List Bestseller Error';
    }

    return data;
  } catch (err) {
    console.error('err - ', err)
  }
}
