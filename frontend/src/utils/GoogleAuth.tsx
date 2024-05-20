export const getGoogleCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
    const GOOGLE_CLIENT_SECRET =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "";
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL ?? "";
    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: GOOGLE_CLIENT_ID,
      secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: CALLBACK_URL,
      prompt: "select_account",
      access_type: "online",
      scope,
    });

    const url = `${googleAuthUrl}?${params}`;

    const windowFeatures = `width=1000,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,
      location=no,directories=no,status=no`;

    const centeredTop = (window.innerHeight - 300) / 2;
    const centeredLeft = (window.innerWidth - 1000) / 2;

    const authWindow = window.open(
      url,
      "_blank",
      `${windowFeatures},top=${centeredTop},left=${centeredLeft}`
    );

    const messageListener = (event: MessageEvent) => {
      if (event.data.event === "auth-success") {
        const code = event.data.code;
        window.removeEventListener("message", messageListener);
        resolve(code);
      }
    };

    window.addEventListener("message", messageListener);

    // Reject the promise after 5 minutes if no message is received
    setTimeout(() => {
      window.removeEventListener("message", messageListener);
      reject(new Error("Timeout waiting for auth-success message"));
    }, 5 * 60 * 1000); // 5 minutes
  });
};
