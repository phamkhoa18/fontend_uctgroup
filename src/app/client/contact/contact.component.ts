import { Component } from '@angular/core';
import { DataService } from '../../services_client/data.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


export class User {
  name : String = ''
  email : String = ''
  phone : String = '' ;
  address : String = ''
  title : String = ''
  content : String = ''
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  isLoading : Boolean = false ;
  isValid : Boolean = false ;
  isContact : any ;
  user : User = new User()

  constructor (private dataservice : DataService) {
    this.getContact();
  }

  async submit(data : NgForm) {
    this.isValid = true ;
      if(data.valid)  {
        this.isLoading = true ;
          console.log(this.user);
          const object = {
            username : this.user.name ,
            email : this.user.email ,
            address : this.user.address ,
            phone : this.user.phone ,
            description : this.user.content ,
            title_contact : this.user.title
          };
          (await this.dataservice.post('/sendcontact',object)).subscribe((v : any) => {
                console.log(v);
                if(v.status = 200) {
                  this.user = new User();
                  this.isLoading = false ;
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thông tin đã được gửi đến doanh nghiệp',
                    text: "Cảm ơn bạn rất nhiều ạ , doanh nghiệp sẽ gọi đến bạn sớm nhất !!!",
                    showConfirmButton: false,
                    timer: 1500
                  })
                } else {
                  this.user = new User();
                  this.isLoading = false ;
                  Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng gửi lại thông tin',
                    text: 'Something went wrong!',
                  })
                }
          })
      }
  }

  async getContact() {
      (await this.dataservice.get('/listcontent/contact')).subscribe((v) => {
          this.isContact = v ;
      })
  }

}
