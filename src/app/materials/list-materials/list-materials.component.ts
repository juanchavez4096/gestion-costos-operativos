import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../core/services/material.service';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-materials',
  templateUrl: './list-materials.component.html',
  styleUrls: ['./list-materials.component.scss']
})
export class ListMaterialsComponent implements OnInit {

  searchInputTerm: string;
  materials: any[] = [];
  
  constructor(private materialService: MaterialService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.materialService.getMaterials().subscribe(material => {
      this.materials = material.content;
    });
  }

  goToMaterial(materialId: number){
    this.router.navigate([`materials`, materialId]);
  } 

  searchMaterial(event: string){
    this.searchInputTerm = event;
    this.materialService.searchMaterials(this.searchInputTerm).subscribe(material => {
      this.materials = material.content;
    })
  }

}
