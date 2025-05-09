import { NextResponse, NextRequest } from "next/server";
import { parseStringPromise } from 'xml2js';
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const res = await axios.get('http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbcjfdnjs19941047001&Query=기억서점', { responseType: 'text' });


    const jsonData = await parseStringPromise(res.data, {
      explicitArray: false,
      mergeAttrs: true,
      trim: true
    })

    return NextResponse.json(jsonData.object);

  } catch (err) {
    console.log('err', err);
    return NextResponse.json({ code: 'Error' });
  }

}