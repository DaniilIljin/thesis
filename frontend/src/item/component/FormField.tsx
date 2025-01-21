import React from "react";
import {Controller} from "react-hook-form";
import {TextField, MenuItem} from "@mui/material";

interface FormFieldProps {
    name: string;
    label: string;
    control: any;
    options?: { id: number; name: string }[];
    multiline?: boolean;
    rows?: number;
    type?: string;
    required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 name,
                                                 label,
                                                 control,
                                                 options,
                                                 ...rest
                                             }) => (
    <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({field}) =>
            options ? (
                <TextField {...field} label={label} select fullWidth sx={{mb: 2}} {...rest}>
                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            ) : (
                <TextField {...field} label={label} fullWidth sx={{mb: 2}} {...rest} />
            )
        }
    />
);

export default FormField;
