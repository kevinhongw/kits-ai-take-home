export type KitsAiPaginateResponse<T> = {
  data: T[];
  meta: KitsAiPaginationMetadata;
};

export type KitsAiPaginationMetadata = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

export type CreateTtsJobRequest = {
  voiceModelId: string;
  inputTtsText: string;
};
