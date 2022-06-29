export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const makeQueryString = (params: Record<string, any>) => {
  return new URLSearchParams(params).toString();
};
