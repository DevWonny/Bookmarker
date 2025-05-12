import axios from 'axios';

const key = process.env.NEXT_PUBLIC_ALADIN_KEY;
// 책 검색
export const BookSearch = async (query: string) => {
  try {
    const res = await axios.get('/api/aladin/bookSearch', { params: { ttbkey: key, query } });
    return res;
  } catch (err) {
    console.error('err - ', err)
  }
}

export const BookList = async (type: string) => {
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
      params: { ttbkey: key, queryType: type, searchTarget: 'Book', Version: 20131101 }
    });

    console.log("🚀 ~ BookList ~ res:", res)
    return res;
  } catch (err) {
    console.error('err - ', err)
  }
}
