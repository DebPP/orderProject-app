import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Comanda from '../models/Comanda';
import Order from '../models/Comanda';
import Products from '../models/Produts';
import { ComandaService } from '../services/comanda.service';
import { productsService } from '../services/products.service';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})
export class DetailsPage {

  idProduct: string;
  qtdProduto: number = 1;
  product;
  productSelected: Products;
  total;
  pedidos: any;
  produtosSelecionados = [];
  observacao: string
  comandaId
  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: productsService,
    private comandaService: ComandaService,
  ) { }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.getProduct(this.idProduct);
  }

  getProduct(id) {
    this.productsService.getById(id)
      .subscribe(data => {
        this.product = data as Products[];
        this.total = this.product.price
      })
  }

  addProduto(price: number, acao: string) {
    switch (acao) {
      case 'add':
        this.qtdProduto = this.qtdProduto + 1;
        this.total = price * this.qtdProduto;
        break;
      case 'remove':
        if (this.qtdProduto == 0)
          break;
        else
          if (this.total != price && this.qtdProduto != 0) {
            this.qtdProduto = this.qtdProduto - 1;
            this.total = this.total - price;
          }
        break;
    }
  }


  confirmation(id) {
    this.produtosSelecionados.push(id);
    var params: Comanda = {
      comandaId: nanoid(),
      itensId: this.produtosSelecionados,
      mesa: '1',
      confirmado: false,
      observacao: this.observacao,
      total: this.total
    }

    this.comandaService.new(params)
      .subscribe(res => {
        // this.comandaId = res.item.comandaId;
        console.log(res);
        
        // const comanda = this.comandaId;
        // this.router.navigate(['/confirmation'], {
        //   queryParams: { comanda },
        // });
      })
  }

  voltar() {
    this.router.navigate(['/tabs/tab1']);
  }
}
