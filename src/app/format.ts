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