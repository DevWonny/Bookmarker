import axios from 'axios';

export const BookSearch = async (query: string) => {
  const key = process.env.NEXT_PUBLIC_ALADIN_KEY;


  try {
    const res = await axios.get('/api/aladin', { params: { ttbkey: key, query } });
    console.log("🚀 ~ BookSearch ~ res:", res)
    return res;
  } catch (err) {
    console.log(err);
  }
}