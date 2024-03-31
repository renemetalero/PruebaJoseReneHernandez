import { AbstractControl, ValidatorFn } from "@angular/forms";

export function minorDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    const inputDate = new Date(control.value)
    inputDate.setDate(new Date(control.value).getDate() + 1);
    if (inputDate >= currentDate) {
      return null; // Fecha válida
    } else {
      return { minordate: true }; // Fecha inválida
    }
  }
}

export function yearHigherValidator(name: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const releaseControl = control.parent?.get(name)
    if (!releaseControl || !control) {
      return null; // Si los controles no están presentes, no hay validación
    }
    const revisionDate = new Date(control.value);
    const releaseDate = new Date(releaseControl.value)
    revisionDate.setDate(new Date(control.value).getDate() + 1);
    releaseDate.setDate(new Date(releaseControl.value).getDate() + 1);


    if (revisionDate.getFullYear() - releaseDate.getFullYear() === 1) {
      return null; // Fecha válida
    } else {
      return { yearnothigher: true }; // Fecha inválida
    }
  }
}


