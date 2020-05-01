import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BorderRadiusPreviewerRoutingModule } from './border-radius-previewer-routing.module';
import { BorderRadiusPreviewerComponent } from './components/border-radius-previewer/border-radius-previewer.component';

@NgModule({
  declarations: [BorderRadiusPreviewerComponent],
  imports: [CommonModule, BorderRadiusPreviewerRoutingModule],
})
export class BorderRadiusPreviewerModule {}
