import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@kaeh/app-routing.module';
import { AppComponent } from '@kaeh/app.component';
import { CoreModule } from '@kaeh/core/core.module';
import { ViewsModule } from '@kaeh/views/views.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, CoreModule, ViewsModule, MarkdownModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
