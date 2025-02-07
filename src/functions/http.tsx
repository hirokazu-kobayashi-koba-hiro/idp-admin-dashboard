export const createBasicAuthHeader = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const basicParam = `${username}:${password}`;
  return {
    Authorization: `Basic ${Buffer.from(basicParam).toString("base64")}`,
  };
};
