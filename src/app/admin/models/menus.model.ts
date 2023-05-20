export class Menus {
  _id : String = '' ;
  title : String = '' ;
  category_id : String = '' ;

  constructor (_id : String , title : String , category_id : String) {
    this._id = _id ;
    this.title = title ;
    this.category_id = category_id ;
  }
}
