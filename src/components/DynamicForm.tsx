// import React from "react";
// import {
//   useForm,
//   Controller,
//   SubmitHandler,
// } from "react-hook-form";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   TextField,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormControl,
//   FormLabel,
//   Button,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // Define types for configuration
// type FieldConfig =
//   | {
//     type: "text" | "date";
//     name: string;
//     label: string;
//     validation: { required: string };
//   }
//   | {
//     type: "radio";
//     name: string;
//     label: string;
//     options: { label: string; value: string }[];
//     validation: { required: string };
//   };

// interface AccordionConfig {
//   accordionTitle: string;
//   fields: FieldConfig[];
// }

// interface FormData {
//   [key: string]: any;
// }

// // Sample config JSON
// const config: AccordionConfig[] = [
//   {
//     accordionTitle: "Personal Information",
//     fields: [
//       {
//         type: "text",
//         name: "firstName",
//         label: "First Name",
//         validation: { required: "First name is required" },
//       },
//       {
//         type: "text",
//         name: "lastName",
//         label: "Last Name",
//         validation: { required: "Last name is required" },
//       },
//       {
//         type: "date",
//         name: "dob",
//         label: "Date of Birth",
//         validation: { required: "Date of birth is required" },
//       },
//     ],
//   },
//   {
//     accordionTitle: "Preferences",
//     fields: [
//       {
//         type: "radio",
//         name: "newsletter",
//         label: "Subscribe to newsletter",
//         options: [
//           { label: "Yes", value: "yes" },
//           { label: "No", value: "no" },
//         ],
//         validation: { required: "Please select an option" },
//       },
//     ],
//   },
// ];

// // Dynamically generate Yup validation schema
// const generateSchema = (config: AccordionConfig[]) => {
//   const shape: { [key: string]: any } = {};
//   config.forEach((accordion) => {
//     accordion.fields.forEach((field) => {
//       if (field.validation?.required) {
//         shape[field.name] = yup.string().required(field.validation.required);
//       }
//     });
//   });
//   return yup.object().shape(shape);
// };

// const schema = generateSchema(config);

// const DynamicForm: React.FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     console.log("Form Data", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} >
//       {config.map((accordion) => (
//         <Accordion key={accordion.accordionTitle}>
//           <AccordionSummary>
//             <Typography>{accordion.accordionTitle}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {accordion.fields.map((field) => (
//               <div key={field.name} style={{ marginBottom: "16px" }}>
//                 {field.type === "text" && (
//                   <Controller
//                     name={field.name}
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label={field.label}
//                         fullWidth
//                         error={!!errors[field.name]}
//                         helperText={errors[field.name]?.message}
//                       />
//                     )}
//                   />
//                 )}

//                 {field.type === "date" && (
//                   <Controller
//                     name={field.name}
//                     control={control}
//                     render={({ field }) => (
//                       <DatePicker
//                         value={field.value ? new Date(field.value) : null} // Convert string to Date or use null
//                         onChange={(date) => field.onChange(date ? date.toISOString() : null)} // Convert Date to ISO string
//                         label={field.label}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             fullWidth
//                             error={!!errors[field.name]}
//                             helperText={errors[field.name]?.message}
//                           />
//                         )}
//                       />
//                     )}
//                   />
//                 )}

//                 {field.type === "radio" && (
//                   <FormControl
//                     component="fieldset"
//                     error={!!errors[field.name]}
//                   >
//                     <FormLabel>{field.label}</FormLabel>
//                     <Controller
//                       name={field.name}
//                       control={control}
//                       render={({ field }) => (
//                         <>
//                           <RadioGroup {...field}>
//                             {field.options?.map((option) => (
//                               <FormControlLabel
//                                 key={option.value}
//                                 value={option.value}
//                                 control={<Radio />}
//                                 label={option.label}
//                               />
//                             ))}
//                           </RadioGroup>
//                           {errors[field.name] && (
//                             <Typography color="error">
//                               {errors[field.name]?.message}
//                             </Typography>
//                           )}
//                         </>
//                       )}
//                     />
//                   </FormControl>
//                 )}
//               </div>
//             ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default DynamicForm;