import { NextResponse, NextRequest } from "next/server";
import { parseStringPromise } from 'xml2js';
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = new URL(req.url).searchParams.toString();
  const url = process.env.NEXT_PUBLIC_ALADIN_URL;

  try {
    const res = await axios.get(`${url}/ItemList.aspx?${query}`, { responseType: 'text' });

    const jsonData = await parseStringPromise(res.data, {
      explicitArray: false,
      mergeAttrs: true,
      trim: true
    })

    return NextResponse.json(jsonData.object);

  } catch (err) {
    console.log('err', err);
    return NextResponse.json({ code: 'Error', description: err });
  }

}