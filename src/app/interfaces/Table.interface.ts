export interface ColumnTableI {
  name: string;
  label: string;
  html?: (record: any) => string
}
