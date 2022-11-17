import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './HttpService';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { ConverterComponent } from './converter.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ConverterComponent,
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
