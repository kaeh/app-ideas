import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

const Components = [MenuComponent];

@NgModule({
  declarations: Components,
  exports: Components,
})
export class ViewsModule {
  constructor(@Optional() @SkipSelf() parentModule: ViewsModule) {
    if (parentModule) {
      throw new Error(
        'ViewsModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }
}
