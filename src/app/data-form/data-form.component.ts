import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });

    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    })
  }

  onSubmit(){
    console.log(this.formulario.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(
      map((res: any) => res))
    .subscribe((dados: any) => {
      console.log(dados);
      //reseta o form
      this.formulario.reset();
    });
  }

}
