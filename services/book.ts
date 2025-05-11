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
    const res = await axios.get('/api/aladin/bookList', {
      params: { ttbkey: key, queryType: type, searchTarget: 'Book', Version: 20131101 }
    });
    return res;
  } catch (err) {
    console.error('err - ', err)
  }
}
