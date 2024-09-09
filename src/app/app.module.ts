import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { DetalleComponent } from './detalle/detalle.component'; //INCLUIR
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { registerLocaleData } from '@angular/common';
import  localeEsAr from '@angular/common/locales/es-AR';
import { CarritoComponent } from './carrito/carrito.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogoComponent,
    RegistroComponent,
    LoginComponent,
    DetalleComponent,
    ContactComponent,
    CarritoComponent,
    NavbarComponent,
    PaymentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //INCLUIR
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
