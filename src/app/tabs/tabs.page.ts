import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  activeTabName;
  tab1Active : boolean = false;
  tab2Active : boolean = false;
  tab3Active : boolean = false;
  @ViewChild('myTabs') tabs: IonTabs;

  constructor() { }

  getSelectedTab(): void {
    this.activeTabName = this.tabs.getSelected();

    switch (this.activeTabName) {
      case 'tab1':
        this.tab1Active = true;
        this.tab2Active = false;
        this.tab3Active = false;
        break;
      case 'tab2':
        this.tab2Active = true;
        this.tab1Active = false;
        this.tab3Active = false;
        break;
      case 'tab3':
        this.tab3Active = true;
        this.tab2Active = false;
        this.tab1Active = false;
        break;
    }

  }
}
