import camelcaseKeys from "camelcase-keys";

// This file should have some unit test but 🙈

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return camelcaseKeys(jsonResponse, { deep: true });
};

export const makeQueryString = (params: Record<string, any>) => {
  return new URLSearchParams(params).toString();
};
