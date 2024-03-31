import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Record<string, any>[], value: string): any[] {
    return array.filter((el) => {
      return Object.keys(el).some(key => {
        const currentVal = el[key].toLowerCase()
        return currentVal.trim().includes(value.toString().toLowerCase().trim())
      })
    })
  }

}
