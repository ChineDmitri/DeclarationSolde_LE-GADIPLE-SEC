export class User {
  constructor(
    public _id: string,
    public dateDeclaration: any,
    public start: boolean,
    public nom: string,
    public dateFDC_str: string,
    public dateFDC_utc: any,
    // public MonthPay: any[], // not use
    public MonthSolde: Number[]
  ) {}
}
