import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../assets/model/item.schema';
import { DatabaseService } from '../../../providers/database.service';

@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.scss']
})
export class ItemslistComponent implements OnInit {

  itemList: Item[];

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    console.log('component initialized');
    this.database.getItems().subscribe((items) => (this.itemList = items));
  }

  addItem(): void {
    let item = new Item();
    item.name = 'Item ' + this.itemList.length;
    this.database.addItem(item).subscribe((items) => (this.itemList = items));
  }

  deleteItem(): void {
    const item = this.itemList[this.itemList.length - 1];
    this.database
      .deleteItem(item)
      .subscribe((items) => (this.itemList = items));
  }
}
