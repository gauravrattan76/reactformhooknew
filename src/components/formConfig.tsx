// formConfig.ts
import { FormSection } from "./types";

export const formConfig: FormSection[] = [
  {
    title: "Personal Information",
    isOpen: true,
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        validation: {
          required: "First name is required",
          minLength: { value: 2, message: "Minimum 2 characters" }
        }
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        validation: {
          required: "Email is required",
          pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email" }
        }
      }
    ]
  },
  {
    title: "Preferences",
    isOpen: true,
    fields: [
      {
        name: "gender",
        label: "Gender",
        type: "radio",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" }
        ],
        validation: {
          required: "Gender is required"
        }
      },
      {
        name: "hobby",
        label: "Hobby",
        type: "select",
        options: [
          { label: "Reading", value: "reading" },
          { label: "Traveling", value: "traveling" },
          { label: "Sports", value: "sports" }
        ],
        validation: {
          required: "Hobby is required"
        }
      }
    ]
  }
];