import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../core/services/material.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core/paging';

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
  
  constructor(private materialService: MaterialService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.searchMaterials(0, '');
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
    this.searchMaterials(event.page-1, this.searchInputTerm);
  }

}
