import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  return new NextResponse(
    `<html>
       <body>
         <script>
           window.opener.postMessage({ event: 'auth-success', code: '${code}' }, '*');
           window.close();
         </script>
       </body>
     </html>`,
    {
      headers: { "Content-Type": "text/html" },
    }
  );
}
