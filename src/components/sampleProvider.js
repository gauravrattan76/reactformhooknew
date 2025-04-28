import React, { useState } from "react";
import { useForm, FormProvider, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { formConfig } from "./formConfig";
import { FormSection, FormField } from "./types";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
  InputLabel
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DynamicAccordionForm: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });
  const { handleSubmit, control, formState: { errors } } = methods;
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const onSubmit = (data: FieldValues) => {
    console.log("Form Submitted:", data);
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "select":
        return (
          <FormControl fullWidth error={!!errors[field.name]}>
            <InputLabel>{field.label}</InputLabel>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              render={({ field: controllerField }) => (
                <Select label={field.label} {...controllerField}>
                  {field.options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors[field.name] && (
              <FormHelperText>{errors[field.name]?.message?.toString()}</FormHelperText>
            )}
          </FormControl>
        );
      case "textarea":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: controllerField }) => (
              <TextField
                label={field.label}
                placeholder={field.placeholder}
                fullWidth
                multiline
                rows={4}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message?.toString()}
                {...controllerField}
              />
            )}
          />
        );
      case "radio":
        return (
          <FormControl component="fieldset" error={!!errors[field.name]}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              render={({ field: controllerField }) => (
                <RadioGroup row {...controllerField}>
                  {field.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors[field.name] && (
              <FormHelperText>{errors[field.name]?.message?.toString()}</FormHelperText>
            )}
          </FormControl>
        );
      default:
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: controllerField }) => (
              <TextField
                label={field.label}
                placeholder={field.placeholder}
                fullWidth
                type={field.type}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message?.toString()}
                {...controllerField}
              />
            )}
          />
        );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", maxWidth: 800, margin: "auto" }}>
        {formConfig.map((section, index) => (
          <Accordion
            key={index}
            expanded={section.isOpen || activeAccordion === index}
            onChange={() => toggleAccordion(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.fields.map((field) => (
                <div key={field.name} style={{ marginBottom: "1.5rem" }}>
                  {renderField(field)}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Button variant="contained" color="primary" type="submit" style={{ marginTop: "2rem" }}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default DynamicAccordionForm;
