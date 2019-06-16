export class ConstantsVariables {

    public  _pageNo:number;
    public  _limit:number;
    public  _totalNoOfRecords:number;

    // public static setPageNo(pageNo:number):void{
    //     this._pageNo=pageNo
    // }
    // public static getPageNo():number{
    //    return this._pageNo;
    // }
    // public static setLimit(limit:number):void{
    //     this._limit=limit
    // }
    // public static getLimit():number{
    //    return this._limit;
    // }
    // public static setTotalNoOfRecords(_totalNoOfRecords:number):void{
    //     this._totalNoOfRecords=_totalNoOfRecords
    // }
    // public static getTotalNoOfRecords():number{
    //    return this._totalNoOfRecords;
    // }

    public  getPageOffset():number
    {
        return this._pageNo*this._limit;
    }
}
