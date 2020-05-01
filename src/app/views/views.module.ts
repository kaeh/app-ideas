import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@kaeh/shared/shared.module';
import { ExerciseComponent } from './exercise/exercise.component';
import { MenuComponent } from './menu/menu.component';

const Components = [MenuComponent, ExerciseComponent];

@NgModule({
  declarations: Components,
  imports: [SharedModule, RouterModule],
  exports: Components,
})
export class ViewsModule {
  constructor(@Optional() @SkipSelf() parentModule: ViewsModule) {
    if (parentModule) {
      throw new Error('ViewsModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
