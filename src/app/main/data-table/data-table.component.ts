import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import constantes from '../../constantes';
import {ClientDataSource} from '../../services/datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  endpoint = constantes;
  displayedColumns: string[] = ['id','nombres','apellidos','tipoid','identificacion','pais','estadp','ciudad','telefono','correo'];
  dataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  search = ''

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new ClientDataSource(this.api);
    this.dataSource.loadClients()
  }
  
  ngAfterViewInit(): void {
    this.paginator.page
    .pipe(tap(e => this.dataSource.loadClients(this.search, e['pageIndex'])))
    .subscribe()
  }


  applyFilter(value){
    this.search = value
    this.dataSource.loadClients(value)
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}










