import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [BrowserAnimationsModule, MatCardModule, MatIconModule],
})
export class SharedMaterialModule {}
