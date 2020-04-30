import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '@kaeh/shared/shared.material.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  exports: [SharedMaterialModule, CommonModule, MarkdownModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
