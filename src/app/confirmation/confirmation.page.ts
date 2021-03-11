import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Comanda from '../models/Comanda';
import Products from '../models/Produts';
import { ComandaService } from '../services/comanda.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'confirmation.page.html',
  styleUrls: ['confirmation.page.scss']
})
export class ConfirmationPage implements OnInit {
  products;
  productSelected: Products;
  total
  idComanda
  comanda
  constructor(
    private route: ActivatedRoute,
    private comandaService: ComandaService) { }

  ngOnInit(): void {
    // this.idProduct = this.route.snapshot.paramMap.get('id');
    
    this.route.queryParams.subscribe((params) => {
      this.idComanda = params['comanda'];
    });
    this.getComanda(this.idComanda);
  }

  getComanda(id) {
    this.comandaService.getById(this.idComanda)
      .subscribe(data => {
        this.comanda = data as Comanda[];
        console.log(this.comanda);

      })
  }

}
