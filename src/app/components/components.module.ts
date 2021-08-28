import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SpinnerCenter } from './spinner-center/spinner-center';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [SpinnerCenter],
  exports: [SpinnerCenter],
})
export class ComponentsModule {}
