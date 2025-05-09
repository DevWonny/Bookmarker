import { NextResponse, NextRequest } from "next/server";
import { parseStringPromise } from 'xml2js';
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('req :', req)
  const query = new URL(req.url).searchParams.toString();
  console.log("🚀 ~ GET ~ test:", query);
  try {
    const res = await axios.get(`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?${query}`, { responseType: 'text' });

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