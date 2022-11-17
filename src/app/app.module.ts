import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './Api/HttpService';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Header/header.component';
import { ConverterComponent } from './Converter/converter.component';

@NgModule({
  declarations: [
    ConverterComponent,
    HeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
