import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    //console.log(data);
    return NextResponse.redirect(new URL('/login', request.url));
    //return NextResponse.json(null);
  } catch (error) {
    //console.log(error);
    return NextResponse.error();
  }
}
