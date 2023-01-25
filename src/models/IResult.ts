export type IPenaltyTypes = null | "+2" | "dnf";

export interface IResult {
    id?: number;
    time: number;
    penalty?: IPenaltyTypes;
    scramble?: string;
    comment?: string;
    date: Date;
}