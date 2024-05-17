import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const HOST = process.env.NEXT_PUBLIC_HOST ?? "http://127.0.0.1:8000";

  const response = await axios.post(`${HOST}/api/user/google-auth/`, {
    code,
    redirect_uri: "http://localhost:3000/api/auth/google/callback",
  });

  const { data } = response;

  return NextResponse.json("message: 'success'");
}
