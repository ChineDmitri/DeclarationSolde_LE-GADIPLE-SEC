export class User {
  constructor(
    public start: boolean,
    public nom: string,
    public dateFDC_str: string,
    public dateFDC_utc: any,
    public MonthPay: any[],
    public MontSolde: number[]
  ) {}
}
