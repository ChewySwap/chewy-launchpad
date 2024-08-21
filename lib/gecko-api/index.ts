/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorsObject {
    errors?: {
      status?: string;
      title?: string;
    }[];
  }

  export type Relationships = object;

  export interface SimpleTokenPrice {
    id?: string;
    type?: string;
    attributes?: {
      /** @example {"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":"0.996586003049284","0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2":"1822.49988301345"} */
      token_prices?: object;
    };
  }

  export type H24VolumeUsd = {
    h24?: string | null;
  }

  export interface Token {
    id?: string;
    type?: string;
    attributes?: {
      name?: string;
      address?: string;
      symbol?: string;
      decimals?: number;
      total_supply?: string | null;
      coingecko_coin_id?: string | null;
      price_usd?: string | null;
      fdv_usd?: string | null;
      total_reserve_in_usd?: string | null;
      volume_usd?:  {
        h24?: string | object | null;
      };
      market_cap_usd?: string | null;
    };
    relationships?: Relationships;
  }

  export interface TokenInfo {
    id?: string;
    type?: string;
    attributes?: {
      name: string;
      address: string;
      symbol: string;
      decimals?: number;
      coingecko_coin_id: string | null;
      image_url: string | null;
      websites: string[];
      description: string | null;
      discord_url: string | null;
      telegram_handle: string | null;
      twitter_handle: string | null;
      /** @format float */
      gt_score: number | null;
      /** @format datetime */
      metadata_updated_at?: string | null;
    };
    relationships?: Relationships;
  }

  export interface Pool {
    id?: string;
    type?: string;
    attributes?: {
      name?: string;
      address?: string;
      base_token_price_usd?: string | null;
      quote_token_price_usd?: string | null;
      base_token_price_native_currency?: string | null;
      quote_token_price_native_currency?: string | null;
      base_token_price_quote_token?: string | null;
      quote_token_price_base_token?: string | null;
      /** @format datetime */
      pool_created_at?: string | null;
      reserve_in_usd?: string | null;
      fdv_usd?: string | null;
      market_cap_usd?: string | null;
      price_change_percentage?: object;
      transactions?: object;
      volume_usd?: object;
    };
    relationships?: Relationships;
  }

  export interface Ohlcv {
    data?: {
      id?: string;
      type?: string;
      attributes?: {
        ohlcv_list?: number[][];
      };
    };
    /** @example {"base":{"address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"Wrapped Ether","symbol":"WETH","coingecko_coin_id":"weth"},"quote":{"address":"0x6b175474e89094c44da98b954eedeac495271d0f","name":"Dai Stablecoin","symbol":"DAI","coingecko_coin_id":"dai"}} */
    meta?: {
      base?: OhlcvToken;
      quote?: OhlcvToken;
    };
  }

  export interface OhlcvToken {
    name?: string;
    symbol?: string;
    address?: string;
    coingecko_coin_id?: string | null;
  }

  export interface Trade {
    id?: string;
    type?: string;
    attributes?: {
      block_number?: number;
      /** @format datetime */
      block_timestamp?: string;
      tx_hash?: string;
      tx_from_address?: string;
      from_token_amount?: string;
      to_token_amount?: string;
      price_from_in_currency_token?: string;
      price_to_in_currency_token?: string;
      price_from_in_usd?: string;
      price_to_in_usd?: string;
      kind?: string;
      volume_in_usd?: string;
      from_token_address?: string;
      to_token_address?: string;
    };
  }

  export type PoolsOhlcvDetailData = Ohlcv;

  export interface DexesDetailData {
    data?: {
      id?: string;
      type?: string;
      attributes?: {
        name?: string;
      };
    }[];
  }

  export interface NetworksListData {
    data?: {
      id?: string;
      type?: string;
      attributes?: {
        name?: string;
      };
    }[];
  }

  export interface TrendingPoolsListData {
    data?: Pool[];
  }

  export interface TrendingPoolsDetailData {
    data?: Pool[];
  }

  export type PoolsDetailData = Pool;

  export interface PoolsMultiDetailData {
    data?: Pool[];
    included?: any[];
  }

  export interface PoolsDetail2Data {
    data?: Pool[];
  }

  export interface DexesPoolsDetailData {
    data?: Pool[];
  }

  export interface TokensPoolsDetailData {
    data?: Pool[];
  }

  export interface NewPoolsDetailData {
    data?: Pool[];
  }

  export interface NewPoolsListData {
    data?: Pool[];
  }

  export interface PoolsListData {
    data?: Pool[];
    included?: any[];
  }

  export interface PoolsTradesDetailData {
    data?: Trade[];
  }

  export interface TokensDetailData {
    data?: Token;
  }

  export interface TokensMultiDetailData {
    data?: Token[];
    included?: any[];
  }

  export interface TokensInfoDetailData {
    data?: TokenInfo;
  }

  export interface PoolsInfoDetailData {
    data?: TokenInfo[];
  }

  export interface InfoRecentlyUpdatedListData {
    data?: TokenInfo[];
  }

  export interface NetworksTokenPriceDetailData {
    data?: SimpleTokenPrice;
  }

  export type QueryParamsType = Record<string | number, any>;
  export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

  export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
  }

  export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

  export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
  }

  export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
  }

  type CancelToken = Symbol | string | number;

  export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
  }

  export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "https://api.geckoterminal.com/api/v2";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

    private baseApiParams: RequestParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
      Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
      this.securityData = data;
    };

    protected encodeQueryParam(key: string, value: any) {
      const encodedKey = encodeURIComponent(key);
      return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
      return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
      const value = query[key];
      return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
      const query = rawQuery || {};
      const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
      return keys
        .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
        .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
      const queryString = this.toQueryString(rawQuery);
      return queryString ? `?${queryString}` : "";
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
      [ContentType.Json]: (input: any) =>
        input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
      [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
      [ContentType.FormData]: (input: any) =>
        Object.keys(input || {}).reduce((formData, key) => {
          const property = input[key];
          formData.append(
            key,
            property instanceof Blob
              ? property
              : typeof property === "object" && property !== null
                ? JSON.stringify(property)
                : `${property}`,
          );
          return formData;
        }, new FormData()),
      [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
      return {
        ...this.baseApiParams,
        ...params1,
        ...(params2 || {}),
        headers: {
          ...(this.baseApiParams.headers || {}),
          ...(params1.headers || {}),
          ...((params2 && params2.headers) || {}),
        },
      };
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
      if (this.abortControllers.has(cancelToken)) {
        const abortController = this.abortControllers.get(cancelToken);
        if (abortController) {
          return abortController.signal;
        }
        return void 0;
      }

      const abortController = new AbortController();
      this.abortControllers.set(cancelToken, abortController);
      return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);

      if (abortController) {
        abortController.abort();
        this.abortControllers.delete(cancelToken);
      }
    };

    public request = async <T = any, E = any>({
      body,
      secure,
      path,
      type,
      query,
      format,
      baseUrl,
      cancelToken,
      ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
      const secureParams =
        ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
          this.securityWorker &&
          (await this.securityWorker(this.securityData))) ||
        {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || ContentType.Json];
      const responseFormat = format || requestParams.format;

      return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
      }).then(async (response) => {
        const r = response.clone() as HttpResponse<T, E>;
        r.data = null as unknown as T;
        r.error = null as unknown as E;

        const data = !responseFormat
          ? r
          : await response[responseFormat]()
              .then((data) => {
                if (r.ok) {
                  r.data = data;
                } else {
                  r.error = data;
                }
                return r;
              })
              .catch((e) => {
                r.error = e;
                return r;
              });

        if (cancelToken) {
          this.abortControllers.delete(cancelToken);
        }

        if (!response.ok) throw data;
        return data;
      });
    };
  }

  /**
   * @title GeckoTerminal API V2
   * @version v2-beta
   * @baseUrl /api/v2
   *
   * GeckoTerminal Public API endpoints.
   *
   * ## Beta Release
   * The API is in its Beta release, and is subject to frequent changes.
   * However, we aim to provide minimal disruption, and setting the request Version would help avoid unexpected issues.
   *
   * **Please subscribe via [this form](https://forms.gle/jSMu4jLQBXeiVD1U9) to be notified of important API updates.**
   *
   * ## Base URL
   * All endpoints below use the base URL: `https://api.geckoterminal.com/api/v2`
   *
   * ## Versioning
   * It is recommended to set the API version via the `Accept` header.
   * The current version is **20230302**.
   *
   * For example, to specify the current version, set header `Accept: application/json;version=20230302`.
   *
   * _If no version is specified, the latest version will be used._
   *
   * ## Data Freshness
   * All endpoint tags are cached for **1 minute**
   *
   * All data is updated **roughly 10 to 20 seconds** after a transaction is finalized on the blockchain, subject to the network's availability.
   *
   * ## Rate Limit
   * Our free API is limited to **30 calls/minute**.
   * Should you require a higher rate limit, you may subscribe to any CoinGecko API paid plan to access higher rate limit for GeckoTerminal endpoints (known as /onchain endpoints) or learn more at [CoinGecko](https://www.coingecko.com/en/api/pricing).
   *
   * To share with us your feedback about the public API, let us know [here](https://forms.gle/jSMu4jLQBXeiVD1U9)!
   */
  export class GeckoApi<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    networks = {
      /**
       * No description
       *
       * @tags ohlcvs
       * @name PoolsOhlcvDetail
       * @summary Get OHLCV data of a pool, up to 6 months ago. Empty response if there is no earlier data available.
       * @request GET:/networks/{network}/pools/{pool_address}/ohlcv/{timeframe}
       */
      poolsOhlcvDetail: (
        network: string,
        poolAddress: string,
        timeframe: string,
        query?: {
          /** time period to aggregate for each ohlcv (eg. `/minute?aggregate=15` for 15m ohlcv)<br><br><b>Available values (day):</b> 1<br><br><b>Available values (hour):</b> 1, 4, 12<br><br><b>Available values (minute):</b> 1, 5, 15<br><b>Default:</b> 1 */
          aggregate?: string;
          /** return ohlcv data before this timestamp (integer seconds since epoch)<br><b>Example:</b> 1679414400 */
          before_timestamp?: string;
          /** limit number of ohlcv results to return (default: 100, max: 1000)<br><b>Example:</b> 100 */
          limit?: string;
          /** return ohlcv in USD or quote token (default: usd)<br><br><b>Available values:</b> usd, token */
          currency?: string;
          /** return ohlcv for base or quote token; use this to invert the chart. (default: base)<br><br><b>Available values:</b> base, quote, or a token address */
          token?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<PoolsOhlcvDetailData, ErrorsObject>({
          path: `/networks/${network}/pools/${poolAddress}/ohlcv/${timeframe}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags dexes
       * @name DexesDetail
       * @summary Get list of supported dexes on a network
       * @request GET:/networks/{network}/dexes
       */
      dexesDetail: (
        network: string,
        query?: {
          /**
           * Page through results
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<DexesDetailData, any>({
          path: `/networks/${network}/dexes`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags networks
       * @name NetworksList
       * @summary Get list of supported networks
       * @request GET:/networks
       */
      networksList: (
        query?: {
          /**
           * Page through results
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<NetworksListData, any>({
          path: `/networks`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name TrendingPoolsList
       * @summary Get trending pools across all networks
       * @request GET:/networks/trending_pools
       */
      trendingPoolsList: (
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex, network<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<TrendingPoolsListData, any>({
          path: `/networks/trending_pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name TrendingPoolsDetail
       * @summary Get trending pools on a network
       * @request GET:/networks/{network}/trending_pools
       */
      trendingPoolsDetail: (
        network: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<TrendingPoolsDetailData, ErrorsObject>({
          path: `/networks/${network}/trending_pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name PoolsDetail
       * @summary Get specific pool on a network
       * @request GET:/networks/{network}/pools/{address}
       */
      poolsDetail: (
        network: string,
        address: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<PoolsDetailData, ErrorsObject>({
          path: `/networks/${network}/pools/${address}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name PoolsMultiDetail
       * @summary Get multiple pools on a network
       * @request GET:/networks/{network}/pools/multi/{addresses}
       */
      poolsMultiDetail: (
        network: string,
        addresses: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<PoolsMultiDetailData, ErrorsObject>({
          path: `/networks/${network}/pools/multi/${addresses}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name PoolsDetail2
       * @summary Get top pools on a network
       * @request GET:/networks/{network}/pools
       * @originalName poolsDetail
       * @duplicate
       */
      poolsDetail2: (
        network: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
          /** Sort pools by one of the following options<br><br><b>Available sort options:</b> h24_tx_count_desc, h24_volume_usd_desc<br><br><b>Default:</b> h24_tx_count_desc */
          sort?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<PoolsDetail2Data, ErrorsObject>({
          path: `/networks/${network}/pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name DexesPoolsDetail
       * @summary Get top pools on a network's dex
       * @request GET:/networks/{network}/dexes/{dex}/pools
       */
      dexesPoolsDetail: (
        network: string,
        dex: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
          /** Sort pools by one of the following options<br><br><b>Available sort options:</b> h24_tx_count_desc, h24_volume_usd_desc<br><br><b>Default:</b> h24_tx_count_desc */
          sort?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<DexesPoolsDetailData, ErrorsObject>({
          path: `/networks/${network}/dexes/${dex}/pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * @description contains special field `token_price_usd` representing price of requested token
       *
       * @tags tokens
       * @name TokensPoolsDetail
       * @summary Get top pools for a token
       * @request GET:/networks/{network}/tokens/{token_address}/pools
       */
      tokensPoolsDetail: (
        network: string,
        tokenAddress: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
          /** Sort pools by one of the following options<br><br><b>Available sort options:</b> h24_volume_usd_liquidity_desc, h24_tx_count_desc, h24_volume_usd_desc<br><br><b>Default:</b> h24_volume_usd_liquidity_desc */
          sort?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<TokensPoolsDetailData, ErrorsObject>({
          path: `/networks/${network}/tokens/${tokenAddress}/pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name NewPoolsDetail
       * @summary Get latest pools on a network
       * @request GET:/networks/{network}/new_pools
       */
      newPoolsDetail: (
        network: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<NewPoolsDetailData, ErrorsObject>({
          path: `/networks/${network}/new_pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags pools
       * @name NewPoolsList
       * @summary Get latest pools across all networks
       * @request GET:/networks/new_pools
       */
      newPoolsList: (
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex, network<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<NewPoolsListData, any>({
          path: `/networks/new_pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags trades
       * @name PoolsTradesDetail
       * @summary Get last 300 trades in past 24 hours from a pool
       * @request GET:/networks/{network}/pools/{pool_address}/trades
       */
      poolsTradesDetail: (
        network: string,
        poolAddress: string,
        query?: {
          /** return trades with volume greater than this value in USD (default: 0)<br><b>Example:</b> 100000 */
          trade_volume_in_usd_greater_than?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<PoolsTradesDetailData, ErrorsObject>({
          path: `/networks/${network}/pools/${poolAddress}/trades`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags tokens
       * @name TokensDetail
       * @summary Get specific token on a network
       * @request GET:/networks/{network}/tokens/{address}
       */
      tokensDetail: (
        network: string,
        address: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> top_pools<br><b>Example:</b> top_pools */
          include?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<TokensDetailData, ErrorsObject>({
          path: `/networks/${network}/tokens/${address}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags tokens
       * @name TokensMultiDetail
       * @summary Get multiple tokens on a network
       * @request GET:/networks/{network}/tokens/multi/{addresses}
       */
      tokensMultiDetail: (
        network: string,
        addresses: string,
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> top_pools<br><b>Example:</b> top_pools */
          include?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<TokensMultiDetailData, ErrorsObject>({
          path: `/networks/${network}/tokens/multi/${addresses}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags tokens
       * @name TokensInfoDetail
       * @summary Get specific token info on a network
       * @request GET:/networks/{network}/tokens/{address}/info
       */
      tokensInfoDetail: (network: string, address: string, params: RequestParams = {}) =>
        this.request<TokensInfoDetailData, ErrorsObject>({
          path: `/networks/${network}/tokens/${address}/info`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @tags tokens
       * @name PoolsInfoDetail
       * @summary Get pool tokens info on a network
       * @request GET:/networks/{network}/pools/{pool_address}/info
       */
      poolsInfoDetail: (network: string, poolAddress: string, params: RequestParams = {}) =>
        this.request<PoolsInfoDetailData, ErrorsObject>({
          path: `/networks/${network}/pools/${poolAddress}/info`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    search = {
      /**
       * No description
       *
       * @tags pools
       * @name PoolsList
       * @summary Search for pools on a network
       * @request GET:/search/pools
       */
      poolsList: (
        query?: {
          /** Search query: can be pool address, token address, or token symbol.<br>Returns matching pools.<br><br><b>Example:</b> ETH */
          query?: string;
          /** _(optional)_ network id from /networks list<br><br><b>Example:</b> eth */
          network?: string;
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> base_token, quote_token, dex<br><b>Example:</b> base_token,quote_token */
          include?: string;
          /**
           * Page through results (maximum: 10)
           * @max 10
           * @default 1
           */
          page?: number;
        },
        params: RequestParams = {},
      ) =>
        this.request<PoolsListData, any>({
          path: `/search/pools`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    tokens = {
      /**
       * No description
       *
       * @tags tokens
       * @name InfoRecentlyUpdatedList
       * @summary Get most recently updated 100 tokens info across all networks
       * @request GET:/tokens/info_recently_updated
       */
      infoRecentlyUpdatedList: (
        query?: {
          /** Attributes for related resources to include, which will be returned under the top-level `"included"` key<br><br><b>Available resources:</b> network<br><b>Example:</b> network */
          include?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<InfoRecentlyUpdatedListData, any>({
          path: `/tokens/info_recently_updated`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    simple = {
      /**
       * No description
       *
       * @tags simple
       * @name NetworksTokenPriceDetail
       * @summary Get current USD prices of multiple tokens on a network
       * @request GET:/simple/networks/{network}/token_price/{addresses}
       */
      networksTokenPriceDetail: (network: string, addresses: string, params: RequestParams = {}) =>
        this.request<NetworksTokenPriceDetailData, ErrorsObject>({
          path: `/simple/networks/${network}/token_price/${addresses}`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
  }
