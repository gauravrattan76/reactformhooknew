// types.ts
export type ValidationRules = {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
  
  export type Option = {
    label: string;
    value: string;
  };
  
  export type FieldType = "text" | "email" | "password" | "select" | "radio" | "textarea";
  
  export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: Option[]; // for select and radio
    validation?: ValidationRules;
  }
  
  export interface FormSection {
    title: string;
    isOpen: boolean;
    fields: FormField[];
  }