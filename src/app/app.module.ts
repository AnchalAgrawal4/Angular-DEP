import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { UserNamePipe } from './pipes/user-name.pipe';

@NgModule({
  declarations: [AppComponent, HomeComponent, UserNamePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
