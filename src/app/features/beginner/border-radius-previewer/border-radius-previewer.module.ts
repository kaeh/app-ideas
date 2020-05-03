import { NgModule } from '@angular/core';
import { SharedModule } from '@kaeh/shared/shared.module';
import { BorderRadiusPreviewerRoutingModule } from './border-radius-previewer-routing.module';
import { BorderRadiusPreviewerComponent } from './components/border-radius-previewer/border-radius-previewer.component';

@NgModule({
  declarations: [BorderRadiusPreviewerComponent],
  imports: [BorderRadiusPreviewerRoutingModule, SharedModule],
})
export class BorderRadiusPreviewerModule {}
