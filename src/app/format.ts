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