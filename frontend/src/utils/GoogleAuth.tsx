export const openGoogleLoginPage = () => {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  const GOOGLE_CLIENT_SECRET =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "";
  const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: GOOGLE_CLIENT_ID,
    secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/api/auth/google/callback",
    prompt: "select_account",
    access_type: "online",
    scope,
  });

  const url = `${googleAuthUrl}?${params}`;

  const windowFeatures = `width=1000,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,
    location=no,directories=no,status=no`;

  const centeredTop = (window.innerHeight - 300) / 2;
  const centeredLeft = (window.innerWidth - 700) / 2;

  window.open(
    url,
    "_blank",
    `${windowFeatures},top=${centeredTop},left=${centeredLeft}`
  );
};
