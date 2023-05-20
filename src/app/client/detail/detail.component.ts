import { Component, Directive, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services_client/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  oneItem : any ;
  isLoading : Boolean = true ;
  constructor(private route: ActivatedRoute , private dataservice : DataService , public sanitizer : DomSanitizer ,private el: ElementRef , private renderer: Renderer2){

  }

  ngOnInit(): void {
    const myId = this.route.snapshot.paramMap.get('name');
    console.log(myId);
    this.getDetail(myId);
  }

  ngAfterViewInit() {
    // Tìm tất cả các thẻ img trong nội dung HTML
    const imgs = this.el.nativeElement.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
      this.renderer.setStyle(imgs[i], 'max-width', '100%');
      console.log(imgs[i]);

    }
  }


   async getDetail(id : any) {
      (await this.dataservice.get('/listnew/' + id)).subscribe((v:any) => {
          this.oneItem = v ;
          this.isLoading = false ;
          this.oneItem.description = this.addMaxWidthToImages(v.description);
      })
  }

  addMaxWidthToImages(html : any) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const imgs = div.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute('style', 'max-width: 100%');
    }
    return div.outerHTML;
  }
}
