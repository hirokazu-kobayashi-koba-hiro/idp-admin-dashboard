function decode(base64edString: string) {
  const base64 = base64edString.replace(/-/g, "+").replace(/_/g, "/");
  const decodedValue = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );

  return JSON.parse(decodedValue);
}

export function decodeJwt(
  token: string,
): { header: any; payload: any; signature: string } | null {
  try {
    const splittedToken = token.split(".");
    const header = decode(splittedToken[0]);
    const payload = decode(splittedToken[1]);
    const signature = splittedToken[2];
    return {
      header: header,
      payload: payload,
      signature: signature,
    };
  } catch (error) {
    return null;
  }
}
