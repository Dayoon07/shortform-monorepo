export interface Page<T> {
    number: number,
    size: number,
    numberOfElements: number,
    last: boolean,
    totalPages: number,
    content: T[],
    first: boolean,
    totalElements: number,
    empty: boolean
}