import camelcaseKeys from "camelcase-keys";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return camelcaseKeys(jsonResponse, { deep: true });
};

export const makeQueryString = (params: Record<string, any>) => {
  return new URLSearchParams(params).toString();
};
