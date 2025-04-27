import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
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
import { formConfig } from "./formConfig"; // import your config
import { FormSection, FormField } from "./types";

const DynamicAccordionForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
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
                        <Select
                            label={field.label}
                            defaultValue=""
                            {...register(field.name, field.validation)}
                        >
                            {field.options?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors[field.name] && (
                            <FormHelperText>{errors[field.name]?.message?.toString()}</FormHelperText>
                        )}
                    </FormControl>
                );
            case "textarea":
                return (
                    <TextField
                        label={field.label}
                        placeholder={field.placeholder}
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]?.message?.toString()}
                        {...register(field.name, field.validation)}
                    />
                );
            case "radio":
                return (
                    <FormControl component="fieldset" error={!!errors[field.name]}>
                        <FormLabel component="legend">{field.label}</FormLabel>
                        <RadioGroup row {...register(field.name, field.validation)}>
                            {field.options?.map((opt) => (
                                <FormControlLabel
                                    key={opt.value}
                                    value={opt.value}
                                    control={<Radio />}
                                    label={opt.label}
                                />
                            ))}
                        </RadioGroup>
                        {errors[field.name] && (
                            <FormHelperText>{errors[field.name]?.message?.toString()}</FormHelperText>
                        )}
                    </FormControl>
                );
            default:
                return (
                    <TextField
                        label={field.label}
                        placeholder={field.placeholder}
                        fullWidth
                        type={field.type}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]?.message?.toString()}
                        {...register(field.name, field.validation)}
                    />
                );
        }
    };

    return (
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
    );
};

export default DynamicAccordionForm;