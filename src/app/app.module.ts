import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@kaeh/app-routing.module';
import { AppComponent } from '@kaeh/app.component';
import { CoreModule } from '@kaeh/core/core.module';
import { ViewsModule } from '@kaeh/views/views.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, ViewsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
