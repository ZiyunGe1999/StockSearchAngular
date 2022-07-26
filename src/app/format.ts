export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export interface AutoCompleteInfoItem {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

export interface AutoCompleteInfo {
    count: number,
    result:
        {
            [key: string]: AutoCompleteInfoItem;
        };
}

export interface CompanyDescription {
    country :	string
    currency :	string
    exchange :	string
    finnhubIndustry	: string
    ipo :	string
    logo :	string
    marketCapitalization :	number
    name :	string
    phone :	string
    shareOutstanding :	number
    ticker :	string
    weburl :	string
}

export interface CompanyLatestPrice {
    c : number,
    d : number,
    dp : number,
    h : number,
    l : number,
    o : number,
    pc : number,
    t : number
}

export interface CompanyPeers {
    peers: string[]
}

export interface CompanyHistoricalData {
    c : number[],
    h : number[],
    l : number[],
    o : number[],
    s : string,
    t : number[],
    v : number[],
}

export interface CompanyNews {
    datetime :	number,
    headline :	string,
    id :	number,
    image :	string,
    related :	string,
    source :	string,
    summary :	string,
    url :	string,
}

export interface SocialSentimentItem {
    atTime:	string,
    mention:	number,
    positiveScore:	number,
    negativeScore:	number,
    positiveMention:	number,
    negativeMention:	number,
    score: number,
}

export interface SocialSentiment {
    reddit: SocialSentimentItem[],
    symbol: string,
    twitter: SocialSentimentItem[]
}

export interface CompanyEarningItem {
    actual : number | null
    estimate : number | null
    period : string
    surprise : number | null
    surprisePercent : number | null
    symbol : string
}

export interface RecommendationItem {
    buy	:number
    hold:	number
    period:	string
    sell	:number
    strongBuy:	number
    strongSell:	number
    symbol	:string
}