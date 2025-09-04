import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  imports: [],
  templateUrl: './default-login-layout.html',
  styleUrl: './default-login-layout.scss'
})
export class DefaultLoginLayout {
    @Input() title:string = "";
    @Input() primaryBtnText: string = "";
    @Input() secondaryBtnText: string = "";
    @Input() disabledPrimaryBtn: boolean = true;
    @Output("send") onSubmit = new EventEmitter();
    @Output("navigate") onNavigate = new EventEmitter();

    send(){
      this.onSubmit.emit();
    }

      navigate(){
      this.onNavigate.emit();
    }


}
