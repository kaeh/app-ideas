import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [BrowserAnimationsModule, MatCardModule, MatIconModule, MatMenuModule, MatButtonModule, MatExpansionModule],
})
export class SharedMaterialModule {}
