import { NextResponse, NextRequest } from "next/server";
import { parseStringPromise } from 'xml2js';
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = new URL(req.url).searchParams.toString();
  console.log("🚀 ~ GET ~ query:", query)
  const url = process.env.NEXT_PUBLIC_ALADIN_URL;

  try {
    const res = await axios.get(`${url}/ItemList.aspx?${query}`, { responseType: 'text' });

    console.log("🚀 ~ GET ~ res:", res.data)
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