import axios from 'axios';

const key = process.env.NEXT_PUBLIC_ADDRESS_KEY;

export const AddressTest = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ADDRESS_URL}?serviceKey=${key}&type=json&pageNo=1&numOfRows=10`);
    return res;
  } catch (err) {

    console.log('err - ', err);
    return err;
  }
}