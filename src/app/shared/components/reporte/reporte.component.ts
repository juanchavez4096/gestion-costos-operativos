import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PdfService } from '../../../core/services/pdf.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public reporteForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private pdfService: PdfService) { 
      this.reporteForm = this.fb.group({
        desde: ['', [Validators.required]],
        hasta: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  onSubmit(form: FormGroup){
    if (!form.valid) {
      return;
    }
    const values = form.value

    this.pdfService.generatePdf(values.desde, values.hasta, this.data.reportType).subscribe(data => {
      console.log(data);
        var blob = new Blob([data], {type: 'application/pdf'});
        console.log(blob);
        saveAs(blob, "testData.pdf");
      
    });

    
  }

}
