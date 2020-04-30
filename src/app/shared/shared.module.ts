import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  exports: [SharedMaterialModule, CommonModule, MarkdownModule],
})
export class SharedModule {}
