import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CauseEffectComponent } from './components/cause-effect/cause-effect.component';

const routes: Routes = [{ path: '', component: CauseEffectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauseEffectRoutingModule {}
