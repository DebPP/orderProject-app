import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import Products from '../models/Produts';
import { IonTabs } from '@ionic/angular';
import { productsService } from '../services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  products : Products[];
  constructor(private httpClient: HttpClient,
    private productsService: productsService,
    private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.get()
      .subscribe(data => {
        this.products = data as Products[];
       
      })
  }

  details(id) {
    this.router.navigate(['/details' ,id]);
  }
}
