import { Component, NgZone, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ICustomWindow, WindowRefService } from 'src/app/service/window-ref.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product: any = [];
  public grandTotal !: number;
  private _window!: ICustomWindow;
  public rzp:any;
  public redirect_url !: any;
  public options: any = {
    key: 'rzp_test_HTQz79bVMhpN4L', //Add Razorpay Key Here!
    name: 'Kitchen Story',
    description: 'Shopping',
    amount: 0,
    prefill: {
      name: 'Kitchen Story',
      email: '', 
    },
    notes:{},
    theme:{
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal:{
      ondismiss: (() => {
          this.zone.run(()=>{
            //add current page routing if payment fails
            alert("Transaction Failed!");
          })
      })
    }
  };

  constructor(private cartService: CartService, private zone: NgZone, private winRef: WindowRefService) { 
    this._window = this.winRef.nativeWindow;
  }

  initPay(): void{
    this.options.amount = this.grandTotal*100;
    this.rzp = new this.winRef.nativeWindow.Razorpay(this.options);
    this.rzp.open();
  }


  paymentHandler(res:any){
    this.zone.run(()=>{
      //add API call here
      alert("Transaction Completed");
      this.redirect_url = 'http://localhost:4200/products';
      location.href = this.redirect_url;
    });
  }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(res=>{
      this.product = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }



}
