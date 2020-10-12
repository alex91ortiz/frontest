import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VentaComponent } from './venta/venta.component';
import { ProductoComponent } from './producto/producto.component';
import { AgregarproductoComponent } from './modal/agregarproducto/agregarproducto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AgregarclienteComponent } from './modal/agregarcliente/agregarcliente.component';
import { EliminarclienteComponent } from './modal/eliminarcliente/eliminarcliente.component';
import { EliminarproductoComponent } from './modal/eliminarproducto/eliminarproducto.component';

@NgModule({
  declarations: [
    AppComponent,
    VentaComponent,
    ProductoComponent,
    AgregarproductoComponent,
    ClienteComponent,
    AgregarclienteComponent,
    EliminarclienteComponent,
    EliminarproductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AgregarproductoComponent],
})
export class AppModule { }
