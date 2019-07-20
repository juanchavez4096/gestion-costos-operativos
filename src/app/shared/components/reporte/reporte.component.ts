import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PdfService } from '../../../core/services/pdf.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public reporteForm: FormGroup;


  maxDateHasta = new Date();
  maxDateDesde = new Date();


  constructor(public dialogRef: MatDialogRef<ReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private pdfService: PdfService) {

    this.reporteForm = this.fb.group({
      desde: ['', [Validators.required]],
      hasta: ['', Validators.required]
    }, { validator: this.dateLessThan('desde', 'hasta') });
  }

  ngOnInit() {


  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value >= t.value) {
        return {
          dates: "La fecha \"desde\" debe ser menor que la fecha \"hasta\"."
        };
      }
      return {};
    }
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const values = form.value

    this.pdfService.generatePdf(values.desde, values.hasta, this.data.reportType).subscribe(data => {
      console.log(data);
      var blob = new Blob([data], { type: 'application/pdf' });
      console.log(blob);
      saveAs(blob, this.data.reportType + ".pdf");
      this.dialogRef.close();
    });


  }

}
