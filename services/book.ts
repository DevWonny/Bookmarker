import axios from 'axios';
export const BookSearch = async () => {
  const key = "ttbcjfdnjs19941047001";

  const res = await axios.get(' http://www.aladin.co.kr/ttb/api/ItemSearch.aspx', {
    params: {
      ttbkey: key,
      Query: '기억서점'
    }
  })
  console.log("🚀 ~ BookSearch ~ res:", res)


};