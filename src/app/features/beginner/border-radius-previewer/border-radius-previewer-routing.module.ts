import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorderRadiusPreviewerComponent } from './components/border-radius-previewer/border-radius-previewer.component';

const routes: Routes = [{ path: '', component: BorderRadiusPreviewerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorderRadiusPreviewerRoutingModule {}
