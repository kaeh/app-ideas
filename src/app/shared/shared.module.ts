import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';

@NgModule({
  exports: [SharedMaterialModule, CommonModule],
})
export class SharedModule {}
