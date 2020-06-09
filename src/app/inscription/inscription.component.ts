import {Component, OnInit} from '@angular/core';
// on utilise FormBuilder pour créer le modèle du formulaire
import {FormBuilder, FormGroup} from "@angular/forms";
import {Hero} from "../hero";
//import {HeroService} from "../hero.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  //je stock dans ma propriété loginForm mon instance de FormGroup
  //elle correspond à l'ensemble de mon formulaire
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  //  private heroService: HeroService
  ) {
  }

  ngOnInit(): void {
    //je passe à la méthode fb.group() un obj js contenant le nom et la définition de chaque champ de formulaire
    // cet obj sera converti en instances de FormControl
    this.loginForm = this.fb.group({
      // instance de FormControl identifié par la clé username dans le formGroup
      //je peux y accèder directement via this.loginForm.get('username')
      username: [],
      // une seconde instance de FormControl
      password: [],
    })
    // alternative:
    // + import { FormControl, FormGroup } from '@angular/forms';
    //this.loginForm = new FormGroup({
    //username: new FormControl(),
    //password: new FormControl(),
    //});
  }

  // je crée une méthode de class login(à que j'appelle à la soumission du formulaire
  //c'est dans cette méthode que je pourrai traiter les données du form et les envoyer à un serveur
  login() {
    console.log('Donnée du form', this.loginForm.value);
  }

}
