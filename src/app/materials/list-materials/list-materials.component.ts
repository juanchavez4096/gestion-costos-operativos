import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MaterialService } from '../../core/services/material.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core/paging';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.scss']
})
export class ListMaterialsComponent implements OnInit {

  searchInputTerm: string;
  materials: any[] = [];
  total: number = 0;
  pageSize: number = 0;
  beginPage = false
  
  constructor(private materialService: MaterialService, public auth: AuthService, private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.searchMaterials(0, '');
    this.beginPage = true;
  }

  goToMaterial(materialId: number){
    this.router.navigate([`materials`, materialId]);
  } 

  searchMaterials(page: number, event: string){
    this.searchInputTerm = event;
    this.materialService.getMaterials(page, this.searchInputTerm).subscribe(material => {
      this.materials = material.content;
      this.total = material.totalElements;
      this.pageSize = material.size;
    })
  }

  imageLoaded(i: number){
    this.materials[i].imageLoaded = true;
  }

  changePage(event: IPageChangeEvent){
    if (!this.beginPage) {
      this.searchMaterials(event.page-1, this.searchInputTerm);
    }else{
      this.beginPage = false;
    }
  }

  confirmDelete(materialId: number){
    this._dialogService.openConfirm({
      message: 'Se borrará el material y no podrá ser devuelto. Los productos se actualizarán quitando el costo de éste material. También se borrará la imagen de este material. ¿Estás de acuerdo?',
      disableClose: true,
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Confirmar', //OPTIONAL, hides if not provided
      cancelButton: 'Rechazar', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Aceptar', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.materialService.deleteMaterial(materialId).subscribe(event => {
          this.searchMaterials(0, '');
        }, error => {
          this._dialogService.openAlert({
            message: 'Ha ocurrido un error interno, intente de nuevo más tarde.',
            disableClose: false, // defaults to false
            viewContainerRef: this._viewContainerRef, //OPTIONAL
            title: 'Error', //OPTIONAL, hides if not provided
            closeButton: 'Cerrar', //OPTIONAL, defaults to 'CLOSE'
            width: '400px', //OPTIONAL, defaults to 400px
          });
        })
      }
    });
    
  }

}
