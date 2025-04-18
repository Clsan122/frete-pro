
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BRAZILIAN_STATES } from "@/utils/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientFormData } from "@/types/client";

interface LocationFieldsProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  watchedState: string;
  handleSetState: (value: string) => void;
}

export const LocationFields: React.FC<LocationFieldsProps> = ({
  register,
  errors,
  watchedState,
  handleSetState,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="city">Cidade</Label>
        <Input id="city" {...register("city")} />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">Estado</Label>
        <Select
          value={watchedState}
          onValueChange={handleSetState}
        >
          <SelectTrigger id="state">
            <SelectValue placeholder="UF" />
          </SelectTrigger>
          <SelectContent>
            {BRAZILIAN_STATES.map((state) => (
              <SelectItem key={state.abbreviation} value={state.abbreviation}>
                {state.abbreviation} - {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && (
          <p className="text-sm text-red-500">{errors.state.message}</p>
        )}
      </div>
    </div>
  );
};
